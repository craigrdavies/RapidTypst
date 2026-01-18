for img in *.png; do
  magick "$img" -background white -flatten -quality 80 "${imag%.png}.webp" 
done