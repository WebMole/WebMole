WebMole
=======
A project for managing custom web maps and viewing web paths with automatic tools and javascript libraries

Demontration Video
------------------
[![ScreenShot](https://raw.github.com/GabLeRoux/WebMole/master/ressources/WebMole_Youtube_Video.png)](http://youtu.be/vt5fpE0bzSY)

[Link to video](http://youtu.be/vt5fpE0bzSY)

Usage
-----

Extract application into a folder of your web server and access it using your web server adress. Visit the tabs and press the cool buttons. Note that there is an help button in the header.

Requirements
------------
* A [web server](http://www.wampserver.com) with PHP 5.2.0 or newer (for JSON lib)
* A web browser
  * Tested with [Google Chrome](https://www.google.com/chrome) and [Safari](http://www.apple.com/safari/) but may work with other popular browsers
  * Javascript must be enabled

Disclaimer
----------

Webmole does not provide any way to hack a website nor encourage hacking. The project is delivered as-is for research purpouses and web maps generation and analysis.

Credits
-------

Written by [Gabriel Le Breton](http://www.gableroux.com), [Fabien Maronnaud](mailto:fabien.maronnaud@gmail.com) in collaboration with [Sylvain Hallé](http://www.leduotang.com/sylvain/), Professor at Université du Québec à Chicoutimi.

Developpement
=============

Changelog
---------

## 0.3
* Added Oracle Editing cappabilitie (will execute custom javascript on each nodes to filter the map)
* Changed google's Prettyprint for [Ace web editor](http://ace.ajax.org/) wich is an awesome opensource web editor that allow alot of options such as edit/read-only, alot of langages, etc. :)
* Separated the libraries from the app (makes it easier to locate custom scripts and app's code)
* Renamed project to "WebMole"

## 0.2
* Added working Web Explorer
* Added working config system (backend only atm)
* Changed graph viewer for a proper Radial Graph

## 0.1

* Scripts are loaded and skeleton is ready

Todo
----

* Implement drag and drop upload for viewer
* Make settings writable
* Eval javascript after user's edit from ui with ace editor
* Update Viewer to handle explorer's json data
* Update demo with new dynamic page generator (Currently in WebMole Demo folder)
