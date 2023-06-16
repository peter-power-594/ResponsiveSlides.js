# ResponsiveSlides.js v1.60.0

## Simple & lightweight responsive slider plugin (less than 10kb)
ResponsiveSlides.js is a tiny vanilla plugin that creates a responsive slider using elements inside a container. It was built back in 2011 with jQuery by Ariel [ResponsiveSlides.js](http://responsiveslides.com/). This fork is an updated version working without jQuery keeping the spirit and options from the original version.

Biggest difference to other responsive slider plugins is the file size (less than 10kb minified and gzipped) + that this one doesn't try to do everything. 
The plugin is shipped with 2 modes:
- Either it just automatically fades the images
- Or operates as a responsive image container with pagination and/or navigation to fade between slides.

The biggest difference with the original version is that the picture is fading over the current one. 
It's not a cross-fading animation (one is fading out while another one is fading in). 
Better in performance - and visually to my mind.

### Features:

## Existing features
 * Fully responsive
 * jQuery dependency removed
 * Less than 10kb minified and gzipped
 * CSS3 transitions 
 * Simple markup using unordered list
 * Settings for transition and timeout durations
 * Multiple slideshows supported
 * Works in all major desktop and mobile browsers
 * Captions and other html-elements supported inside slides

## Coming (todo)
 * JavaScript fallback
 * Automatic and manual fade
 * Separate pagination and next/prev controls
 * Possibility to choose where the controls append to
 * Possibility to randomize the order of the slides
 * Possibility to use custom markup for pagination
 * Can be paused while hovering slideshow and/or controls
 * Images can be wrapped inside links
 * Optional 'before' and 'after' callbacks



Usage Instructions and demo
======

For instructions and demo go to [http://responsiveslides.com/](http://responsiveslides.com/), or [download this repository as a zip file](https://github.com/arielsalminen/ResponsiveSlides.js/zipball/master) and and open "index.html" from the "example" folder.

* View [additional usage examples online](http://responsiveslides.com/themes/themes.html).
* View [a demo with captions](http://responsiveslides.com/with-captions/themes.html).



License
======

Licensed under the MIT license.

From V2.0.0: Copyright (c) 2023 Pierre-Henri Lavigne, https://www.pierre-henri-lavigne.info
Until V1.55: Copyright (c) 2011-2023 Ariel Salminen, https://arie.ls/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Changelog
======

v2.0.0
- Setup Grunt as the primary build tool
- Move to cleaner SEMVER versioning
- Switch to non jQuery vanilla standard prototype code, not ES6 syntax for backward compatibility
- Keep namespace and features as closed to the original
- Only the base fade animations are working now (pagination, pause, etc... not ready yet)
