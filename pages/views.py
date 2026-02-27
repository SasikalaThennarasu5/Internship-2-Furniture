from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from django.contrib.auth.models import User

from .models import (
    HeroSection, WhyChooseUs, Testimonial, Footer,
    BlogPost, BlogComment, Service, TeamMember,
    NewsletterSubscriber, ContactMessage,
    SiteSettings, AboutPage
)

from .serializers import (
    HeroSerializer, WhyChooseUsSerializer,
    TestimonialSerializer, NewsletterSubscriberSerializer,
    FooterSerializer, BlogPostSerializer,
    BlogCommentSerializer, ServiceSerializer,
    TeamMemberSerializer, ContactMessageSerializer,
    SiteSettingsSerializer, AboutPageSerializer
)

from products.models import Product
from products.serializers import ProductSerializer


class HomeAPIView(APIView):
    permission_classes = [AllowAny]   # ✅ ADD THIS

    def get(self, request):
        hero = HeroSection.objects.first()
        why_choose = WhyChooseUs.objects.filter(is_active=True).order_by('display_order')
        testimonials = Testimonial.objects.all()
        newsletter = NewsletterSubscriber.objects.first()
        footer = Footer.objects.first()
        featured_products = Product.objects.filter(featured=True, is_active=True)

        data = {
            "hero": HeroSerializer(hero).data if hero else None,
            "why_choose": WhyChooseUsSerializer(why_choose, many=True).data,
            "testimonials": TestimonialSerializer(testimonials, many=True).data,
            "newsletter": NewsletterSubscriberSerializer(newsletter).data if newsletter else None,
            "footer": FooterSerializer(footer).data if footer else None,
            "featured_products": ProductSerializer(featured_products, many=True).data,
        }

        return Response(data)

class BlogListView(generics.ListAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]

class BlogDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]

class AddCommentView(generics.CreateAPIView):
    serializer_class = BlogCommentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        blog_id = self.kwargs["blog_id"]
        blog = BlogPost.objects.get(id=blog_id)
        serializer.save(user=self.request.user, blog=blog)

class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

class WhyChooseUsListView(generics.ListAPIView):
    queryset = WhyChooseUs.objects.filter(is_active=True)
    serializer_class = WhyChooseUsSerializer
    permission_classes = [AllowAny]

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

class TeamMemberListView(generics.ListAPIView):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

class NewsletterSubscribeView(APIView):
    permission_classes = [AllowAny]   # ✅ MUST be here

    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]

            if NewsletterSubscriber.objects.filter(email=email).exists():
                return Response(
                    {"message": "You are already subscribed."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer.save()
            return Response(
                {"message": "Subscribed successfully."},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ContactMessageCreateView(APIView):
    permission_classes = [AllowAny]   # ✅ ADD HERE

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Message sent successfully."},
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SiteSettingsView(RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]
    def get_object(self):
        return SiteSettings.objects.first()
    
class AboutAPIView(APIView):
    permission_classes = [AllowAny]   # ✅ ADD THIS

    def get(self, request):
        about = AboutPage.objects.first()
        serializer = AboutPageSerializer(about)
        return Response(serializer.data)
    
    def create_admin():
         if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username="admin1",
                email="admin@gmail.com",
                password="admin1234"
        )