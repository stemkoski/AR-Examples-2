from PIL import Image

def combine_images_3x3(image_paths, output_path):
   
    if len(image_paths) != 9:
        raise ValueError("You must provide exactly 9 image paths.")

    # Load images and verify dimensions
    imgs = [Image.open(p).convert("RGBA") for p in image_paths]
    w, h = imgs[0].size
    for i, im in enumerate(imgs[1:], start=2):
        if im.size != (w, h):
            raise ValueError(f"Image {i} has size {im.size}, expected {(w, h)}")

    # Create blank canvas for 3x3 grid
    grid_w, grid_h = 3 * w, 3 * h
    canvas = Image.new("RGBA", (grid_w, grid_h), (0, 0, 0, 0))

    # Paste images left→right, top→bottom
    for idx, im in enumerate(imgs):
        row, col = divmod(idx, 3)
        x, y = col * w, row * h
        canvas.paste(im, (x, y), im)

    canvas.save(output_path, format="PNG")
    print("finished.")

images = [
    "45.png", 
    "46.png", 
    "47.png",
    "48.png", 
    "49.png", 
    "50.png",
    "51.png", 
    "52.png", 
    "53.png"
]

combine_images_3x3(images, "45-53.png")