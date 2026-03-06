from PIL import Image
import numpy as np
from sklearn.cluster import KMeans


def get_dominant_color(image_file):

    image = Image.open(image_file)
    image = image.resize((150,150))

    pixels = np.array(image).reshape(-1,3)

    kmeans = KMeans(n_clusters=3)
    kmeans.fit(pixels)

    colors = kmeans.cluster_centers_

    r,g,b = colors[0]

    if r > 200 and g > 200 and b > 200:
        return "light"

    elif r < 80 and g < 80 and b < 80:
        return "dark"

    elif r > g and r > b:
        return "warm"

    else:
        return "neutral"