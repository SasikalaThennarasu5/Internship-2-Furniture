from rest_framework import generics, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


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


