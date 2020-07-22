rm -rf cordova/beam/www/src
cp -r src cordova/beam/www/src
cp version/AndroidBefore.js cordova/beam/www/src/VersionBefore.js
cp version/AndroidAfter.js cordova/beam/www/src/VersionAfter.js
rm -f cordova/beam/www/src/Audio/Songs/*.mp3
while IFS= read -r line; do
  cp "src/Audio/Songs/${line}.mp3" "cordova/beam/www/src/Audio/Songs/${line}.mp3"
done < version/songs_android
