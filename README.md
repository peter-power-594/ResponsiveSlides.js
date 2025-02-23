# Responsive Slides² (Responsive Slides.js v2)

## Simple & lightweight responsive slider plugin (less than 10kb)
[Responsive Slides²](https://responsive-slides.pierre-henri-lavigne.info) is a tiny vanilla plugin that creates a responsive slider using elements inside a container. 
It was built back in 2011 with jQuery by [Ariel](http://responsiveslides.com/). 
This fork is an updated version working without jQuery keeping the spirit and options from the original version.

This plugins doesn't try to do everything and is shipped with the following 2 modes:
- Either it just automatically fades the images
- Or operates as a responsive image container with pagination and/or navigation to fade between slides.


### Features:

#### Existing features
 * Fully responsive
 * jQuery dependency removed
 * Less than 12kb minified and gzipped
 * CSS3 transitions 
 * Simple markup using unordered list
 * Settings for transition and timeout durations
 * Multiple slideshows supported
 * Works in all major desktop and mobile browsers
 * Captions and other html-elements supported inside slides
 * Separate pagination and next/prev controls
 * Possibility to choose where the controls append to
 * Possibility to use custom markup for pagination
 * Can be paused while hovering slideshow and/or controls
 * Images can be wrapped inside links
 * Optional 'before' and 'after' callbacks
 * Automatic and manual fade

#### Coming (todo)
 * JavaScript fallback
 * Possibility to randomize the order of the slides



## Usage Instructions and demo

For instructions and demo go to [https://responsive-slides.pierre-henri-lavigne.info](https://responsive-slides.pierre-henri-lavigne.info)



### License

Licensed under the MIT license.

From V2.0.0: Copyright (c) 2023 Pierre-Henri Lavigne, https://responsive-slides.pierre-henri-lavigne.info/  
Until V1.55: Copyright (c) 2011-2023 Ariel Salminen, https://arie.ls/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



### Changelog

#### v2.0.0
- Setup Grunt as the primary build tool
- Move to cleaner SEMVER versioning
- Switch to non jQuery vanilla standard prototype code, not ES6 syntax for backward compatibility
- Keep namespace and features as closed to the original
- Only the base fade animations are working now (pagination, pause, etc... not ready yet)
