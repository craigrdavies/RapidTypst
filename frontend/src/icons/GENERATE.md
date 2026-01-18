# Icon Generation Instructions

## Source File
`icon.svg` - 1024x1024 SVG icon with "RT" on blue (#0047FF) background

## Generate All Icons with ImageMagick

Run these commands in your terminal (where ImageMagick is installed):

```bash
cd src-tauri/icons

# Convert SVG to PNG at 1024x1024
magick icon.svg -resize 1024x1024 icon-1024.png

# Generate required sizes
magick icon-1024.png -resize 32x32 32x32.png
magick icon-1024.png -resize 128x128 128x128.png
magick icon-1024.png -resize 256x256 128x128@2x.png

# Windows ICO (multi-resolution)
magick icon-1024.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico

# macOS ICNS (requires iconutil on Mac, or use magick)
magick icon-1024.png -resize 512x512 icon_512x512.png
magick icon-1024.png -resize 256x256 icon_256x256.png
magick icon-1024.png -resize 128x128 icon_128x128.png
magick icon-1024.png -resize 64x64 icon_64x64.png
magick icon-1024.png -resize 32x32 icon_32x32.png
magick icon-1024.png -resize 16x16 icon_16x16.png

# On macOS, create iconset folder and use iconutil:
# mkdir icon.iconset
# cp icon_512x512.png icon.iconset/icon_512x512.png
# ... (copy other sizes)
# iconutil -c icns icon.iconset
```

## Alternative: Use Tauri's Built-in Generator

If you have Tauri CLI installed:
```bash
cargo tauri icon icon-1024.png
```
This automatically generates all required formats!

## Online Alternative
Upload `icon.svg` to https://icon.kitchen/ to generate all formats visually.
