rm -rf Beam_Kong
mkdir Beam_Kong
cp Beam/index.html Beam_Kong/index.html
cp -r Beam/src Beam_Kong/src
cp Beam/version/Kongregate.js Beam_Kong/src/Version.js
rm -f Beam_Kong/src/Audio/Songs/*.mp3
while IFS= read -r line; do
  cp "Beam/src/Audio/Songs/${line}.mp3" "Beam_Kong/src/Audio/Songs/${line}.mp3"
done < Beam/src/Audio/include_kong
mkdir Beam_Kong/zippy
cp -r Beam_Kong/src Beam_Kong/zippy/src
7za a Beam_Kong/zippy.zip ./Beam_Kong/zippy/*
rm -rf Beam_Kong/zippy
