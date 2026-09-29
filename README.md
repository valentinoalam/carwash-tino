from PIL import Image

img = Image.open("mobil.png").convert("RGBA")

# Crop area mobil
img = img.crop((100, 300, 1400, 720))

# Kurangi jumlah warna
img = img.quantize(colors=32).convert("RGBA")

# Resize dengan nearest neighbor
img = img.resize((128, 64), Image.Resampling.NEAREST)

img.save("car-sprite.png")