rm -rf submitCoolMath
mkdir submitCoolMath
cp index.html submitCoolMath/index.html
cp -r src submitCoolMath/src
cp favicon.png submitCoolMath/favicon.png
cp version/CoolMathBefore.js submitCoolMath/src/VersionBefore.js
cp version/CoolMathAfter.js submitCoolMath/src/VersionAfter.js
cp version/CoolmathGamesSplash.png submitCoolMath/src/CoolmathGamesSplash.png
rm -f submitCoolMath/src/Audio/Songs/*.mp3
while IFS= read -r line; do
  cp "src/Audio/Songs/${line}.mp3" "submitCoolMath/src/Audio/Songs/${line}.mp3"
done < version/songs_coolmath
mkdir submitCoolMath/zippy
cp -r submitCoolMath/src submitCoolMath/zippy/src
cp submitCoolMath/index.html submitCoolMath/zippy/index.html
7za a submitCoolMath/zippy.zip ./submitCoolMath/zippy/*
rm -rf submitCoolMath/zippy
