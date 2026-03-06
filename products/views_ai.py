from rest_framework.decorators import api_view
from rest_framework.response import Response
from PIL import Image
import numpy as np

from .models import Product
from .serializers import ProductSerializer


def get_dominant_color(image):
    image = image.resize((100, 100))
    img_array = np.array(image)

    pixels = img_array.reshape(-1, 3)
    avg_color = pixels.mean(axis=0)

    r, g, b = avg_color

    if r > g and r > b:
        return "warm"
    elif g > r and g > b:
        return "natural"
    else:
        return "cool"


@api_view(["POST"])
def analyze_room(request):

    image_file = request.FILES.get("image")

    if not image_file:
        return Response({"error": "No image uploaded"})

    image = Image.open(image_file)

    color_type = get_dominant_color(image)

    if color_type == "warm":
        products = Product.objects.filter(name__icontains="wood")[:3]
        suggestion = "Your room has warm tones. Wooden furniture will match well."

    elif color_type == "natural":
        products = Product.objects.filter(name__icontains="oak")[:3]
        suggestion = "Your room has natural tones. Oak furniture and plants would fit."

    else:
        products = Product.objects.filter(name__icontains="sofa")[:3]
        suggestion = "Your room has cool tones. Grey sofa or glass table would match."

    serializer = ProductSerializer(products, many=True)

    return Response({
        "suggestion": suggestion,
        "products": serializer.data
    })