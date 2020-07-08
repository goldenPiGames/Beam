rm -rf submitGeneral
mkdir submitGeneral
cp index.html submitGeneral/index.html
cp -r src submitGeneral/src
mkdir submitGeneral/zippy
cp -r submitGeneral/src submitGeneral/zippy/src
cp submitGeneral/index.html submitGeneral/zippy/index.html
7za a submitGeneral/zippy.zip ./submitGeneral/zippy/*
rm -rf submitGeneral/zippy
