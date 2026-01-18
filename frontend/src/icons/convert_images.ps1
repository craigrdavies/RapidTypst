$input_folder = "C:\Projects\RapidTypst\frontend\public\icons"


gci -Path "$input_folder\*.png" | 
ForEach-object {
  magick $_.name -background white -flatten -quality 80 ($_.basename + ".webp")
}