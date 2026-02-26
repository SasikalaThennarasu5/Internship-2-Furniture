from django.contrib import admin
from .models import HeroSection, WhyChooseUs, Testimonial, Footer, BlogPost, BlogComment, Service,TeamMember, NewsletterSubscriber, ContactMessage, SiteSettings


admin.site.register(HeroSection)

@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "display_order")
    list_filter = ("is_active",)
    ordering = ("display_order",)

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "rating", "is_active")
    list_filter = ("is_active",)
    search_fields = ("name", "message")
    ordering = ("display_order",)



admin.site.register(Footer)

class BlogCommentInline(admin.TabularInline):
    model = BlogComment
    extra = 0


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "created_at")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [BlogCommentInline]


@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ("blog", "user", "is_approved", "created_at")
    list_filter = ("is_approved",)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "display_order")
    list_filter = ("is_active",)
    ordering = ("display_order",)
    search_fields = ("title",)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "is_active", "display_order")
    list_filter = ("is_active",)
    ordering = ("display_order",)
    search_fields = ("name", "position")

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "is_active", "subscribed_at")
    search_fields = ("email",)
    list_filter = ("is_active",)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("first_name", "email", "is_read", "created_at")
    list_filter = ("is_read",)
    search_fields = ("first_name", "email", "message")
    ordering = ("-created_at",)

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Prevent adding more than one
        if SiteSettings.objects.exists():
            return False
        return True