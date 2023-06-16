/*! ResponsiveSlides.js
 *
 * @author Fork Copyright (c) 2023 @peter-power-594
 * @author Original Copyright (c) 2011-2023 @arielsalminen
 * @license Available under the MIT license
 */

(function( window ) {

  var sliderIndex = 0;

  function responsiveSlides( sel, ops ) {

    var _self = this;

    ops = ops || {};

    // Tmp under dev
    ops.pager = false;
    ops.nav = false;
    ops.pause = false;
    ops.pauseControls = false;
    ops.navContainer = '';
    ops.manualControls = '';

    // Default settings
    _self.settings = {
      // Boolean: Animate automatically, true or false
      "auto": typeof ops.auto !== 'undefined' ? ops.auto : true,

      // Integer: Speed of the transition, in milliseconds
      "speed": ops.speed || false,

      // Integer: Time between slide transitions, in milliseconds
      "timeout": ops.timeout || 4000,

      // Boolean: Show pager, true or false
      "pager": typeof ops.pager !== 'undefined' ? ops.pager : false,

      // Boolean: Show navigation, true or false
      "nav": typeof ops.nav !== 'undefined' ? ops.nav : false,

      // Boolean: Randomize the order of the slides, true or false
      "random": typeof ops.random !== 'undefined' ? ops.random : false,

      // Boolean: Pause on hover, true or false
      "pause": ops.pause || false,

      // Boolean: Pause when hovering controls, true or false
      "pauseControls": typeof ops.pauseControls !== 'undefined' ? ops.pauseControls : pauseControls,

      // String: Text for the "previous" button
      "prevText": ops.prevText || "Previous",

      // String: Text for the "next" button
      "nextText": ops.nextText || "Next",

      // Integer: Max-width of the slideshow, in pixels
      "maxwidth": ops.maxwidth || false,

      // Selector: Where auto generated controls should be appended to, default is after the <ul>
      "navContainer": ops.navContainer || "",

      // Selector: Declare custom pager navigation
      "manualControls": ops.manualControles || "",

      // String: change the default namespace used
      "namespace": ops.namespace || "rslides",

      // Function: Before callback
      "before": typeof ops.before === 'function' ? ops.before : function() {},

      // Function: After callback
      "after": typeof ops.after === 'function' ? ops.after : function() {},
    };

    _self.browser = {};

    // Detect transition support
    _self.browser.supportsTransitions = _self.detectTransitions();
    if ( ! _self.browser.supportsTransitions ) {
      return false;
    }

    var sliders = document.querySelectorAll( sel ),
      isActiveClassName = _self.settings.namespace + '-initialized';
    _self.sliders = [];
    for ( var i = 0, j = 0; i < sliders.length; i++ ) {
      if ( ( sliders[ i ].className || '' ).indexOf( isActiveClassName ) > 0 ) {
        if ( window.console && window.console.error ) {
          window.console.error( 'Slider #' + ( sliders[ i ].id || '' ) + ' already activated');
        }
      }
      else {
        sliders[ i ].className += ' ' + isActiveClassName;
        _self.sliders.push( _self.slider( sliders[ i ], j, sliderIndex ) );
        _self.settings.before.apply( _self.sliders[ _self.sliders.length - 1 ], [ 0 ] );
        sliderIndex++; j++;
      }
    }

  }


  responsiveSlides.prototype.detectTransitions = function() {
    var docBody = document.body || document.documentElement,
      styles = docBody.style,
      prop = "transition";
    if ( typeof styles[prop] === "string" ) {
      return true;
    }
    // Tests for vendor specific prop
    var vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
    prop = prop.charAt(0).toUpperCase() + prop.substr(1);
    for ( var i = 0; i < vendor.length; i++ ) {
      if ( typeof styles[vendor[i] + prop] === "string" ) {
        return true;
      }
    }
    return false;
  };


  /**
   * @method getTransitionDuration
   * @desc Retrieve the transition duration from an html node
   * 
   * @param \HTML_Node el The html node to test
   * @returns Integer The transition duration setting in ms or 300 by default
   */
  responsiveSlides.prototype.getTransitionDuration = function( el ) {
	if ( ! el || ! el.nodeType || el.nodeType !== 1 ) {
		// Not an html node, probably a text node 
		// so looking for the nighboor node if avaivable
		if ( el.nextSibling ) {
			el = el.nextSibling;
		}
		else {
			return 300;
		}
	}
	var properties = [
      'transitionDuration',
      'WebkitTransitionDuration',
      'msTransitionDuration',
      'MozTransitionDuration',
      'OTransitionDuration'
    ];
    var currStyle = window.getComputedStyle( el ),
		p = properties.shift();
    while ( p ) {
      if ( typeof currStyle[ p ] !== 'undefined' ) {
        return parseFloat( currStyle[ p ] ) * ( /ms/.test( currStyle[ p ] ) ? 1 : 1000 );
      }
	  p = properties.length ? properties.shift() : false;
    }
    return 300;
  };


  responsiveSlides.prototype.hideItem = function( myItem ) {
    if ( ! myItem ) {
      return false;
    }
    // Styles for hidden slides
    var hiddenStyles = {
      // float: "none",
      // position: "absolute",
      // zIndex: 1,
      opacity: 0
    };
    for ( var myStyle in hiddenStyles ) {
      myItem.style[ myStyle ] = hiddenStyles[ myStyle ];
    }
  };


  /**
   * @method showItem
   * 
   * @param \HTML_Node myItem
   * @returns Boolean TRUE in case of success or FALSE in case of error
   */
  responsiveSlides.prototype.showItem = function( myItem ) {
    if ( ! myItem ) {
      return false;
    }
    // Styles for visible slides
    var visibleStyles = {
      // float: "left",
      // position: "relative",
      // zIndex: 2,
      opacity: 1
    };
    for ( var myStyle in visibleStyles ) {
      myItem.style[ myStyle ] = visibleStyles[ myStyle ];
    }
  };


  responsiveSlides.prototype.slideTo = function( myInstanceIndex, mySlideIndex ) {

    var _self = this,
      myInstance = _self.sliders[ myInstanceIndex ] || {},
      mySlides = myInstance.slides || false;
    if ( ! mySlides || ! mySlides.length ) {
      return false;
    }

    _self.settings.before.apply( myInstance, [ mySlideIndex ] );
    var fadeTime = myInstance.fadeTime || _self.settings.fadeTime,
      visibleClass = _self.sliders[ myInstanceIndex ].classNames.visible;

    /*
    if ( ! _self.browser.supportsTransitions ) {
      // If CSS3 transitions not supported or disabled
      var currSlide = mySlides[ myInstance.current || 0 ] || false;
      if ( ! currSlide ) {
        return false;
      }
      var f = 0,
        fadeStep = Math.floor( fadeTime / 10 ),
        fadeOut = function() {
          f++;
          currSlide.style.opacity = 0.1 * f;
          if ( f <= 9 ) {
            setTimeout( fadeOut, fadeStep );
          }
          else {
            _self.settings.after( mySlideIndex );
          }
        },
        fadeIn = function() {
          f++;
          currSlide.style.opacity = 1 - ( 0.1 * f );
          if ( f <= 9 ) {
            setTimeout( fadeIn, fadeStep );
          }
          else {
            currSlide.className = currSlide.className.replace( ' ' + visibleClass, '' );
            _self.hideItem( currSlide );
            f = 0;
            if ( mySlides[ mySlideIndex ] ) {
              _self.sliders[ myInstanceIndex ].current = mySlideIndex;
              currSlide = mySlides[ mySlideIndex ];
              fadeOut();
            }
          }
        };
      fadeIn();
    }
    */

    // If CSS3 transitions are supported
    var currSlideIndex = _self.sliders[ myInstanceIndex ].current;
    if ( mySlides[ currSlideIndex ] ) {
      mySlides[ currSlideIndex ].className = mySlides[ currSlideIndex ].className.replace( ' ' + visibleClass, '' );
    }
    if ( mySlides[ mySlideIndex ] ) {
      mySlides[ mySlideIndex ].className += ' ' + visibleClass;
    }
    _self.sliders[ myInstanceIndex ].current = mySlideIndex;
    setTimeout(function () {
      _self.settings.after.apply( myInstance, [ mySlideIndex ] );
    }, fadeTime );
  };


  responsiveSlides.prototype.slider = function( node, instanceIndex, sliderIndex ) {

    // Index for namespacing
    // i++;

    var _self = this,
      $this = node;

    // Local variables
    var vendor,
      selectTab,
      startCycle,
      restartCycle,
      rotate,
      $tabs;

    // Helpersgg
	if ( ! _self.settings.speed ) {
		_self.settings.speed = _self.getTransitionDuration( $this.childNodes[ 0 ] );
	}
	// console.log( _self.settings.speed );
    var slideIndex = 0,
      $childNodes = $this.childNodes,
      $slides = [],
      slidesLength = 0,
      fadeTime = parseFloat( _self.settings.speed ),
      waitTime = parseFloat( _self.settings.timeout ),
      maxw = parseFloat( _self.settings.maxwidth );

    for ( var s = 0; s < $childNodes.length; s++ ) {
      if ( $childNodes[ s ] && $childNodes[ s ].nodeType && $childNodes[ s ].nodeType === 1 ) {
        $slides.push( $childNodes[ s ] );
      }
    }
    slidesLength = $slides.length;

    // Namespacing
    var namespace = _self.settings.namespace,
      namespaceIndex = namespace + sliderIndex;

    // Classenames
    var navClass = namespace + "_nav " + namespaceIndex + "_nav",
      activeClass = namespace + "_here",
      visibleClass = 'rslide-active ' + namespaceIndex + '_on ',
      slideClassPrefix = namespaceIndex + "_s";

    // Pager
    var $pager = document.createElement( 'ul' );
      $pager.className = namespace + '_tabs ' + namespaceIndex + '_tabs';

    // Random order
    if ( _self.settings.random ) {
      for ( var n = 0; n < length; n++ ) {
        $this.appendChild( $slide[ Math.floor( Math.random() * ( length - 1 ) ) ] );
      }
      $childNodes = $this.childNodes;
      $slides = [];
      for ( var s2 = 0; s2 < $childNodes.length; s2++ ) {
        if ( $childNodes[ s2 ] && $childNodes[ s2 ].nodeType && $childNodes[ s2 ].nodeType === 1 ) {
          $slides.push( $childNotes[ s2 ] );
        }
      }
      slidesLength = $slides.length;
    }

    // Add ID's to each slide
    for ( var s3 = 0; s3 < slidesLength; s3++ ) {
      $slides[ s3 ].id = slideClassPrefix + s3;
    }

    // Add max-width and classes
    if ( ( $this.className || '' ).indexOf( namespace ) < 0 ) {
      $this.className += ' ' + namespace;
    }
    $this.className += ' ' + namespaceIndex;
    if ( _self.settings.maxwidth && ! isNaN( _self.settings.maxwidth ) ) {
      $this.style.maxWidth = _self.settings.maxwidth;
    }

    // Hide all slides, then show first one
    /*
    if ( ! _self.browser.supportsTransitions ) {
      for ( var s4 = 0; s4 < slidesLength; s4++ ) {
        _self.hideItem( $slides[ s4 ] );
      }
    }
    _self.showItem( $slides[ 0 ] );
    */
    if ( ( $slides[ 0 ].className || '' ).indexOf( visibleClass ) < 0 ) {
      $slides[ 0 ].className = $slides[ 0 ].className.replace( /\s*rslide-active/, '' ) + ' ' + visibleClass;
    }

    // CSS transitions
    /*
    if ( _self.browser.supportsTransitions ) {
      for ( var s5 = 0; s5 < slidesLength; s5++ ) {
        try {
          $slides[ s5 ].style.display = 'block';
          $slides[ s5 ].style.webkitTransition = 'opacity ' + fadeTime + 'ms ease-in-out';
          $slides[ s5 ].style.mozTransition = 'opacity ' + fadeTime + 'ms ease-in-out';
          $slides[ s5 ].style.oTransition = 'opacity ' + fadeTime + 'ms ease-in-out';
          $slides[ s5 ].style.transition = 'opacity ' + fadeTime + 'ms ease-in-out';
        } catch( e ) {
          if ( window.console && window.console.log ) {
            window.console.log( e );
          }
        }
      }
    }
    */

    // Only run if there's more than one slide
    var $navContainer = false;
    if ( slidesLength > 1 ) {

      // Make sure the timeout is at least 100ms longer than the fade
      if ( waitTime < fadeTime + 100 ) {
        return;
      }

      // Pager
      if ( _self.settings.pager && ! _self.settings.manualControls ) {
        for ( var p = 0, listItem, link; p < slidesLength; p++ ) {
          listItem = document.createElement( 'li' );
          link = document.createElement( 'a' );
          link.href = '#';
          link.className = slideClassPrefix + p;
          link.appendChild( document.createTextNode( p ) );
          listItem.appendChild( link );
          $pager.appendChild( listItem );
        }
        // Inject pager
        if ( _self.settings.navContainer ) {
          $navContainer = document.querySelectorAll( _self.settings.navContainer ) || false;
          if ( $navContainer && $navContainer.length ) {
            $navContainer.appendChild( $pager );
          }
        }
        if ( ! $navContainer ) {
          if ( ! $this.nextSlibling || ! $this.nextSlibling.length ) {
            $this.parentNode.appendChild( $pager );
          }
          else {
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
            $this.parentNode.insertBefore( $pager, $this.nextSlibling );
          }
        }
      }

      // Manual pager controls
      if ( _self.settings.manualControls ) {
        $pager = document.querySelectorAll( _self.settings.manualControls );
        if ( $pager && $pager.length ) {
          $pager.className += ' ' + namespace + '_tabs ' + namespaceIndex + '_tabs';
        }
      }

      // Add pager slide class prefixes
      if ( _self.settings.pager || _self.settings.manualControls ) {
        var $pagerChidNodes = $pager.getElementsByTagName( 'li' );
        for ( var i = 0; i < $pagerChidNodes.length; i++ ) {
          $pagerChidNodes[ i ].className += ' ' + slideClassPrefix + ( i + 1 );
        }
      }

      // If we have a pager, we need to set up the selectTab function
      if ( _self.settings.pager || _self.settings.manualControls ) {
        $tabs = $pager.getElementsByTagName( 'a' );

        // Select pager item
        selectTab = function( tabIndex ) {
          for ( var t0 = 0; t0 < $tabs.length; t0++ ) {
            $tabs[ t0 ].parentNode.className = ( $tabs[ t0 ].parentNode.className || '' ).replace( ' ' + activeClass, '' );
          }
          if ( $tabs[ tabIndex ] ) {
            $tabs[ tabIndex ].parentNode.className += ' ' + activeClass;
          }
        };
      }

      // Auto cycle
      if ( _self.settings.auto ) {

        startCycle = function () {
          rotate = setTimeout(function () {

            var slideIndex = _self.sliders[ instanceIndex ].current || 0,
              newIndex = slideIndex + 1 < slidesLength ? slideIndex + 1 : 0;

            // Remove active state and set new if pager is set
            if ( _self.settings.pager || _self.settings.manualControls ) {
              selectTab( newIndex );
            }

            _self.slideTo( instanceIndex, newIndex );
            startCycle();
          }, waitTime);
        };

        // Init cycle
        startCycle();

        $this.addEventListener( 'play', function( e ) {
          startCycle();
        });
        $this.addEventListener( 'pause', function( e ) {
          clearTimeout( rotate );
        });
        $this.addEventListener( 'stop', function( e ) {
          clearTimeout( rotate );
          _self.sliders[ myInstanceIndex ].current = 0;
        });
      }

      // Restarting cycle
      restartCycle = function () {
        if ( _self.settings.auto ) {
          // Stop
          clearTimeout( rotate );
          // Restart
          startCycle();
        }
      };

      // Pause on hover
      if ( _self.settings.pause ) {
        $this.addEventListener( 'mouseenter', function() {
          clearInterval( rotate );
        });
        $this.addEventListener( 'mouseleave', function() {
          restartCycle();
        });
      }

      // Pager click event handler
      if ( _self.settings.pager || _self.settings.manualControls ) {
        // $tabs[ 0 ] -> "A" / .parentNode -> "LI" / .parentNode.parentNode -> "UL"
        var $tabsContainer = $tabs[ 0 ].parentNode.parentNode;
        $tabsContainer.addEventListener( 'click', function( event ) {
          if ( typeof e.preventDefault === 'function' ) {
            event.preventDefault();
          }
          if ( ! _self.settings.pauseControls ) {
            restartCycle();
          }
          var $target = event.target;
          if ( $target.nodeName && $target.nodeName.toUpperCase() !== 'A' ) {
            if ( $target.nodeType || $target.nodeType === 1 ) {
                $target = $target.childNodes[ 0 ];
            }
            else {
              $target = $target.parentNode;
            }
          }
          if ( ! $target.nodeType || $target.nodeType !== 1 ) {
            return false;
          }
          // Get index of clicked tab
          var parentNode = $target.parentNode,
            newIndex = 0;
          while ( parentNode.previousSibling ) {
            parentNode = parentNode.previousSibling;
            if ( parentNode.nodeType && parentNode.nodeType === 1 ) {
              newIndex++;
            }
          }
          // Break if element is already active or currently animated
          if ( newIndex === slideIndex ) {
            return false;
          }
          // Remove active state from old tab and set new one
          selectTab( newIndex );
          // Do the animation
          _self.slideTo( instanceIndex, newIndex );
        });
        $tabs[ 0 ].parentNode.className += ' ' + activeClass;

        // Pause when hovering pager
        if ( _self.settings.pauseControls ) {
          $tabsContainer.addEventListener( 'mouseenter', function() {
            clearInterval( rotate );
          });
          $tabsContainer.addEventListener( 'mouseleave', function() {
            restartCycle();
          });
        }
      }

      // Navigation
      if ( _self.settings.nav ) {
        var prevLink = document.createElement( 'a' ),
          nextLink = document.createElement( 'a' );
        prevLink.className = navClass + ' prev';
        prevLink.appendChild( document.createTextNode( _self.settings.prevText ) );
        nextLink.className = navClass + ' next';
        prevLink.appendChild( document.createTextNode( _self.settings.nextText ) );

        // Inject navigation
        if ( $navContainer ) { // Variable already initialized at the beginning
          $navContainer.appendChild( prevLink );
          $navContainer.appendChild( nextLink );
        } else {
          $this.appendChild( prevLink );
          $this.appendChild( nextLink );
        }

        var $triggers = document.querySelectorAll( '.' + namespaceIndex + '_nav' );
        // $prev = $trigger.filter(".prev");

        // Click event handler
          /*
        $trigger.addEventListenerbind( 'click', function( event ) {
          if ( typeof event.preventDefault === 'function' ) {
            event.preventDefault();
          }

          var $visibleClass = $("." + visibleClass);
          // Prevent clicking if currently animated
          if ($visibleClass.queue('fx').length) {
            return;
          }
          */

          //  Adds active class during slide animation
          //  $(this)
          //    .addClass(namespace + "_active")
          //    .delay(fadeTime)
          //    .queue(function (next) {
          //      $(this).removeClass(namespace + "_active");
          //      next();
          //  });

          // Determine where to slide
          /*
          var idx = $slide.index($visibleClass),
            prevIdx = idx - 1,
            nextIdx = idx + 1 < length ? index + 1 : 0;

          // Go to slide
          slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
          if (settings.pager || settings.manualControls) {
            selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
          }

          if (!settings.pauseControls) {
            restartCycle();
          }
        });

        // Pause when hovering navigation
        /*
        if ( settings.pauseControls ) {
          $trigger.hover(function () {
            clearInterval(rotate);
          }, function () {
            restartCycle();
          });
        }
        */
      }

    }

    // Max-width fallback
    /*
    if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
      var widthSupport = function () {
        $this.css("width", "100%");
        if ($this.width() > maxw) {
          $this.css("width", maxw);
        }
      };

      // Init fallback
      widthSupport();
      $(window).bind("resize", function () {
        widthSupport();
      });
    }
    */

    return {
      slider: $this,
      slides: $slides,
      current: 0,
      classNames: {
        active: activeClass,
        visible: visibleClass
      }
    };

  };

  window.responsiveSlides = responsiveSlides;

})( this );
