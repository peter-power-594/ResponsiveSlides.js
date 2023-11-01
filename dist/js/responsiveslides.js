/*! Responsive Slides²
 *
 * @author Fork Copyright (c) 2023 @peter-power-594
 * @author Original Copyright (c) 2011-2023 @arielsalminen
 * @license Available under the MIT license
 */

(function( _win, _doc ) {


	function responsiveSlides( sel, ops ) {
		var _self = this;
		if ( _doc.readyState && _doc.readyState !== 'loading' ) {
			this.initSlider( sel || false, ops || {} );
		}
		else {
			_doc.addEventListener('DOMContentLoaded', function() {
				_self.initSlider( sel || false, ops || {} );
			});
		}
	}


	responsiveSlides.prototype.initSlider = function( sel, ops ) {
		var _self = this;

		// Default settings
		_self.settings = {
			// Boolean: Animate automatically, true or false.
			"auto": typeof ops.auto === 'boolean' ? ops.auto : true,

			// Boolean: Auto stop the carousel after a certain amount of time.
			"stop": typeof ops.stop === 'boolean' ? ops.stop : true,

			// Integer: Speed of the transition, in milliseconds
			"speed": typeof ops.speed === 'number' ? ops.speed : false,

			// Integer: Time between slide transitions, in milliseconds
			"timeout": ops.timeout || 4000,

			// Boolean: Show pager, true or false
			"pager": typeof ops.pager === 'boolean' ? ops.pager : false,

			// Boolean: Show navigation, true or false
			"nav": typeof ops.nav !== 'undefined' ? ops.nav : false,

			// Boolean: Randomize the order of the slides, true or false
			"random": typeof ops.random !== 'undefined' ? ops.random : false,

			// Boolean: Pause on hover, true or false
			"pause": typeof ops.pause === 'boolean' ? ops.pause : false,

			// Boolean: Pause when hovering controls, true or false
			"pauseControls": typeof ops.pauseControls === 'boolean' ? ops.pauseControls : false,

			// String: Text for the "previous" button
			"prevText": ops.prevText || "Previous",

			// String: Text for the "next" button
			"nextText": ops.nextText || "Next",

			// Integer: Max-width of the slideshow, in pixels
			"maxwidth": ops.maxwidth || false,

			// String: The selector where auto generated controls should be appended to, default is after the <ul>
			"navContainer": typeof ops.navContainer === 'string' ? ops.navContainer : '',

			// String: The selector to declare custom pager navigation
			"manualControls": typeof ops.manualControls === 'string' ? ops.manualControls : '',

			// String: Change the default namespace used
			"namespace": typeof ops.namespace === 'string' ? ops.namespace : 'rslides',

			// Function: Before callback
			"before": typeof ops.before === 'function' ? ops.before : function() {},

			// Function: After callback
			"after": typeof ops.after === 'function' ? ops.after : function() {},

			// Bootstrap
			"bootstrap": typeof ops.bootstrap === 'boolean' ? ops.bootstrap : false

		};

		if ( ! _self.settings.manualControls.length ) {
			_self.settings.manualControls = false;
		}
		if ( _self.settings.bootstrap ) {
			if ( ! _self.settings.manualControls.length ) {
				_self.settings.manualControls = '.carousel-indicators';
			}
			if ( ! _self.settings.nav ) {
				_self.settings.nav = '.carousel-control-prev, .carousel-control-next';
			}
		}
		_self.browser = {};

		// Detect transition support
		_self.browser.supportsTransitions = _self.detectTransitions();
		_self.browser.animating = 0;

		var sliders = _doc.querySelectorAll( sel ),
			isActiveClassName = ( _self.settings.namespace.length ? _self.settings.namespace + '-' : '' ) + 'initialized';
		_self.sliders = [];
		for ( var i = 0, sliderIndex = 0, j = 0; i < sliders.length; i++ ) {
			if ( ( sliders[ i ].className || '' ).indexOf( isActiveClassName ) > 0 ) {
				if ( _win.console && _win.console.error ) {
					_win.console.error( 'Slider #' + ( sliders[ i ].id || '' ) + ' already activated');
				}
			}
			else {
				sliders[ i ].className += ' ' + isActiveClassName;
				_self.sliders.push( _self.slider( sliders[ i ], j, sliderIndex ) );
				_self.settings.before.apply( _self.sliders[ _self.sliders.length - 1 ], [ 0 ] );
				sliderIndex++; j++;
			}
		}

	};


	responsiveSlides.prototype.detectTransitions = function() {
		var docBody = _doc.body || _doc._docElement,
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
		var currStyle = _win.getComputedStyle( el ),
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


	responsiveSlides.prototype.slideTo = function( myInstanceIndex, newSlideIndex ) {

		var _tmp, _self = this,
			myInstance = _self.sliders[ myInstanceIndex ] || {},
			mySlides = myInstance.slides || false;
		if ( ! mySlides || ! mySlides.length || _self.browser.animating ) {
			return false;
		}

		var fadeTime = myInstance.speed || _self.settings.speed,
			activeClass = _self.sliders[ myInstanceIndex ].classNames.active,
			CLASS_NAME_RIGHT = 'carousel-item-right',
			CLASS_NAME_LEFT = 'carousel-item-left',
			CLASS_NAME_NEXT = 'carousel-item-next',
			CLASS_NAME_PREV = 'carousel-item-prev',
			directionalClassName =  myInstance.current > newSlideIndex ? CLASS_NAME_RIGHT : CLASS_NAME_LEFT,
			orderClassName = myInstance.current > newSlideIndex ? CLASS_NAME_PREV : CLASS_NAME_NEXT;

		_self.browser.animating = new Date().getTime() + fadeTime;
		_self.settings.before.apply( myInstance, [ newSlideIndex ] );

		if ( ! _self.browser.supportsTransitions ) {
			// If CSS3 transitions not supported or disabled
			var currSlide = mySlides[ myInstance.current || 0 ] || false;
			if ( ! currSlide ) {
				return false;
			}
			var comingSlide = mySlides[ newSlideIndex ] || mySlides[ 0 ];
			if ( ! comingSlide ) {
				return false;
			}
			var f1 = 0, f2 = 0,
				fadeStep = Math.floor( fadeTime / 10 ),
				fadeOut = function() {
					f1++;
					comingSlide.style.opacity = 0.1 * f1;
					if ( f1 <= 9 ) {
						setTimeout( fadeOut, fadeStep );
					}
					else {
						_self.settings.after.apply( myInstance, [ newSlideIndex ] );
						comingSlide.className = ( comingSlide.className || '' ) + ' ' + activeClass;
						_self.sliders[ myInstanceIndex ].current = newSlideIndex;
						_self.browser.animating = 0;
					}
				},
				fadeIn = function() {
					f2++;
					currSlide.style.opacity = 1 - ( 0.1 * f2 );
					if ( f2 <= 9 ) {
						setTimeout( fadeIn, fadeStep );
					}
					else {
						currSlide.className = currSlide.className.replace( ' ' + activeClass, '' );
						_self.hideItem( currSlide );
						f2 = 0;
					}
				};
			fadeOut();
			fadeIn();
		}
		else {
			// If CSS3 transitions are supported
			var currSlideIndex = _self.sliders[ myInstanceIndex ].current,
				activeSlide = mySlides[ currSlideIndex ] || false,
				nextSlide = mySlides[ newSlideIndex ] || false;
			if ( activeSlide && nextSlide ) {
				// Default: Switch directly the active className
				activeSlide.className = ( activeSlide.className || '' ).replace( new RegExp( '\\s*' + activeClass, '' ), '' );
				if ( ( nextSlide.className || '' ).indexOf( activeClass ) < 0 ) {
					nextSlide.className = ( nextSlide.className ? nextSlide.className + ' ' : '' ) + activeClass;
				}
				// Bootstrap
				if ( _self.settings.bootstrap ) {
					nextSlide.className = ( nextSlide.className ? nextSlide.className + ' ' : '' ) + orderClassName;
					_tmp = nextSlide.offsetHeight; // Required for the "Reflow"
					if ( ! /active/.test( activeSlide.className || '' ) ) {
						activeSlide.className = ( activeSlide.className ? activeSlide.className + ' ' : '' ) + 'active';
					}
					activeSlide.className += ' ' + directionalClassName;
					nextSlide.className += ' ' + directionalClassName;
				}
			}
			setTimeout(function() {
				// Default: Nothing to do
				// Bootstrap
				if ( _self.settings.bootstrap ) {
					if ( mySlides[ currSlideIndex ] ) {
						mySlides[ currSlideIndex ].className = ( mySlides[ currSlideIndex ].className || '' ).replace( /\s*active/, '' ).replace( ' ' + directionalClassName, '' );
					}
					if ( mySlides[ newSlideIndex ] ) {
						mySlides[ newSlideIndex ].className = ( mySlides[ newSlideIndex ].className || '' ).replace( ' ' + orderClassName, '' ).replace( ' ' + directionalClassName, '' );
						mySlides[ newSlideIndex ].className = ( mySlides[ newSlideIndex ].className ? mySlides[ newSlideIndex ].className + ' ' : '' ) + 'active';
					}
				}
				_self.sliders[ myInstanceIndex ].current = newSlideIndex;
				_self.browser.animating = 0;
				setTimeout(function() {
					_self.settings.after.apply( myInstance, [ newSlideIndex ] );					
				}, 1 );
			}, fadeTime );
		}
	};


	responsiveSlides.prototype.slider = function( node, instanceIndex, sliderIndex ) {

		// Index for namespacing
		// i++;

		var _self = this,
			$this = node;

		// Local variables
		var selectTab,
			startCycle,
			restartCycle,
			rotate,
			$tabs;

		// Helpersgg
		if ( ! _self.settings.speed ) {
			_self.settings.speed = _self.getTransitionDuration( $this.childNodes[ 0 ] );
		}
		// console.log( _self.settings.speed );
		var $childNodes = $this.childNodes,
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

		if ( ! _self.browser.supportsTransitions ) {
			for ( var s5 = 0; s5 < slidesLength; s5++ ) {
				try {
					$slides[ s5 ].style.webkitTransition = 'none';
					$slides[ s5 ].style.mozTransition = 'none';
					$slides[ s5 ].style.oTransition = 'none';
					$slides[ s5 ].style.transition = 'none';
				} catch( e ) {
					if ( _win.console && _win.console.log ) {
						_win.console.log( e );
					}
				}
			}
		}

		// Namespacing
		var namespace = _self.settings.namespace,
			namespaceIndex = ( namespace.length ? namespace : 'rslides' ) + ( sliderIndex + 1 );

		// Classenames
		var activeClass = ( namespace.length ? namespace.replace( /s$/, '' ) + '-' : '' ) + 'active',
			navClass = ( namespace.length ? namespace + '_nav ' : '' ) + namespaceIndex + '_nav',
			slideClassPrefix = namespaceIndex + '_s';

		// Pager
		var $pager = _doc.createElement( 'ul' );
			$pager.className = ( $pager.className ? $pager.className + ' ' : '' ) + ( namespace.length ? namespace + '_tabs ' : '' ) + namespaceIndex + '_tabs';

		// Random order
		if ( _self.settings.random ) {
			$slides = [];
			$childNodes = $this.childNodes;
			for ( var s2 = 0; s2 < $childNodes.length; s2++ ) {
				if ( $childNodes[ s2 ] && $childNodes[ s2 ].nodeType && $childNodes[ s2 ].nodeType === 1 ) {
					$slides.push( $childNodes[ s2 ] );
				}
			}
			slidesLength = $slides.length;
			for ( var n = 0; n < length; n++ ) {
				$this.appendChild( $slides[ Math.floor( Math.random() * ( length - 1 ) ) ] );
			}
		}

		// Add ID's to each slide
		for ( var s3 = 0; s3 < slidesLength; s3++ ) {
			$slides[ s3 ].id = slideClassPrefix + ( s3 + 1 );
		}

		// Add max-width and classes
		if ( namespace.length && ( $this.className || '' ).indexOf( namespace ) < 0 ) {
			$this.className = ( $this.className ? $this.className + ' ' : '' ) + namespace;
		}
		$this.className += ' ' + namespaceIndex;
		if ( _self.settings.maxwidth && ! isNaN( _self.settings.maxwidth ) ) {
			$this.style.maxWidth = _self.settings.maxwidth;
		}

		// Hide all slides, then show first one
		if ( ! _self.browser.supportsTransitions ) {
			for ( var s4 = 0; s4 < slidesLength; s4++ ) {
				_self.hideItem( $slides[ s4 ] );
			}
			_self.showItem( $slides[ 0 ] );
		}
		if ( ( $slides[ 0 ].className || '' ).indexOf( activeClass ) < 0 ) {
			$slides[ 0 ].className = ( $slides[ 0 ].className ? $slides[ 0 ].className + ' ' : '' ) + activeClass;
			if ( _self.settings.bootstrap && ( $slides[ 0 ].className || '' ).indexOf( ' active' ) < 0 ) {
				$slides[ 0 ].className += ' active';				
			}
		}

		// CSS transitions => Moved to the stylesheet
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
					if ( _win.console && _win.console.log ) {
						_win.console.log( e );
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
				// Inject pager
				if ( _self.settings.navContainer ) {
					$navContainer = _doc.querySelectorAll( _self.settings.navContainer ) || false;
					if ( $navContainer && $navContainer.length ) {
						$navContainer.appendChild( $pager );
					}
				}
				if ( ! $navContainer ) {
					if ( ! $this.nextSibling || ! $this.nextSibling.length ) {
						$this.parentNode.appendChild( $pager );
					}
					else {
						// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
						$this.parentNode.insertBefore( $pager, $this.nextSibling );
					}
				}
				for ( var p = 0, listItem, link; p < slidesLength; p++ ) {
					listItem = _doc.createElement( 'li' );
					listItem.className = slideClassPrefix + ( p + 1 );
					link = _doc.createElement( 'a' );
					link.href = '#' + slideClassPrefix + ( p + 1 );
					link.appendChild( _doc.createTextNode( p + 1 ) );
					listItem.appendChild( link );
					$pager.appendChild( listItem );
				}
			}

			// Manual pager controls
			$tabs = [];
			if ( _self.settings.manualControls ) {
				// 1. First check inside the child nodes
				$pager = $this.querySelector( _self.settings.manualControls ) || false;
				if ( ! $pager ) {
					// 2. Check the parent node for any siblings
					$pager = $this.parentNode.querySelector( _self.settings.manualControls ) || false;
					if ( ! $pager ) {
						// 3. Finally in last check into the whole document
						$pager = _doc.querySelector( _self.settings.manualControls ) || false;
					}
				}
				if ( ! $pager ) {
					_self.settings.pager = false;
					_self.settings.manualControls = false;
				}
				else {
					$pager.className = ( $pager.className ? $pager.className + ' ' : '' ) + ( namespace.length ? namespace + '_tabs ' : '' ) + namespaceIndex + '_tabs';
					// Add pager slide class prefixes
					var $pagerChildNodes = $pager.childNodes;
					for ( var pcn2 = 0, pcn3 = 1; pcn2 < $pagerChildNodes.length; pcn2++ ) {
						if ( $pagerChildNodes[ pcn2 ] && $pagerChildNodes[ pcn2 ].nodeType && $pagerChildNodes[ pcn2 ].nodeType === 1 ) {
							$pagerChildNodes[ pcn2 ].className = ( $pagerChildNodes[ pcn2 ].className ? $pagerChildNodes[ pcn2 ].className + ' ' : '' ) + slideClassPrefix + pcn3;
							pcn3++;
							$tabs.push( $pagerChildNodes[ pcn2 ] );
						}
					}
				}
			}
			else if ( _self.settings.pager ) {
				$tabs = $pager.getElementsByTagName( 'a' ) || [];
			}

			// If we have a pager, we need to set up the selectTab function
			if ( _self.settings.pager || _self.settings.manualControls ) {

				// Select pager item
				selectTab = function( tabIndex ) {
					var myTab,
						isBoostrap = _self.settings.bootstrap,
						useParent = $tabs[ 0 ] && ( $tabs[ 0 ].tagName || '' ).toUpperCase() === 'A' && $tabs[ 0 ].parentNode !== $pager ? 1 : 0;
					for ( var t = 0; t < $tabs.length; t++ ) {
						myTab = useParent ? $tabs[ t ].parentNode : $tabs[ t ];
						myTab.className = ( myTab.className || '' ).replace( new RegExp( '\\s*' + activeClass ), '' );
						if ( isBoostrap ) {
							myTab.className = ( myTab.className || '' ).replace( /\s*active/, '' );
						}
					}
					if ( $tabs[ tabIndex ] ) {
						myTab = useParent ? $tabs[ tabIndex ].parentNode : $tabs[ tabIndex ];
						myTab.className = ( myTab.className ? myTab.className + ' ' : '' ) + activeClass;
						if ( isBoostrap ) {
							myTab.className += ' active';
						}
					}
				};
			}
			else {
				selectTab = function() {};
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

				if ( _self.settings.stop ) {
					var autoStop = parseInt( _self.settings.stop, 10 );
					setTimeout(function() {
						clearTimeout( rotate );
					}, ! isNaN( autoStop ) && autoStop > 1000 * 10 ? autoStop : 1000 * 60 );
				}
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
					clearTimeout( rotate );
				});
				$this.addEventListener( 'mouseleave', function() {
					restartCycle();
				});
			}

			// Pager click event handler
			if ( _self.settings.pager || _self.settings.manualControls ) {
				$pager.addEventListener( 'click', function( event ) {
					if ( typeof event.preventDefault === 'function' ) {
						event.preventDefault();
					}
					if ( typeof event.stopPropagation === 'function' ) {
						event.stopPropagation();
					}
					if ( ! _self.settings.pauseControls ) {
						restartCycle();
					}
					var $item, $target = event.target;
					if ( $target.parentNode !== $pager ) {
						while ( $target.parentNode && $target.parentNode !== $pager ) {
							$target = $target.parentNode;
							$item = $target;
						}
					}
					else {
						$item = $target;
					}
					if ( ! $item.nodeType || $item.nodeType !== 1 ) {
						return false;
					}
					// Get index of clicked tab
					var newIndex = 0;
					while ( $item.previousSibling ) {
						$item = $item.previousSibling;
						if ( $item.nodeType && $item.nodeType === 1 ) {
							newIndex++;
						}
					}
					// Break if element is already active or currently animated
					if ( newIndex === _self.sliders[ instanceIndex ].current ) {
						return false;
					}
					// Remove active state from old tab and set new one
					selectTab( newIndex );
					// Do the animation
					_self.slideTo( instanceIndex, newIndex );
					// Backward compatibility
					event.returnValue = false;
					return false;
				});
				selectTab( 0 );

				// Pause when hovering pager
				if ( _self.settings.pauseControls ) {
					$pager.addEventListener( 'mouseenter', function() {
						clearInterval( rotate );
					});
					$pager.addEventListener( 'mouseleave', function() {
						restartCycle();
					});
				}
			}


			// Navigation
			if ( _self.settings.nav ) {
				var $navLinks = [];
				if ( typeof _self.settings.nav === 'string' && typeof _doc.querySelectorAll === 'function' ) {
					$navLinks = _doc.querySelectorAll( _self.settings.nav ) || [];
				}
				else if ( typeof _self.settings.nav === 'boolean' ) {
					var prevLink = _doc.createElement( 'a' ),
						nextLink = _doc.createElement( 'a' );
					prevLink.setAttribute( 'href', '#' + ( node.id || '' ) );
					prevLink.setAttribute( 'id', namespaceIndex + '_prev' );
					prevLink.setAttribute( 'class', navClass + ' prev' );
					prevLink.setAttribute( 'role', 'button' );
					prevLink.setAttribute( 'data-slide', 'prev' );
					prevLink.appendChild( _doc.createTextNode( _self.settings.prevText ) );
					nextLink.setAttribute( 'href', '#' + ( node.id || '' ) );
					nextLink.setAttribute( 'id', namespaceIndex + '_next' );
					nextLink.setAttribute( 'class', navClass + ' next' );
					nextLink.setAttribute( 'role', 'button' );
					nextLink.setAttribute( 'data-slide', 'next' );
					nextLink.appendChild( _doc.createTextNode( _self.settings.nextText ) );

					// Inject navigation
					if ( $navContainer ) { // Variable already initialized at the beginning
						$navContainer.appendChild( prevLink );
						$navContainer.appendChild( nextLink );
					} else {
						if ( ! $this.nextSibling || ! $this.nextSibling.length ) {
							$this.parentNode.appendChild( prevLink );
							$this.parentNode.appendChild( nextLink );
						}
						else {
							// https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
							$this.parentNode.insertBefore( nextLink, $this.nextSibling );
							$this.parentNode.insertBefore( prevLink, $this.nextSibling );
						}
					}
					$navLinks.push( _doc.getElementById( namespaceIndex + '_prev' ) || false );
					$navLinks.push( _doc.getElementById( namespaceIndex + '_next' ) || false );
				}

				// Click event handler
				var navClickHandler = function( event ) {
					if ( typeof event.preventDefault === 'function' ) {
						event.preventDefault();
					}
					if ( typeof event.stopPropagation === 'function' ) {
						event.stopPropagation();
					}
					var currInstance = _self.sliders[ instanceIndex ],
						currIndex = currInstance.current,
						currSlides = currInstance.slides;
					if ( /prev/.test( this.id || this.className || '' ) ) {
						// Previous
						currIndex = currIndex - 1;
						if ( currIndex < 0 ) {
							currIndex = currSlides.length - 1;
						}
					}
					else if ( /next/.test( this.id || this.className || '' ) ) {
						// Next
						currIndex = currIndex + 1;
						if ( currIndex >= currSlides.length ) {
							currIndex = 0;
						}
					}
					setTimeout(function() {
						// Remove active state from old tab and set new one
						selectTab( currIndex );
						// Do the animation
						_self.slideTo( instanceIndex, currIndex );
						if ( ! _self.settings.pauseControls ) {
							restartCycle();
						}
					}, _self.browser.animating > 0 ? _self.browser.animating - new Date().getTime() : 10 );
					// Backward compatibility
					event.returnValue = false;
					return false;
				};
				for ( var nl = 0, tmpStopCycle = function() { clearInterval( rotate ); }, tmpStartCycle = function() { restartCycle(); }, navLim = $navLinks.length; nl < navLim; nl++ ) {
					if ( $navLinks[ nl ] ) {
						$navLinks[ nl ].addEventListener( 'click', navClickHandler );
						if ( _self.settings.pauseControls ) {
							$navLinks[ nl ].addEventListener( 'mousehover', tmpStopCycle );
							$navLinks[ nl ].addEventListener( 'mouseout', tmpStartCycle );
						}
					}
				}
			}

		}

		// Max-width fallback
		/*
		if (typeof _doc.body.style.maxWidth === "undefined" && options.maxwidth) {
			var widthSupport = function () {
				$this.css("width", "100%");
				if ($this.width() > maxw) {
					$this.css("width", maxw);
				}
			};

			// Init fallback
			widthSupport();
			$(_win).bind("resize", function () {
				widthSupport();
			});
		}
		*/

		return {
			slider: $this,
			slides: $slides,
			current: 0,
			classNames: {
				active: activeClass
			}
		};

	};

	_win.responsiveSlides = responsiveSlides;

})( window, document );
