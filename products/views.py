from rest_framework import generics, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .utils.image_analysis import get_dominant_color


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer


from django.db.models import Q



class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)

        category_slug = self.request.query_params.get('category')
        search_query = self.request.query_params.get('search')
        price_filter = self.request.query_params.get('price')
        material = self.request.query_params.get('material')
        colour = self.request.query_params.get('colour')

        # ✅ CATEGORY FILTER
        if category_slug:
            try:
                category = Category.objects.get(slug__iexact=category_slug)

                if category.parent is None:
                    subcategories = Category.objects.filter(parent=category)
                    queryset = queryset.filter(
                        Q(category=category) | Q(category__in=subcategories)
                    )
                else:
                    queryset = queryset.filter(category=category)

            except Category.DoesNotExist:
                return Product.objects.none()

        # ✅ SEARCH FILTER
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query)
            )

        # ✅ MATERIAL FILTER
        if material:
            queryset = queryset.filter(material__iexact=material)

        # ✅ COLOUR FILTER
        if colour:
            queryset = queryset.filter(colour__iexact=colour)

        # ✅ PRICE SORTING
        if price_filter == "low-high":
            queryset = queryset.order_by("price")
        elif price_filter == "high-low":
            queryset = queryset.order_by("-price")

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

@api_view(["POST"])
def chatbot(request):

    message = request.data.get("message","").lower()
    image = request.FILES.get("image")

    reply = ""
    products = []

    if image:

        color = get_dominant_color(image)

        reply = f"I analyzed your room. It looks {color}. Here are furniture suggestions."

        qs = Product.objects.all()[:4]

    else:

        if "sofa" in message:
            reply = "Here are some sofas you might like."
            qs = Product.objects.filter(category__name__icontains="sofa")[:4]

        elif "table" in message:
            reply = "Here are some tables."
            qs = Product.objects.filter(category__name__icontains="table")[:4]

        else:
            reply = "Upload a room photo or ask about sofas, beds, tables."
            qs = []

    for p in qs:
        products.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "slug": p.slug
        })

    return Response({
        "reply": reply,
        "products": products
    })
