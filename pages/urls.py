from django.urls import path
from .views import HomeAPIView, BlogListView, BlogDetailView, AddCommentView, TestimonialListView, WhyChooseUsListView, ServiceListView, TeamMemberListView, NewsletterSubscribeView, ContactMessageCreateView, SiteSettingsView, AboutAPIView

urlpatterns = [
    path('home/', HomeAPIView.as_view(), name='home'),
    path("blogs/", BlogListView.as_view(), name="blog-list"),
    path("blogs/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path("blogs/<int:blog_id>/comment/", AddCommentView.as_view(), name="add-comment"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonial-list"),
    path("why-choose-us/", WhyChooseUsListView.as_view(), name="why-choose-us"),
    path("services/", ServiceListView.as_view(), name="service-list"),
    path("team-members/", TeamMemberListView.as_view(), name="team-member-list"),
    path("newsletter/subscribe/", NewsletterSubscribeView.as_view(), name="newsletter-subscribe"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact-message"),
    path("site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("about/", AboutAPIView.as_view(), name="about"),
]
