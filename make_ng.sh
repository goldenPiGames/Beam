rm -rf submitNG
mkdir submitNG
cp index.html submitNG/index.html
cp -r src submitNG/src
mkdir submitNG/zippy
cp -r submitNG/src submitNG/zippy/src
cp submitNG/index.html submitNG/zippy/index.html
7za a submitNG/zippy.zip ./submitNG/zippy/*
rm -rf submitNG/zippy
