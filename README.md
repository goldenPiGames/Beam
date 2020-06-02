Currently available on the following sites:

* [GitHub Pages](https://goldenpigames.github.io/Beam/)
* [Kongregate](https://www.kongregate.com/games/goldenPiGames/beam)
* [Newgrounds](https://www.newgrounds.com/portal/view/756438)
* [Itch](https://goldenpigames.itch.io/beam)


Documentation for Adding to Your Site
=====================================

The only things you actually need for the game are the index.html and the src folder.

make_kong.sh makes a folder called submitKong that contains the index.html and zippy.zip files for uploading to Kongregate. This version uses the Kongregate API, and it also trims out the unnecessary songs to fit into Kongregate's 150KB upload limit.

make_ng.sh makes a folder called submitNG that contains zippy.zip, which has everthing needed by the game. Although made for Newgrounds, I also use it for itch.

version is intended for different version-specific scripts. the make shell scripts can replace version.js in src with another version file. the only one that actually does this is Kongregate

metadata_and_stuff contains thumbnails, banners, screenshts, and similar. None of these are actually used by the game, they are just for displaying on a website.
