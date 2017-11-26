count=0
for f in data/{1..1920}.jpg
do
  echo $f
  if ! [ -a $f ]
  then
    echo "This one's not an image"
    ((count++))
  else
    width=$(identify -format '%w' $f)
    height=$(identify -format '%h' $f)
    echo $width
    echo $height
  fi
done
echo $count
