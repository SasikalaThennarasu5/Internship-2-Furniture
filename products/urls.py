from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView
from django.urls import path
from .views import chatbot
from .views_ai import analyze_room


urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path("chatbot/", chatbot),
    path("ai-room/", analyze_room),
]
