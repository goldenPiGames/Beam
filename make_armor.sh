rm -rf submitArmor
mkdir submitArmor
cp index.html submitArmor/index.html
cp -r src submitArmor/src
cp version/ArmorGamesBefore.js submitArmor/src/VersionBefore.js
cp version/ArmorGamesAfter.js submitArmor/src/VersionAfter.js
rm -f submitArmor/src/Audio/Songs/*.mp3
while IFS= read -r line; do
  cp "src/Audio/Songs/${line}.mp3" "submitArmor/src/Audio/Songs/${line}.mp3"
done < version/songs_armor
mkdir submitArmor/zippy
cp -r submitArmor/src submitArmor/zippy/src
cp submitArmor/index.html submitArmor/zippy/index.html
7za a submitArmor/zippy.zip ./submitArmor/zippy/*
rm -rf submitArmor/zippy
