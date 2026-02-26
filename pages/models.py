from django.db import models
from django.conf import settings
from django.utils.text import slugify



# 🔹 HERO SECTION
class HeroSection(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
    background_image = models.ImageField(upload_to='hero/')
    button1_text = models.CharField(max_length=100)
    button1_link = models.CharField(max_length=255)
    button2_text = models.CharField(max_length=100)
    button2_link = models.CharField(max_length=255)

    def __str__(self):
        return "Hero Section"


# 🔹 WHY CHOOSE US
class WhyChooseUs(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to="why_choose_us/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title


# 🔹 TESTIMONIALS
class Testimonial(models.Model):
    name = models.CharField(max_length=150)
    designation = models.CharField(max_length=150, blank=True)
    message = models.TextField()
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    rating = models.IntegerField(default=5)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.name

# 🔹 FOOTER
class Footer(models.Model):
    about_text = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField()
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    def __str__(self):
        return "Footer"

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    thumbnail = models.ImageField(upload_to='blogs/', null=True, blank=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BlogComment(models.Model):
    blog = models.ForeignKey(BlogPost, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.blog.title}"
    
class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.ImageField(upload_to="services/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.title
    
class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    position = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to="team/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return self.name

   
class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    
class ContactMessage(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} ({self.email})"
    
class SiteSettings(models.Model):
    site_name = models.CharField(max_length=200, default="Furniture Store")
    logo = models.ImageField(upload_to="site/", blank=True, null=True)
    footer_description = models.TextField(blank=True)

    address = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteSettings.objects.exists():
            raise ValueError("Only one SiteSettings instance allowed")
        return super().save(*args, **kwargs)

    def __str__(self):
        return "Site Settings"
    
class AboutPage(models.Model):
    hero_image = models.ImageField(upload_to="about/")
    hero_subtitle = models.TextField()

    why_description = models.TextField()
    why_image = models.ImageField(upload_to="about/")

    def __str__(self):
        return "About Page Content"