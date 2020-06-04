rm -rf submitKong
mkdir submitKong
cp index.html submitKong/index.html
cp -r src submitKong/src
cp version/KongregateBefore.js submitKong/src/VersionBefore.js
cp version/KongregateAfter.js submitKong/src/VersionAfter.js
rm -f submitKong/src/Audio/Songs/*.mp3
while IFS= read -r line; do
  cp "src/Audio/Songs/${line}.mp3" "submitKong/src/Audio/Songs/${line}.mp3"
done < version/songs_kong
mkdir submitKong/zippy
cp -r submitKong/src submitKong/zippy/src
7za a submitKong/zippy.zip ./submitKong/zippy/*
rm -rf submitKong/zippy
