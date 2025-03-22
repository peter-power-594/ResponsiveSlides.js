/*! Responsive Slides²
 *
 * @author Fork Copyright (c) 2023-2025 @peter-power-594 Pierre-Henri Lavigne 
 * @author Original Copyright (c) 2011-2023 @arielsalminen
 * @license Available under the MIT license
 */
class ResponsiveSlides {

	settings: {
		// Boolean: Animate automatically, true or false. Default is true.
		auto: boolean,
		// Boolean: Auto stop the carousel after a certain amount of time. Default is true.
		stop: boolean,
		// Integer: Speed of the transition, in milliseconds. By default retrieved dynamically from css transiton duration.
		speed: number,
		// Integer: Time between slide transitions, in milliseconds. Default is 4s (4000ms).
		timeout: number,
		// Boolean: Show pager, true or false
		pager: boolean,
		// Boolean: Show navigation, true or false
		nav: boolean,
		// Boolean: Randomize the order of the slides, true or false
		random: boolean,
		// Boolean: Pause on hover, true or false
		pause: boolean,
		// Boolean: Pause when hovering controls, true or false
		pauseControls: boolean,
		// String: Text for the "previous" button
		prevText: string,
		// String: Text for the "next" button
		nextText: string,
		// Integer: Max-width of the slideshow, in pixels
		maxWidth: number,
		// String: The selector where auto generated controls should be appended to, default is after the <ul>
		navContainer: string,
		// String: The selector to declare custom pager navigation
		manualControls: string,
		// String: Change the default namespace used
		namespace: string,
		// Function: Before callback
		before: Function,
		// Function: After callback
		after: Function,
	} = {
		auto: true,
		stop: true,
		speed: 0,
		timeout: 4000,
		pager: false,
		nav: false,
		random: false,
		pause: false,
		pauseControls: false,
		prevText: 'Previous',
		nextText: 'Next',
		maxWidth: 0,
		navContainer: '',
		manualControls: '',
		namespace: 'slides',
		before: function() {},
		after: function() {}
	}

	/*
	
		// Bootstrap
		"bootstrap": typeof ops.bootstrap === 'boolean' ? ops.bootstrap : false
	
	};
	*/

	browser: {
		supportsTransition: boolean,
		animating: boolean
	} = {
		supportsTransition: false,
		animating: false
	}


	constructor(sel: HTMLElement | string, ops: { auto?: boolean, stop?: boolean, speed?: number, timeout?: number, pager?: boolean, nav?: boolean, random?: boolean, pause?: boolean, pauseControls?: boolean, prevText?: string, nextText?: string, maxWidth?: number, navContainer?: string, manualControls?: string, namespace?: string, before?: Function, after?: Function }) {
		let myElement;
		if (!sel) {
			throw new Error('Selector is required');
		} else if (typeof sel === 'string') {
			myElement = document.querySelectorAll(sel);
		} else {
			myElement = sel;
		}
		if (!myElement) {
			this.logger('Element' + sel + ' not found');
		} else if (document.readyState && document.readyState !== 'loading' ) {
			this.initSlider(myElement, ops);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				this.initSlider(myElement, ops);
			});
		}
	}

	logger(msg: string) {
		let myConsole = window.console;
		if (myConsole && myConsole.log) {
			myConsole.log(msg);
		}
	}


	initSlider(myElement: HTMLElement, ops: { auto?: boolean, stop?: boolean, speed?: number, timeout?: number, pager?: boolean, nav?: boolean, random?: boolean, pause?: boolean, pauseControls?: boolean, prevText?: string, nextText?: string, maxWidth?: number, navContainer?: string, manualControls?: string, namespace?: string, before?: Function, after?: Function }) {
		if (typeof ops.auto === 'boolean') {
			this.settings.auto = ops.auto;
		}
		if (typeof ops.stop === 'boolean') {
			this.settings.stop = ops.stop;
		}
		if (typeof ops.speed === 'number' && +ops.speed > 0) {
			this.settings.speed = ops.speed;
		}
		if (typeof ops.timeout === 'number' && +ops.timeout > 0) {
			this.settings.timeout = ops.timeout;
		}
		if (typeof ops.pager === 'boolean') {
			this.settings.pager = ops.pager;
		}
		if (typeof ops.nav !== 'undefined' ) {
			this.settings.nav = ops.nav;
		}
		if (typeof ops.random === 'boolean') {
			this.settings.random = ops.random;
		}
		if (typeof ops.pause === 'boolean') {
			this.settings.pause = ops.pause;
		}
		if (typeof ops.pauseControls === 'boolean') {
			this.settings.pauseControls = ops.pauseControls;
		}
		if (typeof ops.prevText === 'string' && ops.prevText.length) {
			this.settings.prevText = ops.prevText;
		}
		if (typeof ops.nextText === 'string' && ops.nextText.length) {
			this.settings.nextText = ops.nextText;
		}
		if (typeof ops.maxWidth === 'number' && ops.maxWidth > 0) {
			this.settings.maxWidth = ops.maxWidth;
		}
		if (typeof ops.navContainer === 'string' && ops.navContainer.length) {
			this.settings.navContainer = ops.navContainer;
		}
		if (typeof ops.manualControls === 'string' && ops.manualControls.length ) {
			this.settings.manualControls = ops.manualControls;
		}
		if (typeof ops.namespace === 'string' && ops.namespace.length ) {
			this.settings.namespace = ops.namespace;
		}
		if (typeof ops.before === 'function' ) {
			this.settings.before = ops.before;
		}
		if (typeof ops.after === 'function' ) {
			this.settings.after = ops.after;
		}
		this.browser.supportsTransition = this.transitionSupported();
	}


	transitionSupported(): boolean {
		let docBody = document.body || document.documentElement,
			styles = docBody.style,
			prop = 'transition';
		if ( typeof styles[prop] === 'string' ) {
			return true;
		}
		// Tests for vendor specific prop
		for ( let vendor = [ 'Moz', 'Webkit', 'Khtml', 'O', 'ms' ], prop = 'Transition', v = 0; v < vendor.length; v++ ) {
			if ( typeof styles[ vendor[ v ] + prop ] === "string" ) {
				return true;
			}
		}
		return false;
	};


}
