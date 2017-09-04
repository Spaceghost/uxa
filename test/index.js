/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(15);

	var socket = new WebSocket('ws://localhost:3002/socket');

	var marked = __webpack_require__(22);

	_T.extendTag('element', function(tag){
		tag.prototype.__markdown = {watch: 'markdownDidSet',name: 'markdown'};
		tag.prototype.markdown = function(v){ return this._markdown; }
		tag.prototype.setMarkdown = function(v){
			var a = this.markdown();
			if(v != a) { this._markdown = v; }
			if(v != a) { this.markdownDidSet && this.markdownDidSet(v,a,this.__markdown) }
			return this;
		};
		
		tag.prototype.markdownDidSet = function (text){
			return this.dom().innerHTML = marked(text);
		};
	});


	var Head = __webpack_require__(23).Head;
	var Nav = __webpack_require__(25).Nav;
	var Home = __webpack_require__(26).Home;

	socket.onmessage = function(e) {
		var v_;
		console.log('got message!!!',e);
		return (id$('uxa-css').setHref(v_ = ("style.css?" + (Math.random()))),v_);
	};


	var App = _T.defineTag('App', function(tag){
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				(__.A = __.A || Head.build(this).setId('head').flag('dark')).end(),
				(__.B = __.B || Nav.build(self).setId('nav').flag('panel').flag('drawer')).end(),
				(__.C = __.C || _T.DIV(self).setId('main')).setContent(
					(__.CA = __.CA || Home.build(self)).end()
				,2).end()
			],2).synced();
		};
	});

	Imba.mount(App.build(this).end());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	if (typeof Imba !== 'undefined') {
		console.warn(("Imba v" + (Imba.VERSION) + " is already loaded."));
		module.exports = Imba;
	} else {
		var Imba = __webpack_require__(2);
		module.exports = Imba;
		
		
		__webpack_require__(3);
		__webpack_require__(4);
		
		
		
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	// imba$nolib=1

	/*
	Imba is the namespace for all runtime related utilities
	@namespace
	*/

	Imba = {VERSION: '1.0.0-rc.3'};

	if (typeof window !== 'undefined') {
		window.imba = Imba;
		window.global || (window.global = window);
		
		if (window.define && window.define.amd) {
			window.define("imba",[],function() { return Imba; });
		};
	};

	/*
	True if running in client environment.
	@return {bool}
	*/

	Imba.isClient = function (){
		return true;
	};

	/*
	True if running in server environment.
	@return {bool}
	*/

	Imba.isServer = function (){
		return false;
	};

	Imba.subclass = function (obj,sup){
		;
		for (var k in sup){
			if (sup.hasOwnProperty(k)) { obj[k] = sup[k] };
		};
		
		obj.prototype = Object.create(sup.prototype);
		obj.__super__ = obj.prototype.__super__ = sup.prototype;
		obj.prototype.initialize = obj.prototype.constructor = obj;
		return obj;
	};

	/*
	Lightweight method for making an object iterable in imbas for/in loops.
	If the compiler cannot say for certain that a target in a for loop is an
	array, it will cache the iterable version before looping.

	```imba
	# this is the whole method
	def Imba.iterable o
		return o ? (o:toArray ? o.toArray : o) : []

	class CustomIterable
		def toArray
			[1,2,3]

	# will return [2,4,6]
	for x in CustomIterable.new
		x * 2

	```
	*/

	Imba.iterable = function (o){
		return o ? ((o.toArray ? o.toArray() : o)) : [];
	};

	/*
	Coerces a value into a promise. If value is array it will
	call `Promise.all(value)`, or if it is not a promise it will
	wrap the value in `Promise.resolve(value)`. Used for experimental
	await syntax.
	@return {Promise}
	*/

	Imba.await = function (value){
		if (value instanceof Array) {
			return Promise.all(value);
		} else if (value && value.then) {
			return value;
		} else {
			return Promise.resolve(value);
		};
	};

	var dashRegex = /-./g;

	Imba.toCamelCase = function (str){
		if (str.indexOf('-') >= 0) {
			return str.replace(dashRegex,function(m) { return m.charAt(1).toUpperCase(); });
		} else {
			return str;
		};
	};

	Imba.indexOf = function (a,b){
		return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
	};

	Imba.len = function (a){
		return a && ((a.len instanceof Function) ? a.len.call(a) : a.length) || 0;
	};

	Imba.prop = function (scope,name,opts){
		if (scope.defineProperty) {
			return scope.defineProperty(name,opts);
		};
		return;
	};

	Imba.attr = function (scope,name,opts){
		if (scope.defineAttribute) {
			return scope.defineAttribute(name,opts);
		};
		
		var getName = Imba.toCamelCase(name);
		var setName = Imba.toCamelCase('set-' + name);
		
		scope.prototype[getName] = function() {
			return this.getAttribute(name);
		};
		
		scope.prototype[setName] = function(value) {
			this.setAttribute(name,value);
			return this;
		};
		return;
	};

	Imba.propDidSet = function (object,property,val,prev){
		var fn = property.watch;
		if (fn instanceof Function) {
			fn.call(object,val,prev,property);
		} else if ((typeof fn=='string'||fn instanceof String) && object[fn]) {
			object[fn](val,prev,property);
		};
		return;
	};


	// Basic events
	function emit__(event,args,node){
		// var node = cbs[event]
		var prev,cb,ret;
		
		while ((prev = node) && (node = node.next)){
			if (cb = node.listener) {
				if (node.path && cb[node.path]) {
					ret = args ? cb[node.path].apply(cb,args) : cb[node.path]();
				} else {
					// check if it is a method?
					ret = args ? cb.apply(node,args) : cb.call(node);
				};
			};
			
			if (node.times && --node.times <= 0) {
				prev.next = node.next;
				node.listener = null;
			};
		};
		return;
	};

	// method for registering a listener on object
	Imba.listen = function (obj,event,listener,path){
		var $1;
		var cbs,list,tail;
		cbs = obj.__listeners__ || (obj.__listeners__ = {});
		list = cbs[($1 = event)] || (cbs[$1] = {});
		tail = list.tail || (list.tail = (list.next = {}));
		tail.listener = listener;
		tail.path = path;
		list.tail = tail.next = {};
		return tail;
	};

	// register a listener once
	Imba.once = function (obj,event,listener){
		var tail = Imba.listen(obj,event,listener);
		tail.times = 1;
		return tail;
	};

	// remove a listener
	Imba.unlisten = function (obj,event,cb,meth){
		var node,prev;
		var meta = obj.__listeners__;
		if (!meta) { return };
		
		if (node = meta[event]) {
			while ((prev = node) && (node = node.next)){
				if (node == cb || node.listener == cb) {
					prev.next = node.next;
					// check for correct path as well?
					node.listener = null;
					break;
				};
			};
		};
		return;
	};

	// emit event
	Imba.emit = function (obj,event,params){
		var cb;
		if (cb = obj.__listeners__) {
			if (cb[event]) { emit__(event,params,cb[event]) };
			if (cb.all) { emit__(event,[event,params],cb.all) }; // and event != 'all'
		};
		return;
	};

	Imba.observeProperty = function (observer,key,trigger,target,prev){
		if (prev && typeof prev == 'object') {
			Imba.unlisten(prev,'all',observer,trigger);
		};
		if (target && typeof target == 'object') {
			Imba.listen(target,'all',observer,trigger);
		};
		return this;
	};

	module.exports = Imba;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };

	var requestAnimationFrame; // very simple raf polyfill
	var cancelAnimationFrame;




	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitRequestAnimationFrame;
	requestAnimationFrame = window.requestAnimationFrame;
	requestAnimationFrame || (requestAnimationFrame = window.webkitRequestAnimationFrame);
	requestAnimationFrame || (requestAnimationFrame = window.mozRequestAnimationFrame);
	requestAnimationFrame || (requestAnimationFrame = function(blk) { return setTimeout(blk,1000 / 60); });


	function Ticker(){
		var self = this;
		self._queue = [];
		self._stage = -1;
		self._scheduled = false;
		self._ticker = function(e) {
			self._scheduled = false;
			return self.tick(e);
		};
		self;
	};

	Ticker.prototype.stage = function(v){ return this._stage; }
	Ticker.prototype.setStage = function(v){ this._stage = v; return this; };
	Ticker.prototype.queue = function(v){ return this._queue; }
	Ticker.prototype.setQueue = function(v){ this._queue = v; return this; };

	Ticker.prototype.add = function (item,force){
		if (force || this._queue.indexOf(item) == -1) {
			this._queue.push(item);
		};
		
		if (!this._scheduled) { return this.schedule() };
	};

	Ticker.prototype.tick = function (timestamp){
		var items = this._queue;
		if (!this._ts) { this._ts = timestamp };
		this._dt = timestamp - this._ts;
		this._ts = timestamp;
		this._queue = [];
		this._stage = 1;
		this.before();
		if (items.length) {
			for (var i = 0, ary = iter$(items), len = ary.length, item; i < len; i++) {
				item = ary[i];
				if (item instanceof Function) {
					item(this._dt,this);
				} else if (item.tick) {
					item.tick(this._dt,this);
				};
			};
		};
		this._stage = 2;
		this.after();
		this._stage = this._scheduled ? 0 : (-1);
		return this;
	};

	Ticker.prototype.schedule = function (){
		if (!this._scheduled) {
			this._scheduled = true;
			if (this._stage == -1) {
				this._stage = 0;
			};
			requestAnimationFrame(this._ticker);
		};
		return this;
	};

	Ticker.prototype.before = function (){
		return this;
	};

	Ticker.prototype.after = function (){
		Imba.commit();
		return this;
	};

	Imba.TICKER = new Ticker();

	Imba.commit = function (){
		return Imba.TagManager.refresh();
	};

	Imba.ticker = function (){
		return Imba.TICKER;
	};

	Imba.requestAnimationFrame = function (callback){
		return requestAnimationFrame(callback);
	};

	Imba.cancelAnimationFrame = function (id){
		return cancelAnimationFrame(id);
	};

	/*

	Light wrapper around native setTimeout that expects the block / function
	as last argument (instead of first). It also triggers an event to Imba
	after the timeout to let schedulers update (to rerender etc) afterwards.

	*/

	Imba.setTimeout = function (delay,block){
		return setTimeout(function() {
			block();
			return Imba.commit();
		},delay);
	};

	/*

	Light wrapper around native setInterval that expects the block / function
	as last argument (instead of first). It also triggers an event to Imba
	after every interval to let schedulers update (to rerender etc) afterwards.

	*/

	Imba.setInterval = function (interval,block){
		return setInterval(function() {
			block();
			return Imba.commit();
		},interval);
	};

	/*
	Clear interval with specified id
	*/

	Imba.clearInterval = function (interval){
		return clearInterval(interval);
	};

	/*
	Clear timeout with specified id
	*/

	Imba.clearTimeout = function (timeout){
		return clearTimeout(timeout);
	};

	// should add an Imba.run / setImmediate that
	// pushes listener onto the tick-queue with times - once


	/*

	Instances of Imba.Scheduler manages when to call `tick()` on their target,
	at a specified framerate or when certain events occur. Root-nodes in your
	applications will usually have a scheduler to make sure they rerender when
	something changes. It is also possible to make inner components use their
	own schedulers to control when they render.

	@iname scheduler

	*/

	Imba.Scheduler = function Scheduler(target){
		var self = this;
		self._id = counter++;
		self._target = target;
		self._marked = false;
		self._active = false;
		self._marker = function() { return self.mark(); };
		self._ticker = function(e) { return self.tick(e); };
		
		self._dt = 0;
		self._frame = {};
		self._state = {raf: false,event: false,interval: false};
		self._scheduled = false;
		self._timestamp = 0;
		self._ticks = 0;
		self._flushes = 0;
		self;
	};

	var counter = 0;

	Imba.Scheduler.event = function (e){
		return Imba.emit(Imba,'event',e);
	};

	/*
		Create a new Imba.Scheduler for specified target
		@return {Imba.Scheduler}
		*/

	Imba.Scheduler.prototype.__raf = {watch: 'rafDidSet',name: 'raf'};
	Imba.Scheduler.prototype.raf = function(v){ return this._raf; }
	Imba.Scheduler.prototype.setRaf = function(v){
		var a = this.raf();
		if(v != a) { this._raf = v; }
		if(v != a) { this.rafDidSet && this.rafDidSet(v,a,this.__raf) }
		return this;
	};
	Imba.Scheduler.prototype.__interval = {watch: 'intervalDidSet',name: 'interval'};
	Imba.Scheduler.prototype.interval = function(v){ return this._interval; }
	Imba.Scheduler.prototype.setInterval = function(v){
		var a = this.interval();
		if(v != a) { this._interval = v; }
		if(v != a) { this.intervalDidSet && this.intervalDidSet(v,a,this.__interval) }
		return this;
	};
	Imba.Scheduler.prototype.__events = {watch: 'eventsDidSet',name: 'events'};
	Imba.Scheduler.prototype.events = function(v){ return this._events; }
	Imba.Scheduler.prototype.setEvents = function(v){
		var a = this.events();
		if(v != a) { this._events = v; }
		if(v != a) { this.eventsDidSet && this.eventsDidSet(v,a,this.__events) }
		return this;
	};
	Imba.Scheduler.prototype.marked = function(v){ return this._marked; }
	Imba.Scheduler.prototype.setMarked = function(v){ this._marked = v; return this; };

	Imba.Scheduler.prototype.rafDidSet = function (bool){
		this._state.raf = bool;
		if (bool) this.requestTick();
		return this;
	};

	Imba.Scheduler.prototype.intervalDidSet = function (time){
		this._state.interval = time;
		clearInterval(this._intervalId);
		if (time) { this._intervalId = Imba.setInterval(time,this._ticker) };
		return this;
	};

	Imba.Scheduler.prototype.eventsDidSet = function (new$,prev){
		this._state.events = new$;
		if (new$) {
			return Imba.listen(Imba,'event',this,'onevent');
		} else {
			return Imba.unlisten(Imba,'event',this,'onevent');
		};
	};

	/*
		Check whether the current scheduler is active or not
		@return {bool}
		*/

	Imba.Scheduler.prototype.active = function (){
		return this._active;
	};

	/*
		Delta time between the two last ticks
		@return {Number}
		*/

	Imba.Scheduler.prototype.dt = function (){
		return this._dt;
	};

	/*
		Configure the scheduler
		@return {self}
		*/

	Imba.Scheduler.prototype.configure = function (options){ // fps: 1, events: yes
		var v_;
		if(options === undefined) options = {};
		if (options.raf != undefined) { (this.setRaf(v_ = options.raf),v_) };
		if (options.interval != undefined) { (this.setInterval(v_ = options.interval),v_) };
		if (options.events != undefined) { (this.setEvents(v_ = options.events),v_) };
		return this;
	};

	/*
		Mark the scheduler as dirty. This will make sure that
		the scheduler calls `target.tick` on the next frame
		@return {self}
		*/

	Imba.Scheduler.prototype.mark = function (){
		this._marked = true;
		if (!this._scheduled) {
			this.requestTick();
		};
		return this;
	};

	/*
		Instantly trigger target.tick and mark scheduler as clean (not dirty/marked).
		This is called implicitly from tick, but can also be called manually if you
		really want to force a tick without waiting for the next frame.
		@return {self}
		*/

	Imba.Scheduler.prototype.flush = function (){
		this._flushes++;
		this._target.tick(this);
		this._marked = false;
		return this;
	};

	/*
		@fixme this expects raf to run at 60 fps 

		Called automatically on every frame while the scheduler is active.
		It will only call `target.tick` if the scheduler is marked dirty,
		or when according to @fps setting.

		If you have set up a scheduler with an fps of 1, tick will still be
		called every frame, but `target.tick` will only be called once every
		second, and it will *make sure* each `target.tick` happens in separate
		seconds according to Date. So if you have a node that renders a clock
		based on Date.now (or something similar), you can schedule it with 1fps,
		never needing to worry about two ticks happening within the same second.
		The same goes for 4fps, 10fps etc.

		@protected
		@return {self}
		*/

	Imba.Scheduler.prototype.tick = function (delta,ticker){
		this._ticks++;
		this._dt = delta;
		
		if (ticker) {
			this._scheduled = false;
		};
		
		this.flush();
		
		if (this._raf) {
			this.requestTick();
		};
		return this;
	};

	Imba.Scheduler.prototype.requestTick = function (){
		if (!this._scheduled) {
			this._scheduled = true;
			Imba.TICKER.add(this);
		};
		return this;
	};

	/*
		Start the scheduler if it is not already active.
		**While active**, the scheduler will override `target.commit`
		to do nothing. By default Imba.tag#commit calls render, so
		that rendering is cascaded through to children when rendering
		a node. When a scheduler is active (for a node), Imba disables
		this automatic rendering.
		*/

	Imba.Scheduler.prototype.activate = function (){
		if (!this._active) {
			this._active = true;
			this._commit = this._target.commit;
			this._target.commit = function() { return this; };
			this._target && this._target.flag  &&  this._target.flag('scheduled_');
			this.tick(0);
		};
		
		return this;
	};

	/*
		Stop the scheduler if it is active.
		*/

	Imba.Scheduler.prototype.deactivate = function (){
		this._restoreState = {events: this.events(),raf: this.raf(),interval: this.interval()};
		this.setEvents(false);
		this.setRaf(false);
		this.setInterval(0);
		
		if (this._active) {
			this._active = false;
			this._target.commit = this._commit;
			// Imba.unschedule(self)
			// Imba.unlisten(Imba,'event',self)
			this._target && this._target.unflag  &&  this._target.unflag('scheduled_');
		};
		return this;
	};

	Imba.Scheduler.prototype.track = function (){
		return this._marker;
	};

	Imba.Scheduler.prototype.onevent = function (event){
		var $1;
		if (!this._events) { return this };
		
		if (this._events instanceof Function) {
			if (this._events(event)) this.mark();
		} else if (this._events instanceof Array) {
			if (this._events.indexOf(($1 = event) && $1.type  &&  $1.type()) >= 0) {
				this.mark();
			};
		} else {
			this.mark();
		};
		return this;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Imba_;
	__webpack_require__(5);

	Imba.TagManager = new Imba.TagManagerClass();

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);


	__webpack_require__(14);





	Imba.POINTER || (Imba.POINTER = new Imba.Pointer());

	Imba.Events = new Imba.EventManager(Imba.document(),{events: [
		'keydown','keyup','keypress',
		'textInput','input','change','submit',
		'focusin','focusout','focus','blur',
		'contextmenu','dblclick',
		'mousewheel','wheel','scroll',
		'beforecopy','copy',
		'beforepaste','paste',
		'beforecut','cut'
	]});

	// should listen to dragdrop events by default
	Imba.Events.register([
		'dragstart','drag','dragend',
		'dragenter','dragover','dragleave','dragexit','drop'
	]);

	var hasTouchEvents = window && window.ontouchstart !== undefined;

	if (hasTouchEvents) {
		Imba.Events.listen('touchstart',function(e) {
			return Imba.Touch.ontouchstart(e);
		});
		
		Imba.Events.listen('touchmove',function(e) {
			return Imba.Touch.ontouchmove(e);
		});
		
		Imba.Events.listen('touchend',function(e) {
			return Imba.Touch.ontouchend(e);
		});
		
		Imba.Events.listen('touchcancel',function(e) {
			return Imba.Touch.ontouchcancel(e);
		});
	};

	Imba.Events.register('click',function(e) {
		// Only for main mousebutton, no?
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			var tap = new Imba.Event(e);
			tap.setType('tap');
			tap.process();
			if (tap._responder) {
				return e.preventDefault();
			};
		};
		// delegate the real click event
		return Imba.Events.delegate(e);
	});

	Imba.Events.listen('mousedown',function(e) {
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
		};
	});

	Imba.Events.listen('mouseup',function(e) {
		if ((e.timeStamp - Imba.Touch.LastTimestamp) > Imba.Touch.TapTimeout) {
			if (Imba.POINTER) { return Imba.POINTER.update(e).process() };
		};
	});

	Imba.Events.register(['mousedown','mouseup']);
	Imba.Events.setEnabled(true);



/***/ },
/* 5 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	Imba.TagManagerClass = function TagManagerClass(){
		this._spawns = 0;
		this._inserts = 0;
		this._removes = 0;
		this._mounted = [];
		this._hasMountables = false;
		this;
	};

	Imba.TagManagerClass.prototype.inserts = function(v){ return this._inserts; }
	Imba.TagManagerClass.prototype.setInserts = function(v){ this._inserts = v; return this; };
	Imba.TagManagerClass.prototype.spawns = function(v){ return this._spawns; }
	Imba.TagManagerClass.prototype.setSpawns = function(v){ this._spawns = v; return this; };
	Imba.TagManagerClass.prototype.removes = function(v){ return this._removes; }
	Imba.TagManagerClass.prototype.setRemoves = function(v){ this._removes = v; return this; };
	Imba.TagManagerClass.prototype.mounted = function(v){ return this._mounted; }
	Imba.TagManagerClass.prototype.setMounted = function(v){ this._mounted = v; return this; };

	Imba.TagManagerClass.prototype.insert = function (node,parent){
		this._inserts++;
		return;
	};

	Imba.TagManagerClass.prototype.remove = function (node,parent){
		this._removes++;
		return;
	};

	Imba.TagManagerClass.prototype.changes = function (){
		return this._inserts + this._removes;
	};

	Imba.TagManagerClass.prototype.mount = function (node){
		
		return this._hasMountables = true;
	};

	Imba.TagManagerClass.prototype.refresh = function (force){
		if(force === undefined) force = false;
		
		// console.time('resolveMounts')
		if (this._inserts && this._hasMountables) {
			this.tryMount();
		};
		
		if ((this._removes || force) && this._mounted.length) {
			this.tryUnmount();
		};
		// console.timeEnd('resolveMounts')
		this._inserts = 0;
		this._removes = 0;
		return this;
	};

	Imba.TagManagerClass.prototype.unmount = function (node){
		return this;
	};

	Imba.TagManagerClass.prototype.tryMount = function (){
		var count = 0;
		var root = document.body;
		var items = root.querySelectorAll('.__mount');
		// what if we end up creating additional mountables by mounting?
		for (var i = 0, ary = iter$(items), len = ary.length, el; i < len; i++) {
			el = ary[i];
			if (el && el._tag) {
				if (this._mounted.indexOf(el._tag) == -1) {
					this.mountNode(el._tag);
				};
			};
		};
		return this;
	};

	Imba.TagManagerClass.prototype.mountNode = function (node){
		this._mounted.push(node);
		node.FLAGS |= Imba.TAG_MOUNTED;
		if (node.mount) { node.mount() };
		return;
	};

	Imba.TagManagerClass.prototype.tryUnmount = function (){
		var count = 0;
		var root = document.body;
		for (var i = 0, ary = iter$(this._mounted), len = ary.length, item; i < len; i++) {
			item = ary[i];
			if (!document.documentElement.contains(item._dom)) {
				item.FLAGS = item.FLAGS & ~Imba.TAG_MOUNTED;
				if (item.unmount && item._dom) {
					item.unmount();
				} else if (item._scheduler) {
					// MAYBE FIX THIS?
					item.unschedule();
				};
				this._mounted[i] = null;
				count++;
			};
		};
		
		if (count) {
			this._mounted = this._mounted.filter(function(item) { return item; });
		};
		return this;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	function idx$(a,b){
		return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
	};
	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	// imba$nolib=1

	// externs;

	Imba.CSSKeyMap = {};

	Imba.TAG_BUILT = 1;
	Imba.TAG_SETUP = 2;
	Imba.TAG_MOUNTING = 4;
	Imba.TAG_MOUNTED = 8;
	Imba.TAG_SCHEDULED = 16;
	Imba.TAG_AWAKENED = 32;

	/*
	Get the current document
	*/

	Imba.document = function (){
		
		return window.document;
		
	};

	/*
	Get the body element wrapped in an Imba.Tag
	*/

	Imba.root = function (){
		return tag$wrap(Imba.document().body);
	};


	Imba.static = function (items,nr){
		items.static = nr;
		return items;
	};

	/*

	*/

	Imba.mount = function (node,into){
		into || (into = Imba.document().body);
		into.appendChild(node.dom());
		Imba.commit();
		return node;
	};


	Imba.createTextNode = function (node){
		if (node && node.nodeType == 3) {
			return node;
		};
		return Imba.document().createTextNode(node);
	};

	/*
	This is the baseclass that all tags in imba inherit from.
	@iname node
	*/

	Imba.Tag = function Tag(dom,ctx){
		this.setDom(dom);
		this.__ = {};
		this.FLAGS = 0;
		
		this.build();
		this;
	};

	Imba.Tag.buildNode = function (){
		var dom = Imba.document().createElement(this._nodeType || 'div');
		if (this._classes) {
			var cls = this._classes.join(" ");
			if (cls) { dom.className = cls };
		};
		return dom;
	};

	Imba.Tag.createNode = function (){
		var proto = (this._protoDom || (this._protoDom = this.buildNode()));
		return proto.cloneNode(false);
	};

	Imba.Tag.build = function (ctx){
		return new this(this.createNode(),ctx);
	};

	Imba.Tag.dom = function (){
		return this._protoDom || (this._protoDom = this.buildNode());
	};

	/*
		Called when a tag type is being subclassed.
		*/

	Imba.Tag.inherit = function (child){
		child.prototype._empty = true;
		child._protoDom = null;
		
		if (this._nodeType) {
			child._nodeType = this._nodeType;
			child._classes = this._classes.slice();
			
			if (child._flagName) {
				return child._classes.push(child._flagName);
			};
		} else {
			child._nodeType = child._name;
			child._flagName = null;
			return child._classes = [];
		};
	};

	/*
		Internal method called after a tag class has
		been declared or extended.
		
		@private
		*/

	Imba.Tag.prototype.optimizeTagStructure = function (){
		var base = Imba.Tag.prototype;
		var hasSetup = this.setup != base.setup;
		var hasCommit = this.commit != base.commit;
		var hasRender = this.render != base.render;
		var hasMount = this.mount;
		
		var ctor = this.constructor;
		
		if (hasCommit || hasRender || hasMount || hasSetup) {
			
			this.end = function() {
				if (this.mount && !(this.FLAGS & Imba.TAG_MOUNTED)) {
					// just activate 
					Imba.TagManager.mount(this);
				};
				
				if (!(this.FLAGS & Imba.TAG_SETUP)) {
					this.FLAGS |= Imba.TAG_SETUP;
					this.setup();
				};
				
				this.commit();
				
				return this;
			};
		};
		
		
		if (hasMount) {
			if (ctor._classes && ctor._classes.indexOf('__mount') == -1) {
				ctor._classes.push('__mount');
			};
			
			if (ctor._protoDom) {
				ctor._protoDom.classList.add('__mount');
			};
		};
		
		for (var i = 0, ary = ['mousemove','mouseenter','mouseleave','mouseover','mouseout','selectstart'], len = ary.length, item; i < len; i++) {
			item = ary[i];
			if (this[("on" + item)]) { Imba.Events.register(item) };
		};
		
		return this;
	};


	Imba.Tag.prototype.tabindex = function(v){ return this.getAttribute('tabindex'); }
	Imba.Tag.prototype.setTabindex = function(v){ this.setAttribute('tabindex',v); return this; };
	Imba.Tag.prototype.title = function(v){ return this.getAttribute('title'); }
	Imba.Tag.prototype.setTitle = function(v){ this.setAttribute('title',v); return this; };
	Imba.Tag.prototype.role = function(v){ return this.getAttribute('role'); }
	Imba.Tag.prototype.setRole = function(v){ this.setAttribute('role',v); return this; };
	Imba.Tag.prototype.name = function(v){ return this.getAttribute('name'); }
	Imba.Tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };

	Imba.Tag.prototype.dom = function (){
		return this._dom;
	};

	Imba.Tag.prototype.setDom = function (dom){
		dom._tag = this;
		this._dom = dom;
		return this;
	};

	Imba.Tag.prototype.ref = function (){
		return this._ref;
	};

	/*
		Setting references for tags like
		`<div@header>` will compile to `tag('div').ref_('header',this).end()`
		By default it adds the reference as a className to the tag.

		@return {self}
		@private
		*/

	Imba.Tag.prototype.ref_ = function (ref,ctx){
		ctx['_' + ref] = this;
		this.flag(this._ref = ref);
		this._owner = ctx;
		return this;
	};


	/*
		Set the data object for node
		@return {self}
		*/

	Imba.Tag.prototype.setData = function (data){
		this._data = data;
		return this;
	};

	/*
		Get the data object for node
		*/

	Imba.Tag.prototype.data = function (){
		return this._data;
	};

	Imba.Tag.prototype.setObject = function (value){
		console.warn('Tag#object= deprecated. Use Tag#data=');
		this.setData(value);
		return this;
	};

	Imba.Tag.prototype.object = function (){
		return this.data();
	};

	/*
		Set inner html of node
		*/

	Imba.Tag.prototype.setHtml = function (html){
		this._dom.innerHTML = html;
		return this;
	};

	/*
		Get inner html of node
		*/

	Imba.Tag.prototype.html = function (){
		return this._dom.innerHTML;
	};


	/*
		Get width of node (offsetWidth)
		@return {number}
		*/

	Imba.Tag.prototype.width = function (){
		return this._dom.offsetWidth;
	};

	/*
		Get height of node (offsetHeight)
		@return {number}
		*/

	Imba.Tag.prototype.height = function (){
		return this._dom.offsetHeight;
	};

	/*
		Method that is called by the compiled tag-chains, for
		binding events on tags to methods etc.
		`<a :tap=fn>` compiles to `tag('a').setHandler('tap',fn,this).end()`
		where this refers to the context in which the tag is created.
		@return {self}
		*/

	Imba.Tag.prototype.setHandler = function (event,handler,ctx){
		var key = 'on' + event;
		
		if (handler instanceof Function) {
			this[key] = handler;
		} else if (handler instanceof Array) {
			var fn = handler.shift();
			this[key] = function(e) { return ctx[fn].apply(ctx,handler.concat(e)); };
		} else {
			this[key] = function(e) { return ctx[handler](e); };
		};
		return this;
	};

	Imba.Tag.prototype.setId = function (id){
		if (id != null) {
			this.dom().id = id;
		};
		return this;
	};

	Imba.Tag.prototype.id = function (){
		return this.dom().id;
	};

	/*
		Adds a new attribute or changes the value of an existing attribute
		on the specified tag. If the value is null or false, the attribute
		will be removed.
		@return {self}
		*/

	Imba.Tag.prototype.setAttribute = function (name,value){
		// should this not return self?
		var old = this.dom().getAttribute(name);
		
		if (old == value) {
			return value;
		} else if (value != null && value !== false) {
			return this.dom().setAttribute(name,value);
		} else {
			return this.dom().removeAttribute(name);
		};
	};

	Imba.Tag.prototype.setNestedAttr = function (ns,name,value){
		if ((this[ns] instanceof Function) && this[ns].length > 1) {
			this[ns](name,value);
			return this;
		};
		
		return this.setAttributeNS(ns,name,value);
	};

	Imba.Tag.prototype.setAttributeNS = function (ns,name,value){
		var old = this.getAttributeNS(ns,name);
		
		if (old == value) {
			value;
		} else if (value != null && value !== false) {
			this.dom().setAttributeNS(ns,name,value);
		} else {
			this.dom().removeAttributeNS(ns,name);
		};
		
		return this;
	};


	/*
		removes an attribute from the specified tag
		*/

	Imba.Tag.prototype.removeAttribute = function (name){
		return this.dom().removeAttribute(name);
	};

	/*
		returns the value of an attribute on the tag.
		If the given attribute does not exist, the value returned
		will either be null or "" (the empty string)
		*/

	Imba.Tag.prototype.getAttribute = function (name){
		return this.dom().getAttribute(name);
	};


	Imba.Tag.prototype.getAttributeNS = function (ns,name){
		return this.dom().getAttributeNS(ns,name);
	};

	/*
		Override this to provide special wrapping etc.
		@return {self}
		*/

	Imba.Tag.prototype.setContent = function (content,type){
		this.setChildren(content,type);
		return this;
	};

	/*
		Set the children of node. type param is optional,
		and should only be used by Imba when compiling tag trees. 
		@return {self}
		*/

	Imba.Tag.prototype.setChildren = function (nodes,type){
		this._empty ? this.append(nodes) : this.empty().append(nodes);
		this._children = null;
		return this;
	};

	/*
		Set the template that will render the content of node.
		@return {self}
		*/

	Imba.Tag.prototype.setTemplate = function (template){
		if (!this._template) {
			// override the basic
			if (this.render == Imba.Tag.prototype.render) {
				this.render = this.renderTemplate; // do setChildren(renderTemplate)
			};
			this.optimizeTagStructure();
		};
		
		this.template = this._template = template;
		return this;
	};

	Imba.Tag.prototype.template = function (){
		return null;
	};

	/*
		If no custom render-method is defined, and the node
		has a template, this method will used to render
		@return {self}
		*/

	Imba.Tag.prototype.renderTemplate = function (){
		var body = this.template();
		if (body != this) { this.setChildren(body) };
		return this;
	};


	/*
		@deprecated
		Remove specified child from current node.
		*/

	Imba.Tag.prototype.remove = function (child){
		return this.removeChild(child);
	};

	/*
		Remove specified child from current node.
		@return {self}
		*/

	Imba.Tag.prototype.removeChild = function (child){
		var par = this.dom();
		var el = (child instanceof Imba.Tag) ? child.dom() : child;
		
		if (el && el.parentNode == par) {
			par.removeChild(el);
			Imba.TagManager.remove(el._tag || el,this);
		};
		return this;
	};


	/*
		Append a single item (node or string) to the current node.
		If supplied item is a string it will automatically. This is used
		by Imba internally, but will practically never be used explicitly.
		@return {self}
		*/

	Imba.Tag.prototype.appendChild = function (node){
		if ((typeof node=='string'||node instanceof String)) {
			this.dom().appendChild(Imba.document().createTextNode(node));
		} else if (node) {
			this.dom().appendChild(node._dom || node);
			Imba.TagManager.insert(node._tag || node,this);
			// FIXME ensure these are not called for text nodes
		};
		return this;
	};

	/*
		Insert a node into the current node (self), before another.
		The relative node must be a child of current node. 
		*/

	Imba.Tag.prototype.insertBefore = function (node,rel){
		if ((typeof node=='string'||node instanceof String)) {
			node = Imba.document().createTextNode(node);
		};
		
		if (node && rel) {
			this.dom().insertBefore((node._dom || node),(rel._dom || rel));
			Imba.TagManager.insert(node._tag || node,this);
			// FIXME ensure these are not called for text nodes
		};
		return this;
	};



	/*
			The .append method inserts the specified content as the last child
			of the target node. If the content is already a child of node it
			will be moved to the end.
			
			    var root = <div.root>
			    var item = <div.item> "This is an item"
			    root.append item # appends item to the end of root

			    root.prepend "some text" # append text
			    root.prepend [<ul>,<ul>] # append array
			*/

	Imba.Tag.prototype.append = function (item){
		// possible to append blank
		// possible to simplify on server?
		if (!item) { return this };
		
		if (item instanceof Array) {
			for (var i = 0, ary = iter$(item), len = ary.length, member; i < len; i++) {
				member = ary[i];
				member && this.append(member);
			};
		} else if ((typeof item=='string'||item instanceof String) || (typeof item=='number'||item instanceof Number)) {
			var node = Imba.document().createTextNode(item);
			this._dom.appendChild(node);
			if (this._empty) { this._empty = false };
		} else {
			// should delegate to self.appendChild
			this.appendChild(item);
			if (this._empty) { this._empty = false };
		};
		
		return this;
	};

	/*
			@deprecated
			*/

	Imba.Tag.prototype.insert = function (node,pars){
		if(!pars||pars.constructor !== Object) pars = {};
		var before = pars.before !== undefined ? pars.before : null;
		var after = pars.after !== undefined ? pars.after : null;
		if (after) { before = after.next() };
		if (node instanceof Array) {
			node = (_T.FRAGMENT(this).setContent(node,0).end());
		};
		if (before) {
			this.insertBefore(node,before.dom());
		} else {
			this.appendChild(node);
		};
		return this;
	};

	/*
			@todo Should support multiple arguments like append

			The .prepend method inserts the specified content as the first
			child of the target node. If the content is already a child of 
			node it will be moved to the start.
			
		    	node.prepend <div.top> # prepend node
		    	node.prepend "some text" # prepend text
		    	node.prepend [<ul>,<ul>] # prepend array

			*/

	Imba.Tag.prototype.prepend = function (item){
		var first = this._dom.childNodes[0];
		first ? this.insertBefore(item,first) : this.appendChild(item);
		return this;
	};



	/*
		Remove node from the dom tree
		@return {self}
		*/

	Imba.Tag.prototype.orphanize = function (){
		var par;
		if (par = this.parent()) { par.removeChild(this) };
		return this;
	};

	/*
		Get text of node. Uses textContent behind the scenes (not innerText)
		[https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent]()
		@return {string} inner text of node
		*/

	Imba.Tag.prototype.text = function (v){
		return this._dom.textContent;
	};

	/*
		Set text of node. Uses textContent behind the scenes (not innerText)
		[https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent]()
		*/

	Imba.Tag.prototype.setText = function (txt){
		this._empty = false;
		this._dom.textContent = (txt == null) ? (txt = "") : txt;
		this;
		return this;
	};


	/*
		Method for getting and setting data-attributes. When called with zero
		arguments it will return the actual dataset for the tag.

			var node = <div data-name='hello'>
			# get the whole dataset
			node.dataset # {name: 'hello'}
			# get a single value
			node.dataset('name') # 'hello'
			# set a single value
			node.dataset('name','newname') # self


		*/

	Imba.Tag.prototype.dataset = function (key,val){
		if (key instanceof Object) {
			for (var i = 0, keys = Object.keys(key), l = keys.length; i < l; i++){
				this.dataset(keys[i],key[keys[i]]);
			};
			return this;
		};
		
		if (arguments.length == 2) {
			this.setAttribute(("data-" + key),val);
			return this;
		};
		
		if (key) {
			return this.getAttribute(("data-" + key));
		};
		
		var dataset = this.dom().dataset;
		
		if (!dataset) {
			dataset = {};
			for (var i1 = 0, ary = iter$(this.dom().attributes), len = ary.length, atr; i1 < len; i1++) {
				atr = ary[i1];
				if (atr.name.substr(0,5) == 'data-') {
					dataset[Imba.toCamelCase(atr.name.slice(5))] = atr.value;
				};
			};
		};
		
		return dataset;
	};


	/*
		Remove all content inside node
		*/

	Imba.Tag.prototype.empty = function (){
		if (this._dom.firstChild) {
			while (this._dom.firstChild){
				this._dom.removeChild(this._dom.firstChild);
			};
			Imba.TagManager.remove(null,this);
		};
		
		this._children = null;
		this._empty = true;
		return this;
	};

	/*
		Empty placeholder. Override to implement custom render behaviour.
		Works much like the familiar render-method in React.
		@return {self}
		*/

	Imba.Tag.prototype.render = function (){
		return this;
	};

	/*
		Called implicitly while tag is initializing. No initial props
		will have been set at this point.
		@return {self}
		*/

	Imba.Tag.prototype.build = function (){
		return this;
	};

	/*
		Called once, implicitly through Imba.Tag#end. All initial props
		and children will have been set before setup is called.
		setContent.
		@return {self}
		*/

	Imba.Tag.prototype.setup = function (){
		return this;
	};

	/*
		Called implicitly through Imba.Tag#end, for tags that are part of
		a tag tree (that are rendered several times).
		@return {self}
		*/

	Imba.Tag.prototype.commit = function (){
		this.render();
		return this;
	};

	/*

		Called by the tag-scheduler (if this tag is scheduled)
		By default it will call this.render. Do not override unless
		you really understand it.

		*/

	Imba.Tag.prototype.tick = function (){
		this.render();
		return this;
	};

	/*
		
		A very important method that you will practically never manually.
		The tag syntax of Imba compiles to a chain of setters, which always
		ends with .end. `<a.large>` compiles to `tag('a').flag('large').end()`
		
		You are highly adviced to not override its behaviour. The first time
		end is called it will mark the tag as initialized and call Imba.Tag#setup,
		and call Imba.Tag#commit every time.
		@return {self}
		*/

	Imba.Tag.prototype.end = function (){
		return this;
	};

	/*
		This is called instead of Imba.Tag#end for `<self>` tag chains.
		Defaults to noop
		@return {self}
		*/

	Imba.Tag.prototype.synced = function (){
		return this;
	};

	// called when the node is awakened in the dom - either automatically
	// upon attachment to the dom-tree, or the first time imba needs the
	// tag for a domnode that has been rendered on the server
	Imba.Tag.prototype.awaken = function (){
		return this;
	};



	/*
		List of flags for this node. 
		*/

	Imba.Tag.prototype.flags = function (){
		return this._dom.classList;
	};

	/*
		@deprecated
		*/

	Imba.Tag.prototype.classes = function (){
		throw "Imba.Tag#classes is removed. Use Imba.Tag#flags";
	};

	/*
		Add speficied flag to current node.
		If a second argument is supplied, it will be coerced into a Boolean,
		and used to indicate whether we should remove the flag instead.
		@return {self}
		*/

	Imba.Tag.prototype.flag = function (name,toggler){
		// it is most natural to treat a second undefined argument as a no-switch
		// so we need to check the arguments-length
		if (arguments.length == 2) {
			if (this._dom.classList.contains(name) != !!toggler) {
				this._dom.classList.toggle(name);
			};
		} else {
			// firefox will trigger a change if adding existing class
			if (!this._dom.classList.contains(name)) { this._dom.classList.add(name) };
		};
		return this;
	};

	/*
		Remove specified flag from node
		@return {self}
		*/

	Imba.Tag.prototype.unflag = function (name){
		this._dom.classList.remove(name);
		return this;
	};

	/*
		Toggle specified flag on node
		@return {self}
		*/

	Imba.Tag.prototype.toggleFlag = function (name){
		this._dom.classList.toggle(name);
		return this;
	};

	/*
		Check whether current node has specified flag
		@return {bool}
		*/

	Imba.Tag.prototype.hasFlag = function (name){
		return this._dom.classList.contains(name);
	};


	/*
		Set/update a named flag. It remembers the previous
		value of the flag, and removes it before setting the new value.

			node.setFlag('type','todo')
			node.setFlag('type','project')
			# todo is removed, project is added.

		@return {self}
		*/

	Imba.Tag.prototype.setFlag = function (name,value){
		this._namedFlags || (this._namedFlags = []);
		var prev = this._namedFlags[name];
		if (prev != value) {
			if (prev) { this.unflag(prev) };
			if (value) { this.flag(value) };
			this._namedFlags[name] = value;
		};
		return this;
	};


	/*
		Get the scheduler for this node. A new scheduler will be created
		if it does not already exist.

		@return {Imba.Scheduler}
		*/

	Imba.Tag.prototype.scheduler = function (){
		return (this._scheduler == null) ? (this._scheduler = new Imba.Scheduler(this)) : this._scheduler;
	};

	/*

		Shorthand to start scheduling a node. The method will basically
		proxy the arguments through to scheduler.configure, and then
		activate the scheduler.
		
		@return {self}
		*/

	Imba.Tag.prototype.schedule = function (options){
		if(options === undefined) options = {events: true};
		this.scheduler().configure(options).activate();
		return this;
	};

	/*
		Shorthand for deactivating scheduler (if tag has one).
		@deprecated
		*/

	Imba.Tag.prototype.unschedule = function (){
		if (this._scheduler) { this.scheduler().deactivate() };
		return this;
	};


	/*
		Get the parent of current node
		@return {Imba.Tag} 
		*/

	Imba.Tag.prototype.parent = function (){
		return tag$wrap(this.dom().parentNode);
	};

	/*
		Get the child at index
		*/

	Imba.Tag.prototype.child = function (i){
		return tag$wrap(this.dom().children[i || 0]);
	};


	/*
		Get the children of node
		@return {Imba.Selector}
		*/

	Imba.Tag.prototype.children = function (sel){
		// DEPRECATE this is overridden by reconciler
		var nodes = new Imba.Selector(null,this,this._dom.children);
		return sel ? nodes.filter(sel) : nodes;
	};


	/*
			Get the siblings of node
			@return {Imba.Selector}
			*/

	Imba.Tag.prototype.siblings = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		var self = this, par;
		if (!(par = self.parent())) { return [] }; // FIXME
		var ary = self.dom().parentNode.children;
		var nodes = new Imba.Selector(null,self,ary);
		return nodes.filter(function(n) { return n != self && (!sel || n.matches(sel)); });
	};

	/*
			Get node and its ascendents
			@return {Array}
			*/

	Imba.Tag.prototype.path = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		var node = this;
		var nodes = [];
		if (sel && sel.query) { sel = sel.query() };
		
		while (node){
			if (!sel || node.matches(sel)) { nodes.push(node) };
			node = node.parent();
		};
		return nodes;
	};

	/*
			Get ascendents of node
			@return {Array}
			*/

	Imba.Tag.prototype.parents = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		var par = this.parent();
		return par ? par.path(sel) : [];
	};

	/*
			Get the immediately following sibling of node.
			*/

	Imba.Tag.prototype.next = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		if (sel) {
			var el = this;
			while (el = el.next()){
				if (el.matches(sel)) { return el };
			};
			return null;
		};
		return tag$wrap(this.dom().nextElementSibling);
	};

	/*
			Get the immediately preceeding sibling of node.
			*/

	Imba.Tag.prototype.prev = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		if (sel) {
			var el = this;
			while (el = el.prev()){
				if (el.matches(sel)) { return el };
			};
			return null;
		};
		return tag$wrap(this.dom().previousElementSibling);
	};

	/*
			Get descendants of current node, optionally matching selector
			@return {Imba.Selector}
			*/

	Imba.Tag.prototype.find = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		return new Imba.Selector(sel,this);
	};

	/*
			Get the first matching child of node

			@return {Imba.Tag}
			*/

	Imba.Tag.prototype.first = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		return sel ? this.find(sel).first() : (tag$wrap(this.dom().firstElementChild));
	};

	/*
			Get the last matching child of node

				node.last # returns the last child of node
				node.last %span # returns the last span inside node
				node.last do |el| el.text == 'Hi' # return last node with text Hi

			@return {Imba.Tag}
			*/

	Imba.Tag.prototype.last = function (sel){
		// DEPRECATE extract into imba-tag-helpers
		return sel ? this.find(sel).last() : (tag$wrap(this.dom().lastElementChild));
	};


	/*
		Check if this node matches a selector
		@return {Boolean}
		*/

	Imba.Tag.prototype.matches = function (sel){
		var fn;
		if (sel instanceof Function) {
			return sel(this);
		};
		
		if (sel.query) { sel = sel.query() };
		if (fn = (this._dom.matches || this._dom.matchesSelector || this._dom.webkitMatchesSelector || this._dom.msMatchesSelector || this._dom.mozMatchesSelector)) {
			return fn.call(this._dom,sel);
		};
	};

	/*
		Get the first element matching supplied selector / filter
		traversing upwards, but including the node itself.
		@return {Imba.Tag}
		*/

	Imba.Tag.prototype.closest = function (sel){
		// FIXME use native implementation if supported
		if (!sel) { return this.parent() }; // should return self?!
		var node = this;
		if (sel.query) { sel = sel.query() };
		
		while (node){
			if (node.matches(sel)) { return node };
			node = node.parent();
		};
		return null;
	};

	/*
		Get the closest ancestor of node that matches
		specified selector / matcher.

		@return {Imba.Tag}
		*/

	Imba.Tag.prototype.up = function (sel){
		if (!sel) { return this.parent() };
		return this.parent() && this.parent().closest(sel);
	};

	/*
		Get the index of node.
		@return {Number}
		*/

	Imba.Tag.prototype.index = function (){
		var i = 0;
		var el = this.dom();
		while (el.previousSibling){
			el = el.previousSibling;
			i++;
		};
		return i;
	};

	/*
		Check if node contains other node
		@return {Boolean} 
		*/

	Imba.Tag.prototype.contains = function (node){
		return this.dom().contains(node && node._dom || node);
	};


	/*
		Shorthand for console.log on elements
		@return {self}
		*/

	Imba.Tag.prototype.log = function (){
		var $0 = arguments, i = $0.length;
		var args = new Array(i>0 ? i : 0);
		while(i>0) args[i-1] = $0[--i];
		args.unshift(console);
		Function.prototype.call.apply(console.log,args);
		return this;
	};

	Imba.Tag.prototype.css = function (key,val){
		if (key instanceof Object) {
			for (var i = 0, keys = Object.keys(key), l = keys.length; i < l; i++){
				this.css(keys[i],key[keys[i]]);
			};
			return this;
		};
		
		var name = Imba.CSSKeyMap[key] || key;
		
		if (val == null) {
			this.dom().style.removeProperty(name);
		} else if (val == undefined && arguments.length == 1) {
			return this.dom().style[name];
		} else {
			if ((typeof val=='number'||val instanceof Number) && name.match(/width|height|left|right|top|bottom/)) {
				this.dom().style[name] = val + "px";
			} else {
				this.dom().style[name] = val;
			};
		};
		return this;
	};

	Imba.Tag.prototype.trigger = function (event,data){
		if(data === undefined) data = {};
		return Imba.Events.trigger(event,this,{data: data});
	};

	Imba.Tag.prototype.emit = function (name,pars){
		if(!pars||pars.constructor !== Object) pars = {};
		var data = pars.data !== undefined ? pars.data : null;
		var bubble = pars.bubble !== undefined ? pars.bubble : true;
		console.warn('tag#emit is deprecated -> use tag#trigger');
		Imba.Events.trigger(name,this,{data: data,bubble: bubble});
		return this;
	};

	Imba.Tag.prototype.setTransform = function (value){
		this.css('transform',value);
		this;
		return this;
	};

	Imba.Tag.prototype.transform = function (){
		return this.css('transform');
	};

	Imba.Tag.prototype.setStyle = function (style){
		this.setAttribute('style',style);
		this;
		return this;
	};

	Imba.Tag.prototype.style = function (){
		return this.getAttribute('style');
	};

	/*
		Focus on current node
		@return {self}
		*/

	Imba.Tag.prototype.focus = function (){
		this.dom().focus();
		return this;
	};

	/*
		Remove focus from current node
		@return {self}
		*/

	Imba.Tag.prototype.blur = function (){
		this.dom().blur();
		return this;
	};

	Imba.Tag.prototype.toString = function (){
		return this.dom().outerHTML;
	};


	Imba.Tag.prototype.initialize = Imba.Tag;

	Imba.HTML_TAGS = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(" ");
	Imba.HTML_TAGS_UNSAFE = "article aside header section".split(" ");
	Imba.SVG_TAGS = "circle defs ellipse g line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" ");


	function extender(obj,sup){
		for (var i = 0, keys = Object.keys(sup), l = keys.length; i < l; i++){
			(obj[($1 = keys[i])] == null) ? (obj[$1] = sup[keys[i]]) : obj[$1];
		};
		
		obj.prototype = Object.create(sup.prototype);
		obj.__super__ = obj.prototype.__super__ = sup.prototype;
		obj.prototype.constructor = obj;
		if (sup.inherit) { sup.inherit(obj) };
		return obj;
	};

	function Tag(){
		return function(dom,ctx) {
			this.initialize(dom,ctx);
			return this;
		};
	};

	function TagSpawner(type){
		return function(zone) { return type.build(zone); };
	};

	Imba.Tags = function Tags(){
		this;
	};

	Imba.Tags.prototype.__clone = function (ns){
		var clone = Object.create(this);
		clone._parent = this;
		return clone;
	};

	Imba.Tags.prototype.ns = function (name){
		return this['_' + name.toUpperCase()] || this.defineNamespace(name);
	};

	Imba.Tags.prototype.defineNamespace = function (name){
		var clone = Object.create(this);
		clone._parent = this;
		clone._ns = name;
		this['_' + name.toUpperCase()] = clone;
		return clone;
	};

	Imba.Tags.prototype.baseType = function (name){
		return (idx$(name,Imba.HTML_TAGS) >= 0) ? 'element' : 'div';
	};

	Imba.Tags.prototype.defineTag = function (name,supr,body){
		if(body==undefined && typeof supr == 'function') body = supr,supr = '';
		if(supr==undefined) supr = '';
		if (body && body._nodeType) {
			supr = body;
			body = null;
		};
		
		supr || (supr = this.baseType(name));
		
		var supertype = ((typeof supr=='string'||supr instanceof String)) ? this[supr] : supr;
		var tagtype = Tag();
		var norm = name.replace(/\-/g,'_');
		
		tagtype._name = name;
		tagtype._flagName = null;
		
		if (name[0] == '#') {
			this[name] = tagtype;
			Imba.SINGLETONS[name.slice(1)] = tagtype;
		} else if (name[0] == name[0].toUpperCase()) {
			tagtype._flagName = name;
			true;
		} else {
			tagtype._flagName = "_" + name.replace(/_/g,'-');
			this[name] = tagtype;
			this[norm.toUpperCase()] = TagSpawner(tagtype);
			// '$'+
		};
		
		
		extender(tagtype,supertype);
		
		if (body) {
			if (body.length == 2) {
				// create clone
				if (!tagtype.hasOwnProperty('TAGS')) {
					tagtype.TAGS = (supertype.TAGS || this).__clone();
				};
			};
			
			body.call(tagtype,tagtype,tagtype.TAGS || this);
			if (tagtype.defined) { tagtype.defined() };
			this.optimizeTag(tagtype);
		};
		return tagtype;
	};

	Imba.Tags.prototype.defineSingleton = function (name,supr,body){
		return this.defineTag(name,supr,body);
	};

	Imba.Tags.prototype.extendTag = function (name,supr,body){
		if(body==undefined && typeof supr == 'function') body = supr,supr = '';
		if(supr==undefined) supr = '';
		var klass = (((typeof name=='string'||name instanceof String)) ? this[name] : name);
		// allow for private tags here as well?
		if (body) { body && body.call(klass,klass,klass.prototype) };
		if (klass.extended) { klass.extended() };
		this.optimizeTag(klass);
		return klass;
	};

	Imba.Tags.prototype.optimizeTag = function (tagtype){
		var prototype_;
		(prototype_ = tagtype.prototype) && prototype_.optimizeTagStructure  &&  prototype_.optimizeTagStructure();
		return this;
	};


	Imba.SINGLETONS = {};
	Imba.TAGS = new Imba.Tags();
	Imba.TAGS.element = Imba.TAGS.htmlelement = Imba.Tag;


	var html = Imba.TAGS.defineNamespace('html');
	var svg = Imba.TAGS.defineNamespace('svg');
	Imba.TAGS = html; // make the html namespace the root

	svg.baseType = function (name){
		return 'element';
	};

	Imba.defineTag = function (name,supr,body){
		if(body==undefined && typeof supr == 'function') body = supr,supr = '';
		if(supr==undefined) supr = '';
		return Imba.TAGS.defineTag(name,supr,body);
	};

	Imba.defineSingletonTag = function (id,supr,body){
		if(body==undefined && typeof supr == 'function') body = supr,supr = 'div';
		if(supr==undefined) supr = 'div';
		return Imba.TAGS.defineTag(this.name(),supr,body);
	};

	Imba.extendTag = function (name,body){
		return Imba.TAGS.extendTag(name,body);
	};

	Imba.getTagSingleton = function (id){
		var klass;
		var dom,node;
		
		if (klass = Imba.SINGLETONS[id]) {
			if (klass && klass.Instance) { return klass.Instance };
			
			// no instance - check for element
			if (dom = Imba.document().getElementById(id)) {
				// we have a live instance - when finding it through a selector we should awake it, no?
				// console.log('creating the singleton from existing node in dom?',id,type)
				node = klass.Instance = new klass(dom);
				node.awaken(dom); // should only awaken
				return node;
			};
			
			dom = klass.createNode();
			dom.id = id;
			node = klass.Instance = new klass(dom);
			node.end().awaken(dom);
			return node;
		} else if (dom = Imba.document().getElementById(id)) {
			return Imba.getTagForDom(dom);
		};
	};

	var svgSupport = typeof SVGElement !== 'undefined';

	Imba.getTagForDom = function (dom){
		var m;
		if (!dom) { return null };
		if (dom._dom) { return dom }; // could use inheritance instead
		if (dom._tag) { return dom._tag };
		if (!dom.nodeName) { return null };
		
		var ns = null;
		var id = dom.id;
		var type = dom.nodeName.toLowerCase();
		var tags = Imba.TAGS;
		var native$ = type;
		var cls = dom.className;
		
		if (id && Imba.SINGLETONS[id]) {
			// FIXME control that it is the same singleton?
			// might collide -- not good?
			return Imba.getTagSingleton(id);
		};
		// look for id - singleton
		
		// need better test here
		if (svgSupport && (dom instanceof SVGElement)) {
			ns = "svg";
			cls = dom.className.baseVal;
			tags = tags._SVG;
		};
		
		var spawner;
		
		if (cls) {
			// there can be several matches here - should choose the last
			// should fall back to less specific later? - otherwise things may fail
			// TODO rework this
			var flags = cls.split(' ');
			var nr = flags.length;
			
			while (--nr >= 0){
				var flag = flags[nr];
				if (flag[0] == '_') {
					if (spawner = tags[flag.slice(1)]) {
						break;
					};
				};
			};
			
			// if var m = cls.match(/\b_([a-z\-]+)\b(?!\s*_[a-z\-]+)/)
			// 	type = m[1] # .replace(/-/g,'_')
			
			if (m = cls.match(/\b([A-Z\-]+)_\b/)) {
				ns = m[1];
			};
		};
		
		spawner || (spawner = tags[native$]);
		return spawner ? new spawner(dom).awaken(dom) : null;
	};

	// TODO drop these globals
	_T = Imba.TAGS;
	id$ = Imba.getTagSingleton;
	tag$wrap = Imba.getTagForDom;

	Imba.generateCSSPrefixes = function (){
		var styles = window.getComputedStyle(document.documentElement,'');
		
		for (var i = 0, ary = iter$(styles), len = ary.length, prefixed; i < len; i++) {
			prefixed = ary[i];
			var unprefixed = prefixed.replace(/^-(webkit|ms|moz|o|blink)-/,'');
			var camelCase = unprefixed.replace(/-(\w)/g,function(m,a) { return a.toUpperCase(); });
			
			// if there exists an unprefixed version -- always use this
			if (prefixed != unprefixed) {
				if (styles.hasOwnProperty(unprefixed)) { continue; };
			};
			
			// register the prefixes
			Imba.CSSKeyMap[unprefixed] = Imba.CSSKeyMap[camelCase] = prefixed;
		};
		return;
	};


	if (document) { Imba.generateCSSPrefixes() };

	// Ovverride classList
	if (document && !document.documentElement.classList) {
		_T.extendTag('element', function(tag){
			
			tag.prototype.hasFlag = function (ref){
				return new RegExp('(^|\\s)' + ref + '(\\s|$)').test(this._dom.className);
			};
			
			tag.prototype.addFlag = function (ref){
				if (this.hasFlag(ref)) { return this };
				this._dom.className += (this._dom.className ? ' ' : '') + ref;
				return this;
			};
			
			tag.prototype.unflag = function (ref){
				if (!this.hasFlag(ref)) { return this };
				var regex = new RegExp('(^|\\s)*' + ref + '(\\s|$)*','g');
				this._dom.className = this._dom.className.replace(regex,'');
				return this;
			};
			
			tag.prototype.toggleFlag = function (ref){
				return this.hasFlag(ref) ? this.unflag(ref) : this.flag(ref);
			};
			
			tag.prototype.flag = function (ref,bool){
				if (arguments.length == 2 && !!bool === false) {
					return this.unflag(ref);
				};
				return this.addFlag(ref);
			};
		});
	};


	Imba.Tag;


/***/ },
/* 7 */
/***/ function(module, exports) {

	// imba$nolib=1

	// predefine all supported html tags
	_T.defineTag('fragment', 'element', function(tag){
		
		tag.createNode = function (){
			return Imba.document().createDocumentFragment();
		};
	});

	_T.defineTag('a', function(tag){
		tag.prototype.href = function(v){ return this.getAttribute('href'); }
		tag.prototype.setHref = function(v){ this.setAttribute('href',v); return this; };
		tag.prototype.target = function(v){ return this.getAttribute('target'); }
		tag.prototype.setTarget = function(v){ this.setAttribute('target',v); return this; };
		tag.prototype.hreflang = function(v){ return this.getAttribute('hreflang'); }
		tag.prototype.setHreflang = function(v){ this.setAttribute('hreflang',v); return this; };
		tag.prototype.media = function(v){ return this.getAttribute('media'); }
		tag.prototype.setMedia = function(v){ this.setAttribute('media',v); return this; };
		tag.prototype.download = function(v){ return this.getAttribute('download'); }
		tag.prototype.setDownload = function(v){ this.setAttribute('download',v); return this; };
		tag.prototype.rel = function(v){ return this.getAttribute('rel'); }
		tag.prototype.setRel = function(v){ this.setAttribute('rel',v); return this; };
		tag.prototype.type = function(v){ return this.getAttribute('type'); }
		tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
	});

	_T.defineTag('abbr');
	_T.defineTag('address');
	_T.defineTag('area');
	_T.defineTag('article');
	_T.defineTag('aside');
	_T.defineTag('audio');
	_T.defineTag('b');
	_T.defineTag('base');
	_T.defineTag('bdi');
	_T.defineTag('bdo');
	_T.defineTag('big');
	_T.defineTag('blockquote');
	_T.defineTag('body');
	_T.defineTag('br');

	_T.defineTag('button', function(tag){
		tag.prototype.autofocus = function(v){ return this.getAttribute('autofocus'); }
		tag.prototype.setAutofocus = function(v){ this.setAttribute('autofocus',v); return this; };
		tag.prototype.type = function(v){ return this.getAttribute('type'); }
		tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
		
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
	});

	_T.defineTag('canvas', function(tag){
		tag.prototype.__width = {dom: true,name: 'width'};
		tag.prototype.width = function(v){ return this.dom().width; }
		tag.prototype.setWidth = function(v){ if (v != this.dom().width) { this.dom().width = v }; return this; };
		tag.prototype.__height = {dom: true,name: 'height'};
		tag.prototype.height = function(v){ return this.dom().height; }
		tag.prototype.setHeight = function(v){ if (v != this.dom().height) { this.dom().height = v }; return this; };
		
		tag.prototype.context = function (type){
			if(type === undefined) type = '2d';
			return this.dom().getContext(type);
		};
	});

	_T.defineTag('caption');
	_T.defineTag('cite');
	_T.defineTag('code');
	_T.defineTag('col');
	_T.defineTag('colgroup');
	_T.defineTag('data');
	_T.defineTag('datalist');
	_T.defineTag('dd');
	_T.defineTag('del');
	_T.defineTag('details');
	_T.defineTag('dfn');
	_T.defineTag('div');
	_T.defineTag('dl');
	_T.defineTag('dt');
	_T.defineTag('em');
	_T.defineTag('embed');

	_T.defineTag('fieldset', function(tag){
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
	});

	_T.defineTag('figcaption');
	_T.defineTag('figure');
	_T.defineTag('footer');

	_T.defineTag('form', function(tag){
		tag.prototype.method = function(v){ return this.getAttribute('method'); }
		tag.prototype.setMethod = function(v){ this.setAttribute('method',v); return this; };
		tag.prototype.action = function(v){ return this.getAttribute('action'); }
		tag.prototype.setAction = function(v){ this.setAttribute('action',v); return this; };
		tag.prototype.enctype = function(v){ return this.getAttribute('enctype'); }
		tag.prototype.setEnctype = function(v){ this.setAttribute('enctype',v); return this; };
		tag.prototype.autocomplete = function(v){ return this.getAttribute('autocomplete'); }
		tag.prototype.setAutocomplete = function(v){ this.setAttribute('autocomplete',v); return this; };
		tag.prototype.target = function(v){ return this.getAttribute('target'); }
		tag.prototype.setTarget = function(v){ this.setAttribute('target',v); return this; };
		
		tag.prototype.__novalidate = {dom: true,name: 'novalidate'};
		tag.prototype.novalidate = function(v){ return this.dom().novalidate; }
		tag.prototype.setNovalidate = function(v){ if (v != this.dom().novalidate) { this.dom().novalidate = v }; return this; };
	});

	_T.defineTag('h1');
	_T.defineTag('h2');
	_T.defineTag('h3');
	_T.defineTag('h4');
	_T.defineTag('h5');
	_T.defineTag('h6');
	_T.defineTag('head');
	_T.defineTag('header');
	_T.defineTag('hr');
	_T.defineTag('html');
	_T.defineTag('i');

	_T.defineTag('iframe', function(tag){
		tag.prototype.referrerpolicy = function(v){ return this.getAttribute('referrerpolicy'); }
		tag.prototype.setReferrerpolicy = function(v){ this.setAttribute('referrerpolicy',v); return this; };
		tag.prototype.src = function(v){ return this.getAttribute('src'); }
		tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
		tag.prototype.srcdoc = function(v){ return this.getAttribute('srcdoc'); }
		tag.prototype.setSrcdoc = function(v){ this.setAttribute('srcdoc',v); return this; };
		tag.prototype.sandbox = function(v){ return this.getAttribute('sandbox'); }
		tag.prototype.setSandbox = function(v){ this.setAttribute('sandbox',v); return this; };
	});

	_T.defineTag('img', function(tag){
		tag.prototype.src = function(v){ return this.getAttribute('src'); }
		tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
		tag.prototype.srcset = function(v){ return this.getAttribute('srcset'); }
		tag.prototype.setSrcset = function(v){ this.setAttribute('srcset',v); return this; };
	});

	_T.defineTag('input', function(tag){
		tag.prototype.accept = function(v){ return this.getAttribute('accept'); }
		tag.prototype.setAccept = function(v){ this.setAttribute('accept',v); return this; };
		tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
		tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
		tag.prototype.form = function(v){ return this.getAttribute('form'); }
		tag.prototype.setForm = function(v){ this.setAttribute('form',v); return this; };
		tag.prototype.list = function(v){ return this.getAttribute('list'); }
		tag.prototype.setList = function(v){ this.setAttribute('list',v); return this; };
		tag.prototype.max = function(v){ return this.getAttribute('max'); }
		tag.prototype.setMax = function(v){ this.setAttribute('max',v); return this; };
		tag.prototype.maxlength = function(v){ return this.getAttribute('maxlength'); }
		tag.prototype.setMaxlength = function(v){ this.setAttribute('maxlength',v); return this; };
		tag.prototype.min = function(v){ return this.getAttribute('min'); }
		tag.prototype.setMin = function(v){ this.setAttribute('min',v); return this; };
		tag.prototype.pattern = function(v){ return this.getAttribute('pattern'); }
		tag.prototype.setPattern = function(v){ this.setAttribute('pattern',v); return this; };
		tag.prototype.required = function(v){ return this.getAttribute('required'); }
		tag.prototype.setRequired = function(v){ this.setAttribute('required',v); return this; };
		tag.prototype.size = function(v){ return this.getAttribute('size'); }
		tag.prototype.setSize = function(v){ this.setAttribute('size',v); return this; };
		tag.prototype.step = function(v){ return this.getAttribute('step'); }
		tag.prototype.setStep = function(v){ this.setAttribute('step',v); return this; };
		tag.prototype.type = function(v){ return this.getAttribute('type'); }
		tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
		
		tag.prototype.__autofocus = {dom: true,name: 'autofocus'};
		tag.prototype.autofocus = function(v){ return this.dom().autofocus; }
		tag.prototype.setAutofocus = function(v){ if (v != this.dom().autofocus) { this.dom().autofocus = v }; return this; };
		tag.prototype.__autocomplete = {dom: true,name: 'autocomplete'};
		tag.prototype.autocomplete = function(v){ return this.dom().autocomplete; }
		tag.prototype.setAutocomplete = function(v){ if (v != this.dom().autocomplete) { this.dom().autocomplete = v }; return this; };
		tag.prototype.__autocorrect = {dom: true,name: 'autocorrect'};
		tag.prototype.autocorrect = function(v){ return this.dom().autocorrect; }
		tag.prototype.setAutocorrect = function(v){ if (v != this.dom().autocorrect) { this.dom().autocorrect = v }; return this; };
		tag.prototype.__value = {dom: true,name: 'value'};
		tag.prototype.value = function(v){ return this.dom().value; }
		tag.prototype.setValue = function(v){ if (v != this.dom().value) { this.dom().value = v }; return this; };
		tag.prototype.__placeholder = {dom: true,name: 'placeholder'};
		tag.prototype.placeholder = function(v){ return this.dom().placeholder; }
		tag.prototype.setPlaceholder = function(v){ if (v != this.dom().placeholder) { this.dom().placeholder = v }; return this; };
		tag.prototype.__required = {dom: true,name: 'required'};
		tag.prototype.required = function(v){ return this.dom().required; }
		tag.prototype.setRequired = function(v){ if (v != this.dom().required) { this.dom().required = v }; return this; };
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
		tag.prototype.__multiple = {dom: true,name: 'multiple'};
		tag.prototype.multiple = function(v){ return this.dom().multiple; }
		tag.prototype.setMultiple = function(v){ if (v != this.dom().multiple) { this.dom().multiple = v }; return this; };
		tag.prototype.__checked = {dom: true,name: 'checked'};
		tag.prototype.checked = function(v){ return this.dom().checked; }
		tag.prototype.setChecked = function(v){ if (v != this.dom().checked) { this.dom().checked = v }; return this; };
		tag.prototype.__readOnly = {dom: true,name: 'readOnly'};
		tag.prototype.readOnly = function(v){ return this.dom().readOnly; }
		tag.prototype.setReadOnly = function(v){ if (v != this.dom().readOnly) { this.dom().readOnly = v }; return this; };
	});

	_T.defineTag('ins');
	_T.defineTag('kbd');
	_T.defineTag('keygen');
	_T.defineTag('label', function(tag){
		tag.prototype.accesskey = function(v){ return this.getAttribute('accesskey'); }
		tag.prototype.setAccesskey = function(v){ this.setAttribute('accesskey',v); return this; };
		tag.prototype['for'] = function(v){ return this.getAttribute('for'); }
		tag.prototype.setFor = function(v){ this.setAttribute('for',v); return this; };
		tag.prototype.form = function(v){ return this.getAttribute('form'); }
		tag.prototype.setForm = function(v){ this.setAttribute('form',v); return this; };
	});


	_T.defineTag('legend');
	_T.defineTag('li');

	_T.defineTag('link', function(tag){
		tag.prototype.rel = function(v){ return this.getAttribute('rel'); }
		tag.prototype.setRel = function(v){ this.setAttribute('rel',v); return this; };
		tag.prototype.type = function(v){ return this.getAttribute('type'); }
		tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
		tag.prototype.href = function(v){ return this.getAttribute('href'); }
		tag.prototype.setHref = function(v){ this.setAttribute('href',v); return this; };
		tag.prototype.media = function(v){ return this.getAttribute('media'); }
		tag.prototype.setMedia = function(v){ this.setAttribute('media',v); return this; };
	});

	_T.defineTag('main');
	_T.defineTag('map');
	_T.defineTag('mark');
	_T.defineTag('menu');
	_T.defineTag('menuitem');

	_T.defineTag('meta', function(tag){
		tag.prototype.content = function(v){ return this.getAttribute('content'); }
		tag.prototype.setContent = function(v){ this.setAttribute('content',v); return this; };
		tag.prototype.charset = function(v){ return this.getAttribute('charset'); }
		tag.prototype.setCharset = function(v){ this.setAttribute('charset',v); return this; };
	});

	_T.defineTag('meter');
	_T.defineTag('nav');
	_T.defineTag('noscript');

	_T.defineTag('ol');

	_T.defineTag('optgroup', function(tag){
		tag.prototype.label = function(v){ return this.getAttribute('label'); }
		tag.prototype.setLabel = function(v){ this.setAttribute('label',v); return this; };
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
	});

	_T.defineTag('option', function(tag){
		tag.prototype.label = function(v){ return this.getAttribute('label'); }
		tag.prototype.setLabel = function(v){ this.setAttribute('label',v); return this; };
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
		tag.prototype.__selected = {dom: true,name: 'selected'};
		tag.prototype.selected = function(v){ return this.dom().selected; }
		tag.prototype.setSelected = function(v){ if (v != this.dom().selected) { this.dom().selected = v }; return this; };
		tag.prototype.__value = {dom: true,name: 'value'};
		tag.prototype.value = function(v){ return this.dom().value; }
		tag.prototype.setValue = function(v){ if (v != this.dom().value) { this.dom().value = v }; return this; };
	});

	_T.defineTag('output', function(tag){
		tag.prototype['for'] = function(v){ return this.getAttribute('for'); }
		tag.prototype.setFor = function(v){ this.setAttribute('for',v); return this; };
		tag.prototype.form = function(v){ return this.getAttribute('form'); }
		tag.prototype.setForm = function(v){ this.setAttribute('form',v); return this; };
	});

	_T.defineTag('p');

	_T.defineTag('object', function(tag){
		Imba.attr(tag,'type');
		Imba.attr(tag,'data');
		Imba.attr(tag,'width');
		Imba.attr(tag,'height');
	});

	_T.defineTag('param', function(tag){
		tag.prototype.name = function(v){ return this.getAttribute('name'); }
		tag.prototype.setName = function(v){ this.setAttribute('name',v); return this; };
		tag.prototype.value = function(v){ return this.getAttribute('value'); }
		tag.prototype.setValue = function(v){ this.setAttribute('value',v); return this; };
	});

	_T.defineTag('pre');
	_T.defineTag('progress', function(tag){
		tag.prototype.max = function(v){ return this.getAttribute('max'); }
		tag.prototype.setMax = function(v){ this.setAttribute('max',v); return this; };
		tag.prototype.__value = {dom: true,name: 'value'};
		tag.prototype.value = function(v){ return this.dom().value; }
		tag.prototype.setValue = function(v){ if (v != this.dom().value) { this.dom().value = v }; return this; };
	});

	_T.defineTag('q');
	_T.defineTag('rp');
	_T.defineTag('rt');
	_T.defineTag('ruby');
	_T.defineTag('s');
	_T.defineTag('samp');

	_T.defineTag('script', function(tag){
		tag.prototype.src = function(v){ return this.getAttribute('src'); }
		tag.prototype.setSrc = function(v){ this.setAttribute('src',v); return this; };
		tag.prototype.type = function(v){ return this.getAttribute('type'); }
		tag.prototype.setType = function(v){ this.setAttribute('type',v); return this; };
		tag.prototype.async = function(v){ return this.getAttribute('async'); }
		tag.prototype.setAsync = function(v){ this.setAttribute('async',v); return this; };
		tag.prototype.defer = function(v){ return this.getAttribute('defer'); }
		tag.prototype.setDefer = function(v){ this.setAttribute('defer',v); return this; };
	});

	_T.defineTag('section');

	_T.defineTag('select', function(tag){
		tag.prototype.size = function(v){ return this.getAttribute('size'); }
		tag.prototype.setSize = function(v){ this.setAttribute('size',v); return this; };
		tag.prototype.form = function(v){ return this.getAttribute('form'); }
		tag.prototype.setForm = function(v){ this.setAttribute('form',v); return this; };
		tag.prototype.multiple = function(v){ return this.getAttribute('multiple'); }
		tag.prototype.setMultiple = function(v){ this.setAttribute('multiple',v); return this; };
		tag.prototype.__autofocus = {dom: true,name: 'autofocus'};
		tag.prototype.autofocus = function(v){ return this.dom().autofocus; }
		tag.prototype.setAutofocus = function(v){ if (v != this.dom().autofocus) { this.dom().autofocus = v }; return this; };
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
		tag.prototype.__required = {dom: true,name: 'required'};
		tag.prototype.required = function(v){ return this.dom().required; }
		tag.prototype.setRequired = function(v){ if (v != this.dom().required) { this.dom().required = v }; return this; };
		
		tag.prototype.setValue = function (value){
			value = String(value);
			
			if (this.dom().value != value) {
				this.dom().value = value;
				
				if (this.dom().value != value) {
					this._delayedValue = value;
				};
			};
			
			this;
			return this;
		};
		
		tag.prototype.value = function (){
			return this.dom().value;
		};
		
		tag.prototype.syncValue = function (){
			if (this._delayedValue != undefined) {
				this.dom().value = this._delayedValue;
				this._delayedValue = undefined;
			};
			return this;
		};
		
		tag.prototype.setChildren = function (){
			tag.__super__.setChildren.apply(this,arguments);
			return this.syncValue();
		};
	});

	_T.defineTag('small');
	_T.defineTag('source');
	_T.defineTag('span');
	_T.defineTag('strong');
	_T.defineTag('style');
	_T.defineTag('sub');
	_T.defineTag('summary');
	_T.defineTag('sup');
	_T.defineTag('table');
	_T.defineTag('tbody');
	_T.defineTag('td');

	_T.defineTag('textarea', function(tag){
		tag.prototype.rows = function(v){ return this.getAttribute('rows'); }
		tag.prototype.setRows = function(v){ this.setAttribute('rows',v); return this; };
		tag.prototype.cols = function(v){ return this.getAttribute('cols'); }
		tag.prototype.setCols = function(v){ this.setAttribute('cols',v); return this; };
		
		tag.prototype.__autofocus = {dom: true,name: 'autofocus'};
		tag.prototype.autofocus = function(v){ return this.dom().autofocus; }
		tag.prototype.setAutofocus = function(v){ if (v != this.dom().autofocus) { this.dom().autofocus = v }; return this; };
		tag.prototype.__autocomplete = {dom: true,name: 'autocomplete'};
		tag.prototype.autocomplete = function(v){ return this.dom().autocomplete; }
		tag.prototype.setAutocomplete = function(v){ if (v != this.dom().autocomplete) { this.dom().autocomplete = v }; return this; };
		tag.prototype.__autocorrect = {dom: true,name: 'autocorrect'};
		tag.prototype.autocorrect = function(v){ return this.dom().autocorrect; }
		tag.prototype.setAutocorrect = function(v){ if (v != this.dom().autocorrect) { this.dom().autocorrect = v }; return this; };
		tag.prototype.__value = {dom: true,name: 'value'};
		tag.prototype.value = function(v){ return this.dom().value; }
		tag.prototype.setValue = function(v){ if (v != this.dom().value) { this.dom().value = v }; return this; };
		tag.prototype.__disabled = {dom: true,name: 'disabled'};
		tag.prototype.disabled = function(v){ return this.dom().disabled; }
		tag.prototype.setDisabled = function(v){ if (v != this.dom().disabled) { this.dom().disabled = v }; return this; };
		tag.prototype.__required = {dom: true,name: 'required'};
		tag.prototype.required = function(v){ return this.dom().required; }
		tag.prototype.setRequired = function(v){ if (v != this.dom().required) { this.dom().required = v }; return this; };
		tag.prototype.__readOnly = {dom: true,name: 'readOnly'};
		tag.prototype.readOnly = function(v){ return this.dom().readOnly; }
		tag.prototype.setReadOnly = function(v){ if (v != this.dom().readOnly) { this.dom().readOnly = v }; return this; };
		tag.prototype.__placeholder = {dom: true,name: 'placeholder'};
		tag.prototype.placeholder = function(v){ return this.dom().placeholder; }
		tag.prototype.setPlaceholder = function(v){ if (v != this.dom().placeholder) { this.dom().placeholder = v }; return this; };
	});

	_T.defineTag('tfoot');
	_T.defineTag('th');
	_T.defineTag('thead');
	_T.defineTag('time');
	_T.defineTag('title');
	_T.defineTag('tr');
	_T.defineTag('track');
	_T.defineTag('u');
	_T.defineTag('ul');
	_T.defineTag('video');
	_T.defineTag('wbr');

	true;


/***/ },
/* 8 */
/***/ function(module, exports) {

	function idx$(a,b){
		return (b && b.indexOf) ? b.indexOf(a) : [].indexOf.call(a,b);
	};
	// imba$nolib=1

	_T.ns('svg').defineTag('element', function(tag){
		
		tag.namespaceURI = function (){
			return "http://www.w3.org/2000/svg";
		};
		
		tag.buildNode = function (){
			var dom = Imba.document().createElementNS(this.namespaceURI(),this._nodeType);
			var cls = this._classes.join(" ");
			if (cls) { dom.className.baseVal = cls };
			return dom;
		};
		
		tag.inherit = function (child){
			child._protoDom = null;
			
			if (idx$(child._name,Imba.SVG_TAGS) >= 0) {
				child._nodeType = child._name;
				return child._classes = [];
			} else {
				child._nodeType = this._nodeType;
				var className = "_" + child._name.replace(/_/g,'-');
				return child._classes = this._classes.concat(className);
			};
		};
		
		
		Imba.attr(tag,'x');
		Imba.attr(tag,'y');
		
		Imba.attr(tag,'width');
		Imba.attr(tag,'height');
		
		Imba.attr(tag,'stroke');
		Imba.attr(tag,'stroke-width');
	});

	_T.ns('svg').defineTag('svg', function(tag){
		Imba.attr(tag,'viewbox');
	});

	_T.ns('svg').defineTag('g');

	_T.ns('svg').defineTag('defs');

	_T.ns('svg').defineTag('symbol', function(tag){
		Imba.attr(tag,'preserveAspectRatio');
		Imba.attr(tag,'viewBox');
	});

	_T.ns('svg').defineTag('marker', function(tag){
		Imba.attr(tag,'markerUnits');
		Imba.attr(tag,'refX');
		Imba.attr(tag,'refY');
		Imba.attr(tag,'markerWidth');
		Imba.attr(tag,'markerHeight');
		Imba.attr(tag,'orient');
	});

	// Basic shapes

	_T.ns('svg').defineTag('rect', function(tag){
		Imba.attr(tag,'rx');
		Imba.attr(tag,'ry');
	});

	_T.ns('svg').defineTag('circle', function(tag){
		Imba.attr(tag,'cx');
		Imba.attr(tag,'cy');
		Imba.attr(tag,'r');
	});

	_T.ns('svg').defineTag('ellipse', function(tag){
		Imba.attr(tag,'cx');
		Imba.attr(tag,'cy');
		Imba.attr(tag,'rx');
		Imba.attr(tag,'ry');
	});

	_T.ns('svg').defineTag('path', function(tag){
		Imba.attr(tag,'d');
		Imba.attr(tag,'pathLength');
	});

	_T.ns('svg').defineTag('line', function(tag){
		Imba.attr(tag,'x1');
		Imba.attr(tag,'x2');
		Imba.attr(tag,'y1');
		Imba.attr(tag,'y2');
	});

	_T.ns('svg').defineTag('polyline', function(tag){
		Imba.attr(tag,'points');
	});

	_T.ns('svg').defineTag('polygon', function(tag){
		Imba.attr(tag,'points');
	});

	_T.ns('svg').defineTag('text', function(tag){
		Imba.attr(tag,'dx');
		Imba.attr(tag,'dy');
		Imba.attr(tag,'text-anchor');
		Imba.attr(tag,'rotate');
		Imba.attr(tag,'textLength');
		Imba.attr(tag,'lengthAdjust');
	});

	_T.ns('svg').defineTag('tspan', function(tag){
		Imba.attr(tag,'dx');
		Imba.attr(tag,'dy');
		Imba.attr(tag,'rotate');
		Imba.attr(tag,'textLength');
		Imba.attr(tag,'lengthAdjust');
	});


/***/ },
/* 9 */
/***/ function(module, exports) {

	// imba$nolib=1

	Imba.Pointer = function Pointer(){
		this.setButton(-1);
		this.setEvent({x: 0,y: 0,type: 'uninitialized'});
		return this;
	};

	Imba.Pointer.prototype.phase = function(v){ return this._phase; }
	Imba.Pointer.prototype.setPhase = function(v){ this._phase = v; return this; };
	Imba.Pointer.prototype.prevEvent = function(v){ return this._prevEvent; }
	Imba.Pointer.prototype.setPrevEvent = function(v){ this._prevEvent = v; return this; };
	Imba.Pointer.prototype.button = function(v){ return this._button; }
	Imba.Pointer.prototype.setButton = function(v){ this._button = v; return this; };
	Imba.Pointer.prototype.event = function(v){ return this._event; }
	Imba.Pointer.prototype.setEvent = function(v){ this._event = v; return this; };
	Imba.Pointer.prototype.dirty = function(v){ return this._dirty; }
	Imba.Pointer.prototype.setDirty = function(v){ this._dirty = v; return this; };
	Imba.Pointer.prototype.events = function(v){ return this._events; }
	Imba.Pointer.prototype.setEvents = function(v){ this._events = v; return this; };
	Imba.Pointer.prototype.touch = function(v){ return this._touch; }
	Imba.Pointer.prototype.setTouch = function(v){ this._touch = v; return this; };

	Imba.Pointer.prototype.update = function (e){
		this.setEvent(e);
		this.setDirty(true);
		return this;
	};

	// this is just for regular mouse now
	Imba.Pointer.prototype.process = function (){
		var e1 = this.event();
		
		if (this.dirty()) {
			this.setPrevEvent(e1);
			this.setDirty(false);
			
			// button should only change on mousedown etc
			if (e1.type == 'mousedown') {
				this.setButton(e1.button);
				
				// do not create touch for right click
				if (this.button() == 2 || (this.touch() && this.button() != 0)) {
					return;
				};
				
				// cancel the previous touch
				if (this.touch()) { this.touch().cancel() };
				this.setTouch(new Imba.Touch(e1,this));
				this.touch().mousedown(e1,e1);
			} else if (e1.type == 'mousemove') {
				if (this.touch()) { this.touch().mousemove(e1,e1) };
			} else if (e1.type == 'mouseup') {
				this.setButton(-1);
				
				if (this.touch() && this.touch().button() == e1.button) {
					this.touch().mouseup(e1,e1);
					this.setTouch(null);
				};
				// trigger pointerup
			};
		} else {
			if (this.touch()) { this.touch().idle() };
		};
		return this;
	};

	Imba.Pointer.prototype.x = function (){
		return this.event().x;
	};

	Imba.Pointer.prototype.y = function (){
		return this.event().y;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	// Imba.Touch
	// Began	A finger touched the screen.
	// Moved	A finger moved on the screen.
	// Stationary	A finger is touching the screen but hasn't moved.
	// Ended	A finger was lifted from the screen. This is the final phase of a touch.
	// Canceled The system cancelled tracking for the touch.

	/*
	Consolidates mouse and touch events. Touch objects persist across a touch,
	from touchstart until end/cancel. When a touch starts, it will traverse
	down from the innermost target, until it finds a node that responds to
	ontouchstart. Unless the touch is explicitly redirected, the touch will
	call ontouchmove and ontouchend / ontouchcancel on the responder when appropriate.

		tag draggable
			# called when a touch starts
			def ontouchstart touch
				flag 'dragging'
				self
			
			# called when touch moves - same touch object
			def ontouchmove touch
				# move the node with touch
				css top: touch.dy, left: touch.dx
			
			# called when touch ends
			def ontouchend touch
				unflag 'dragging'

	@iname touch
	*/

	Imba.Touch = function Touch(event,pointer){
		// @native  = false
		this.setEvent(event);
		this.setData({});
		this.setActive(true);
		this._button = event && event.button || 0;
		this._suppress = false; // deprecated
		this._captured = false;
		this.setBubble(false);
		pointer = pointer;
		this.setUpdates(0);
		return this;
	};

	Imba.Touch.LastTimestamp = 0;
	Imba.Touch.TapTimeout = 50;

	// var lastNativeTouchTimeout = 50

	var touches = [];
	var count = 0;
	var identifiers = {};

	Imba.Touch.count = function (){
		return count;
	};

	Imba.Touch.lookup = function (item){
		return item && (item.__touch__ || identifiers[item.identifier]);
	};

	Imba.Touch.release = function (item,touch){
		var v_, $1;
		(((v_ = identifiers[item.identifier]),delete identifiers[item.identifier], v_));
		((($1 = item.__touch__),delete item.__touch__, $1));
		return;
	};

	Imba.Touch.ontouchstart = function (e){
		for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
			t = ary[i];
			if (this.lookup(t)) { continue; };
			var touch = identifiers[t.identifier] = new this(e); // (e)
			t.__touch__ = touch;
			touches.push(touch);
			count++;
			touch.touchstart(e,t);
		};
		return this;
	};

	Imba.Touch.ontouchmove = function (e){
		var touch;
		for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
			t = ary[i];
			if (touch = this.lookup(t)) {
				touch.touchmove(e,t);
			};
		};
		
		return this;
	};

	Imba.Touch.ontouchend = function (e){
		var touch;
		for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
			t = ary[i];
			if (touch = this.lookup(t)) {
				touch.touchend(e,t);
				this.release(t,touch);
				count--;
			};
		};
		
		// e.preventDefault
		// not always supported!
		// touches = touches.filter(||)
		return this;
	};

	Imba.Touch.ontouchcancel = function (e){
		var touch;
		for (var i = 0, ary = iter$(e.changedTouches), len = ary.length, t; i < len; i++) {
			t = ary[i];
			if (touch = this.lookup(t)) {
				touch.touchcancel(e,t);
				this.release(t,touch);
				count--;
			};
		};
		return this;
	};

	Imba.Touch.onmousedown = function (e){
		return this;
	};

	Imba.Touch.onmousemove = function (e){
		return this;
	};

	Imba.Touch.onmouseup = function (e){
		return this;
	};


	Imba.Touch.prototype.phase = function(v){ return this._phase; }
	Imba.Touch.prototype.setPhase = function(v){ this._phase = v; return this; };
	Imba.Touch.prototype.active = function(v){ return this._active; }
	Imba.Touch.prototype.setActive = function(v){ this._active = v; return this; };
	Imba.Touch.prototype.event = function(v){ return this._event; }
	Imba.Touch.prototype.setEvent = function(v){ this._event = v; return this; };
	Imba.Touch.prototype.pointer = function(v){ return this._pointer; }
	Imba.Touch.prototype.setPointer = function(v){ this._pointer = v; return this; };
	Imba.Touch.prototype.target = function(v){ return this._target; }
	Imba.Touch.prototype.setTarget = function(v){ this._target = v; return this; };
	Imba.Touch.prototype.handler = function(v){ return this._handler; }
	Imba.Touch.prototype.setHandler = function(v){ this._handler = v; return this; };
	Imba.Touch.prototype.updates = function(v){ return this._updates; }
	Imba.Touch.prototype.setUpdates = function(v){ this._updates = v; return this; };
	Imba.Touch.prototype.suppress = function(v){ return this._suppress; }
	Imba.Touch.prototype.setSuppress = function(v){ this._suppress = v; return this; };
	Imba.Touch.prototype.data = function(v){ return this._data; }
	Imba.Touch.prototype.setData = function(v){ this._data = v; return this; };
	Imba.Touch.prototype.__bubble = {chainable: true,name: 'bubble'};
	Imba.Touch.prototype.bubble = function(v){ return v !== undefined ? (this.setBubble(v),this) : this._bubble; }
	Imba.Touch.prototype.setBubble = function(v){ this._bubble = v; return this; };
	Imba.Touch.prototype.timestamp = function(v){ return this._timestamp; }
	Imba.Touch.prototype.setTimestamp = function(v){ this._timestamp = v; return this; };

	Imba.Touch.prototype.gestures = function(v){ return this._gestures; }
	Imba.Touch.prototype.setGestures = function(v){ this._gestures = v; return this; };

	/*
		@internal
		@constructor
		*/

	Imba.Touch.prototype.capture = function (){
		this._captured = true;
		this._event && this._event.stopPropagation();
		if (!this._selblocker) {
			this._selblocker = function(e) { return e.preventDefault(); };
			Imba.document().addEventListener('selectstart',this._selblocker,true);
		};
		return this;
	};

	Imba.Touch.prototype.isCaptured = function (){
		return !!this._captured;
	};

	/*
		Extend the touch with a plugin / gesture. 
		All events (touchstart,move etc) for the touch
		will be triggered on the plugins in the order they
		are added.
		*/

	Imba.Touch.prototype.extend = function (plugin){
		// console.log "added gesture!!!"
		this._gestures || (this._gestures = []);
		this._gestures.push(plugin);
		return this;
	};

	/*
		Redirect touch to specified target. ontouchstart will always be
		called on the new target.
		@return {Number}
		*/

	Imba.Touch.prototype.redirect = function (target){
		this._redirect = target;
		return this;
	};

	/*
		Suppress the default behaviour. Will call preventDefault for
		all native events that are part of the touch.
		*/

	Imba.Touch.prototype.suppress = function (){
		// collision with the suppress property
		this._active = false;
		
		return this;
	};

	Imba.Touch.prototype.setSuppress = function (value){
		console.warn('Imba.Touch#suppress= is deprecated');
		this._supress = value;
		this;
		return this;
	};

	Imba.Touch.prototype.touchstart = function (e,t){
		this._event = e;
		this._touch = t;
		this._button = 0;
		this._x = t.clientX;
		this._y = t.clientY;
		this.began();
		this.update();
		if (e && this.isCaptured()) { e.preventDefault() };
		return this;
	};

	Imba.Touch.prototype.touchmove = function (e,t){
		this._event = e;
		this._x = t.clientX;
		this._y = t.clientY;
		this.update();
		if (e && this.isCaptured()) { e.preventDefault() };
		return this;
	};

	Imba.Touch.prototype.touchend = function (e,t){
		this._event = e;
		this._x = t.clientX;
		this._y = t.clientY;
		this.ended();
		
		Imba.Touch.LastTimestamp = e.timeStamp;
		
		if (this._maxdr < 20) {
			var tap = new Imba.Event(e);
			tap.setType('tap');
			tap.process();
			if (tap._responder) { e.preventDefault() };
		};
		
		if (e && this.isCaptured()) {
			e.preventDefault();
		};
		
		return this;
	};

	Imba.Touch.prototype.touchcancel = function (e,t){
		return this.cancel();
	};

	Imba.Touch.prototype.mousedown = function (e,t){
		var self = this;
		self._event = e;
		self._button = e.button;
		self._x = t.clientX;
		self._y = t.clientY;
		self.began();
		self.update();
		self._mousemove = function(e) { return self.mousemove(e,e); };
		Imba.document().addEventListener('mousemove',self._mousemove,true);
		return self;
	};

	Imba.Touch.prototype.mousemove = function (e,t){
		this._x = t.clientX;
		this._y = t.clientY;
		this._event = e;
		if (this.isCaptured()) { e.preventDefault() };
		this.update();
		this.move();
		return this;
	};

	Imba.Touch.prototype.mouseup = function (e,t){
		this._x = t.clientX;
		this._y = t.clientY;
		this.ended();
		return this;
	};

	Imba.Touch.prototype.idle = function (){
		return this.update();
	};

	Imba.Touch.prototype.began = function (){
		this._timestamp = Date.now();
		this._maxdr = this._dr = 0;
		this._x0 = this._x;
		this._y0 = this._y;
		
		var dom = this.event().target;
		var node = null;
		
		this._sourceTarget = dom && tag$wrap(dom);
		
		while (dom){
			node = tag$wrap(dom);
			if (node && node.ontouchstart) {
				this._bubble = false;
				this.setTarget(node);
				this.target().ontouchstart(this);
				if (!this._bubble) { break; };
			};
			dom = dom.parentNode;
		};
		
		this._updates++;
		return this;
	};

	Imba.Touch.prototype.update = function (){
		var target_;
		if (!this._active || this._cancelled) { return this };
		
		var dr = Math.sqrt(this.dx() * this.dx() + this.dy() * this.dy());
		if (dr > this._dr) { this._maxdr = dr };
		this._dr = dr;
		
		// catching a touch-redirect?!?
		if (this._redirect) {
			if (this._target && this._target.ontouchcancel) {
				this._target.ontouchcancel(this);
			};
			this.setTarget(this._redirect);
			this._redirect = null;
			if (this.target().ontouchstart) { this.target().ontouchstart(this) };
			if (this._redirect) { return this.update() }; // possibly redirecting again
		};
		
		
		this._updates++;
		if (this._gestures) {
			for (var i = 0, ary = iter$(this._gestures), len = ary.length; i < len; i++) {
				ary[i].ontouchupdate(this);
			};
		};
		
		(target_ = this.target()) && target_.ontouchupdate  &&  target_.ontouchupdate(this);
		if (this._redirect) this.update();
		return this;
	};

	Imba.Touch.prototype.move = function (){
		var target_;
		if (!this._active || this._cancelled) { return this };
		
		if (this._gestures) {
			for (var i = 0, ary = iter$(this._gestures), len = ary.length, g; i < len; i++) {
				g = ary[i];
				if (g.ontouchmove) { g.ontouchmove(this,this._event) };
			};
		};
		
		(target_ = this.target()) && target_.ontouchmove  &&  target_.ontouchmove(this,this._event);
		return this;
	};

	Imba.Touch.prototype.ended = function (){
		var target_;
		if (!this._active || this._cancelled) { return this };
		
		this._updates++;
		
		if (this._gestures) {
			for (var i = 0, ary = iter$(this._gestures), len = ary.length; i < len; i++) {
				ary[i].ontouchend(this);
			};
		};
		
		(target_ = this.target()) && target_.ontouchend  &&  target_.ontouchend(this);
		this.cleanup_();
		return this;
	};

	Imba.Touch.prototype.cancel = function (){
		if (!this._cancelled) {
			this._cancelled = true;
			this.cancelled();
			this.cleanup_();
		};
		return this;
	};

	Imba.Touch.prototype.cancelled = function (){
		var target_;
		if (!this._active) { return this };
		
		this._cancelled = true;
		this._updates++;
		
		if (this._gestures) {
			for (var i = 0, ary = iter$(this._gestures), len = ary.length, g; i < len; i++) {
				g = ary[i];
				if (g.ontouchcancel) { g.ontouchcancel(this) };
			};
		};
		
		(target_ = this.target()) && target_.ontouchcancel  &&  target_.ontouchcancel(this);
		return this;
	};

	Imba.Touch.prototype.cleanup_ = function (){
		if (this._mousemove) {
			Imba.document().removeEventListener('mousemove',this._mousemove,true);
			this._mousemove = null;
		};
		
		if (this._selblocker) {
			Imba.document().removeEventListener('selectstart',this._selblocker,true);
			this._selblocker = null;
		};
		
		return this;
	};

	/*
		The absolute distance the touch has moved from starting position 
		@return {Number}
		*/

	Imba.Touch.prototype.dr = function (){
		return this._dr;
	};

	/*
		The distance the touch has moved horizontally
		@return {Number}
		*/

	Imba.Touch.prototype.dx = function (){
		return this._x - this._x0;
	};

	/*
		The distance the touch has moved vertically
		@return {Number}
		*/

	Imba.Touch.prototype.dy = function (){
		return this._y - this._y0;
	};

	/*
		Initial horizontal position of touch
		@return {Number}
		*/

	Imba.Touch.prototype.x0 = function (){
		return this._x0;
	};

	/*
		Initial vertical position of touch
		@return {Number}
		*/

	Imba.Touch.prototype.y0 = function (){
		return this._y0;
	};

	/*
		Horizontal position of touch
		@return {Number}
		*/

	Imba.Touch.prototype.x = function (){
		return this._x;
	};

	/*
		Vertical position of touch
		@return {Number}
		*/

	Imba.Touch.prototype.y = function (){
		return this._y;
	};

	/*
		Horizontal position of touch relative to target
		@return {Number}
		*/

	Imba.Touch.prototype.tx = function (){
		this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
		return this._x - this._targetBox.left;
	};

	/*
		Vertical position of touch relative to target
		@return {Number}
		*/

	Imba.Touch.prototype.ty = function (){
		this._targetBox || (this._targetBox = this._target.dom().getBoundingClientRect());
		return this._y - this._targetBox.top;
	};

	/*
		Button pressed in this touch. Native touches defaults to left-click (0)
		@return {Number}
		*/

	Imba.Touch.prototype.button = function (){
		return this._button;
	}; // @pointer ? @pointer.button : 0

	Imba.Touch.prototype.sourceTarget = function (){
		return this._sourceTarget;
	};

	Imba.Touch.prototype.elapsed = function (){
		return Date.now() - this._timestamp;
	};


	Imba.TouchGesture = function TouchGesture(){ };

	Imba.TouchGesture.prototype.__active = {'default': false,name: 'active'};
	Imba.TouchGesture.prototype.active = function(v){ return this._active; }
	Imba.TouchGesture.prototype.setActive = function(v){ this._active = v; return this; }
	Imba.TouchGesture.prototype._active = false;

	Imba.TouchGesture.prototype.ontouchstart = function (e){
		return this;
	};

	Imba.TouchGesture.prototype.ontouchupdate = function (e){
		return this;
	};

	Imba.TouchGesture.prototype.ontouchend = function (e){
		return this;
	};



/***/ },
/* 11 */
/***/ function(module, exports) {

	// imba$nolib=1

	Imba.KEYMAP = {
		"8": 'backspace',
		"9": 'tab',
		"13": 'enter',
		"16": 'shift',
		"17": 'ctrl',
		"18": 'alt',
		"19": 'break',
		"20": 'caps',
		"27": 'esc',
		"32": 'space',
		"35": 'end',
		"36": 'home',
		"37": 'larr',
		"38": 'uarr',
		"39": 'rarr',
		"40": 'darr',
		"45": 'insert',
		"46": 'delete',
		"107": 'plus',
		"106": 'mult',
		"91": 'meta'
	};

	Imba.CHARMAP = {
		"%": 'modulo',
		"*": 'multiply',
		"+": 'add',
		"-": 'sub',
		"/": 'divide',
		".": 'dot'
	};

	/*
	Imba handles all events in the dom through a single manager,
	listening at the root of your document. If Imba finds a tag
	that listens to a certain event, the event will be wrapped 
	in an `Imba.Event`, which normalizes some of the quirks and 
	browser differences.

	@iname event
	*/

	Imba.Event = function Event(e){
		this.setEvent(e);
		this.setBubble(true);
	};

	/* reference to the native event */

	Imba.Event.prototype.event = function(v){ return this._event; }
	Imba.Event.prototype.setEvent = function(v){ this._event = v; return this; };

	/* reference to the native event */

	Imba.Event.prototype.prefix = function(v){ return this._prefix; }
	Imba.Event.prototype.setPrefix = function(v){ this._prefix = v; return this; };

	Imba.Event.prototype.data = function(v){ return this._data; }
	Imba.Event.prototype.setData = function(v){ this._data = v; return this; };

	/*
		should remove this alltogether?
		@deprecated
		*/

	Imba.Event.prototype.source = function(v){ return this._source; }
	Imba.Event.prototype.setSource = function(v){ this._source = v; return this; };

	/* A {Boolean} indicating whether the event bubbles up or not */

	Imba.Event.prototype.__bubble = {type: Boolean,chainable: true,name: 'bubble'};
	Imba.Event.prototype.bubble = function(v){ return v !== undefined ? (this.setBubble(v),this) : this._bubble; }
	Imba.Event.prototype.setBubble = function(v){ this._bubble = v; return this; };

	Imba.Event.prototype.responder = function(v){ return this._responder; }
	Imba.Event.prototype.setResponder = function(v){ this._responder = v; return this; };

	Imba.Event.wrap = function (e){
		return new this(e);
	};

	Imba.Event.prototype.setType = function (type){
		this._type = type;
		this;
		return this;
	};

	/*
		@return {String} The name of the event (case-insensitive)
		*/

	Imba.Event.prototype.type = function (){
		return this._type || this.event().type;
	};

	Imba.Event.prototype.name = function (){
		return this._name || (this._name = this.type().toLowerCase().replace(/\:/g,''));
	};

	// mimc getset
	Imba.Event.prototype.bubble = function (v){
		if (v != undefined) {
			this.setBubble(v);
			return this;
		};
		return this._bubble;
	};

	/*
		Prevents further propagation of the current event.
		@return {self}
		*/

	Imba.Event.prototype.halt = function (){
		this.setBubble(false);
		return this;
	};

	/*
		Cancel the event (if cancelable). In the case of native events it
		will call `preventDefault` on the wrapped event object.
		@return {self}
		*/

	Imba.Event.prototype.cancel = function (){
		if (this.event().preventDefault) { this.event().preventDefault() };
		this._cancel = true;
		return this;
	};

	Imba.Event.prototype.silence = function (){
		this._silenced = true;
		return this;
	};

	Imba.Event.prototype.isSilenced = function (){
		return !!this._silenced;
	};

	/*
		Indicates whether or not event.cancel has been called.

		@return {Boolean}
		*/

	Imba.Event.prototype.isPrevented = function (){
		return this.event() && this.event().defaultPrevented || this._cancel;
	};

	/*
		A reference to the initial target of the event.
		*/

	Imba.Event.prototype.target = function (){
		return tag$wrap(this.event()._target || this.event().target);
	};

	/*
		A reference to the object responding to the event.
		*/

	Imba.Event.prototype.responder = function (){
		return this._responder;
	};

	/*
		Redirect the event to new target
		*/

	Imba.Event.prototype.redirect = function (node){
		this._redirect = node;
		return this;
	};

	/*
		Get the normalized character for KeyboardEvent/TextEvent
		@return {String}
		*/

	Imba.Event.prototype.keychar = function (){
		if (this.event() instanceof KeyboardEvent) {
			var ki = this.event().keyIdentifier || this.event().key;
			var sym = Imba.KEYMAP[this.event().keyCode];
			
			if (!sym) {
				if (ki.substr(0,2) == "U+") {
					sym = String.fromCharCode(parseInt(ki.substr(2),16));
				} else {
					sym = ki;
				};
			};
			return sym;
		} else if (this.event() instanceof (window.TextEvent || window.InputEvent)) {
			return this.event().data;
		};
		
		return null;
	};

	/*
		@deprecated
		*/

	Imba.Event.prototype.keycombo = function (){
		var sym;
		if (!(sym = this.keychar())) { return };
		sym = Imba.CHARMAP[sym] || sym;
		var combo = [],e = this.event();
		if (e.ctrlKey) { combo.push('ctrl') };
		if (e.shiftKey) { combo.push('shift') };
		if (e.altKey) { combo.push('alt') };
		if (e.metaKey) { combo.push('cmd') };
		combo.push(sym);
		return combo.join("_").toLowerCase();
	};


	Imba.Event.prototype.process = function (){
		var node;
		var meth = ("on" + (this._prefix || '') + this.name());
		var args = null;
		var domtarget = this.event()._target || this.event().target;
		// var node = <{domtarget:_responder or domtarget}>
		// need to clean up and document this behaviour
		
		var domnode = domtarget._responder || domtarget;
		// @todo need to stop infinite redirect-rules here
		
		var $1;while (domnode){
			this._redirect = null;
			if (node = tag$wrap(domnode)) { // not only tag 
				
				// FIXME No longer used? 
				if ((typeof node[($1 = meth)]=='string'||node[$1] instanceof String)) {
					// should remember the receiver of the event
					meth = node[meth];
					continue; // should not continue?
				};
				
				if (node[meth] instanceof Array) {
					args = node[meth].concat(node);
					meth = args.shift();
					continue; // should not continue?
				};
				
				if (node[meth] instanceof Function) {
					this._responder || (this._responder = node);
					// should autostop bubble here?
					args ? node[meth].apply(node,args) : node[meth](this,this.data());
				};
				
				if (node.onevent) {
					node.onevent(this);
				};
			};
			
			// add node.nextEventResponder as a separate method here?
			if (!(this.bubble() && (domnode = (this._redirect || (node ? node.parent() : domnode.parentNode))))) {
				break;
			};
		};
		
		this.processed();
		return this;
	};


	Imba.Event.prototype.processed = function (){
		if (!this._silenced && this._responder) {
			// if there has been inserts/removals during
			// theprocessing of this event - schedule Imba.commit
			if (Imba.TagManager.changes()) {
				Imba.ticker().schedule();
			};
			
			Imba.emit(Imba,'event',[this]);
		};
		return this;
	};

	/*
		Return the x/left coordinate of the mouse / pointer for this event
		@return {Number} x coordinate of mouse / pointer for event
		*/

	Imba.Event.prototype.x = function (){
		return this.event().x;
	};

	/*
		Return the y/top coordinate of the mouse / pointer for this event
		@return {Number} y coordinate of mouse / pointer for event
		*/

	Imba.Event.prototype.y = function (){
		return this.event().y;
	};

	/*
		Returns a Number representing a system and implementation
		dependent numeric code identifying the unmodified value of the
		pressed key; this is usually the same as keyCode.

		For mouse-events, the returned value indicates which button was
		pressed on the mouse to trigger the event.

		@return {Number}
		*/

	Imba.Event.prototype.which = function (){
		return this.event().which;
	};



/***/ },
/* 12 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	// imba$nolib=1

	/*

	Manager for listening to and delegating events in Imba. A single instance
	is always created by Imba (as `Imba.Events`), which handles and delegates all
	events at the very root of the document. Imba does not capture all events
	by default, so if you want to make sure exotic or custom DOMEvents are delegated
	in Imba you will need to register them in `Imba.Events.register(myCustomEventName)`

	@iname manager

	*/

	Imba.EventManager = function EventManager(node,pars){
		var self = this;
		if(!pars||pars.constructor !== Object) pars = {};
		var events = pars.events !== undefined ? pars.events : [];
		self._shimFocusEvents = true && window.netscape && node.onfocusin === undefined;
		self.setRoot(node);
		self.setListeners([]);
		self.setDelegators({});
		self.setDelegator(function(e) {
			self.delegate(e);
			return true;
		});
		
		for (var i = 0, ary = iter$(events), len = ary.length; i < len; i++) {
			self.register(ary[i]);
		};
		
		return self;
	};

	Imba.EventManager.prototype.root = function(v){ return this._root; }
	Imba.EventManager.prototype.setRoot = function(v){ this._root = v; return this; };
	Imba.EventManager.prototype.count = function(v){ return this._count; }
	Imba.EventManager.prototype.setCount = function(v){ this._count = v; return this; };
	Imba.EventManager.prototype.__enabled = {'default': false,watch: 'enabledDidSet',name: 'enabled'};
	Imba.EventManager.prototype.enabled = function(v){ return this._enabled; }
	Imba.EventManager.prototype.setEnabled = function(v){
		var a = this.enabled();
		if(v != a) { this._enabled = v; }
		if(v != a) { this.enabledDidSet && this.enabledDidSet(v,a,this.__enabled) }
		return this;
	}
	Imba.EventManager.prototype._enabled = false;
	Imba.EventManager.prototype.listeners = function(v){ return this._listeners; }
	Imba.EventManager.prototype.setListeners = function(v){ this._listeners = v; return this; };
	Imba.EventManager.prototype.delegators = function(v){ return this._delegators; }
	Imba.EventManager.prototype.setDelegators = function(v){ this._delegators = v; return this; };
	Imba.EventManager.prototype.delegator = function(v){ return this._delegator; }
	Imba.EventManager.prototype.setDelegator = function(v){ this._delegator = v; return this; };

	Imba.EventManager.prototype.enabledDidSet = function (bool){
		bool ? this.onenable() : this.ondisable();
		return this;
	};

	/*

		Tell the current EventManager to intercept and handle event of a certain name.
		By default, Imba.Events will register interceptors for: *keydown*, *keyup*, 
		*keypress*, *textInput*, *input*, *change*, *submit*, *focusin*, *focusout*, 
		*blur*, *contextmenu*, *dblclick*, *mousewheel*, *wheel*

		*/

	Imba.EventManager.prototype.register = function (name,handler){
		if(handler === undefined) handler = true;
		if (name instanceof Array) {
			for (var i = 0, ary = iter$(name), len = ary.length; i < len; i++) {
				this.register(ary[i],handler);
			};
			return this;
		};
		
		if (this.delegators()[name]) { return this };
		// console.log("register for event {name}")
		var fn = this.delegators()[name] = (handler instanceof Function) ? handler : this.delegator();
		if (this.enabled()) { return this.root().addEventListener(name,fn,true) };
	};

	Imba.EventManager.prototype.listen = function (name,handler,capture){
		if(capture === undefined) capture = true;
		this.listeners().push([name,handler,capture]);
		if (this.enabled()) { this.root().addEventListener(name,handler,capture) };
		return this;
	};

	Imba.EventManager.prototype.delegate = function (e){
		var event = Imba.Event.wrap(e);
		event.process();
		if (this._shimFocusEvents) {
			if (e.type == 'focus') {
				Imba.Event.wrap(e).setType('focusin').process();
			} else if (e.type == 'blur') {
				Imba.Event.wrap(e).setType('focusout').process();
			};
		};
		return this;
	};

	/*

		Create a new Imba.Event

		*/

	Imba.EventManager.prototype.create = function (type,target,pars){
		if(!pars||pars.constructor !== Object) pars = {};
		var data = pars.data !== undefined ? pars.data : null;
		var source = pars.source !== undefined ? pars.source : null;
		var event = Imba.Event.wrap({type: type,target: target});
		if (data) { (event.setData(data),data) };
		if (source) { (event.setSource(source),source) };
		return event;
	};

	/*

		Trigger / process an Imba.Event.

		*/

	Imba.EventManager.prototype.trigger = function (){
		return this.create.apply(this,arguments).process();
	};

	Imba.EventManager.prototype.onenable = function (){
		for (var o = this.delegators(), i = 0, keys = Object.keys(o), l = keys.length; i < l; i++){
			this.root().addEventListener(keys[i],o[keys[i]],true);
		};
		
		for (var j = 0, ary = iter$(this.listeners()), len = ary.length, item; j < len; j++) {
			item = ary[j];
			this.root().addEventListener(item[0],item[1],item[2]);
		};
		return this;
	};

	Imba.EventManager.prototype.ondisable = function (){
		for (var o = this.delegators(), i = 0, keys = Object.keys(o), l = keys.length; i < l; i++){
			this.root().removeEventListener(keys[i],o[keys[i]],true);
		};
		
		for (var j = 0, ary = iter$(this.listeners()), len = ary.length, item; j < len; j++) {
			item = ary[j];
			this.root().removeEventListener(item[0],item[1],item[2]);
		};
		return this;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	// imba$nolib=1


	/*
		The special syntax for selectors in Imba creates Imba.Selector
		instances.
		*/

	Imba.Selector = function Selector(sel,scope,nodes){
		
		this._query = (sel instanceof Imba.Selector) ? sel.query() : sel;
		this._context = scope;
		
		if (nodes) {
			for (var i = 0, ary = iter$(nodes), len = ary.length, res = []; i < len; i++) {
				res.push(tag$wrap(ary[i]));
			};
			this._nodes = res;
		};
		
		this._lazy = !nodes;
		return this;
	};

	Imba.Selector.one = function (sel,scope){
		var el = (scope || Imba.document()).querySelector(sel);
		return el && tag$wrap(el) || null;
	};

	Imba.Selector.all = function (sel,scope){
		return new Imba.Selector(sel,scope);
	};

	Imba.Selector.prototype.query = function(v){ return this._query; }
	Imba.Selector.prototype.setQuery = function(v){ this._query = v; return this; };

	Imba.Selector.prototype.reload = function (){
		this._nodes = null;
		return this;
	};

	Imba.Selector.prototype.scope = function (){
		var ctx;
		if (this._scope) { return this._scope };
		if (!(ctx = this._context)) { return Imba.document() };
		return this._scope = ctx.toScope ? ctx.toScope() : ctx;
	};

	/*
			@returns {Imba.Tag} first node matching this selector
			*/

	Imba.Selector.prototype.first = function (){
		if (this._lazy) { return tag$wrap(this._first || (this._first = this.scope().querySelector(this.query()))) } else {
			return this.nodes()[0];
		};
	};

	/*
			@returns {Imba.Tag} last node matching this selector
			*/

	Imba.Selector.prototype.last = function (){
		return this.nodes()[this._nodes.length - 1];
	};

	/*
			@returns [Imba.Tag] all nodes matching this selector
			*/

	Imba.Selector.prototype.nodes = function (){
		if (this._nodes) { return this._nodes };
		var items = this.scope().querySelectorAll(this.query());
		for (var i = 0, ary = iter$(items), len = ary.length, res = []; i < len; i++) {
			res.push(tag$wrap(ary[i]));
		};
		this._nodes = res;
		this._lazy = false;
		return this._nodes;
	};

	/*
			The number of nodes matching this selector
			*/

	Imba.Selector.prototype.count = function (){
		return this.nodes().length;
	};

	Imba.Selector.prototype.len = function (){
		return this.nodes().length;
	};

	/*
			@todo Add support for block or selector?
			*/

	Imba.Selector.prototype.some = function (){
		return this.count() >= 1;
	};

	/*
			Get node at index
			*/

	Imba.Selector.prototype.at = function (idx){
		return this.nodes()[idx];
	};

	/*
			Loop through nodes
			*/

	Imba.Selector.prototype.forEach = function (block){
		this.nodes().forEach(block);
		return this;
	};

	/*
			Map nodes
			*/

	Imba.Selector.prototype.map = function (block){
		return this.nodes().map(block);
	};

	/*
			Returns a plain array containing nodes. Implicitly called
			when iterating over a selector in Imba `(node for node in $(selector))`
			*/

	Imba.Selector.prototype.toArray = function (){
		return this.nodes();
	};

	// Get the first element that matches the selector, 
	// beginning at the current element and progressing up through the DOM tree
	Imba.Selector.prototype.closest = function (sel){
		// seems strange that we alter this selector?
		this._nodes = this.map(function(node) { return node.closest(sel); });
		return this;
	};

	// Get the siblings of each element in the set of matched elements, 
	// optionally filtered by a selector.
	// TODO remove duplicates?
	Imba.Selector.prototype.siblings = function (sel){
		this._nodes = this.map(function(node) { return node.siblings(sel); });
		return this;
	};

	// Get the descendants of each element in the current set of matched 
	// elements, filtered by a selector.
	Imba.Selector.prototype.find = function (sel){
		this._nodes = this.__query__(sel.query(),this.nodes());
		return this;
	};

	Imba.Selector.prototype.reject = function (blk){
		return this.filter(blk,false);
	};

	/*
			Filter the nodes in selector by a function or other selector
			*/

	Imba.Selector.prototype.filter = function (blk,bool){
		if(bool === undefined) bool = true;
		var fn = (blk instanceof Function) && blk || function(n) { return n.matches(blk); };
		var ary = this.nodes().filter(function(n) { return fn(n) == bool; });
		// if we want to return a new selector for this, we should do that for
		// others as well
		return new Imba.Selector("",this._scope,ary);
	};

	Imba.Selector.prototype.__query__ = function (query,contexts){
		var nodes = [];
		var i = 0;
		var l = contexts.length;
		
		while (i < l){
			nodes.push.apply(nodes,contexts[i++].querySelectorAll(query));
		};
		return nodes;
	};

	Imba.Selector.prototype.__matches__ = function (){
		return true;
	};

	/*
			Add specified flag to all nodes in selector
			*/

	Imba.Selector.prototype.flag = function (flag){
		return this.forEach(function(n) { return n.flag(flag); });
	};

	/*
			Remove specified flag from all nodes in selector
			*/

	Imba.Selector.prototype.unflag = function (flag){
		return this.forEach(function(n) { return n.unflag(flag); });
	};


	// def Imba.querySelectorAll
	q$ = function(sel,scope) { return new Imba.Selector(sel,scope); };

	// def Imba.Selector.one
	q$$ = function(sel,scope) {
		var el = (scope || Imba.document()).querySelector(sel);
		return el && tag$wrap(el) || null;
	};


	// extending tags with query-methods
	// must be a better way to reopen classes
	_T.extendTag('element', function(tag){
		tag.prototype.querySelectorAll = function (q){
			return this._dom.querySelectorAll(q);
		};
		tag.prototype.querySelector = function (q){
			return this._dom.querySelector(q);
		};
		
		// should be moved to Imba.Tag instead?
		// or we should implement all of them here
		tag.prototype.find = function (sel){
			return new Imba.Selector(sel,this);
		};
	});




/***/ },
/* 14 */
/***/ function(module, exports) {

	function iter$(a){ return a ? (a.toArray ? a.toArray() : a) : []; };
	// imba$nolib=1

	function removeNested(root,node,caret){
		// if node/nodes isa String
		// 	we need to use the caret to remove elements
		// 	for now we will simply not support this
		if (node instanceof Imba.Tag) {
			root.removeChild(node);
		} else if (node instanceof Array) {
			for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
				removeNested(root,ary[i],caret);
			};
		} else if (node != null) {
			// what if this is not null?!?!?
			// take a chance and remove a text-elementng
			var next = caret ? caret.nextSibling : root._dom.firstChild;
			if ((next instanceof Text) && next.textContent == node) {
				root.removeChild(next);
			} else {
				throw 'cannot remove string';
			};
		};
		
		return caret;
	};

	function appendNested(root,node){
		if (node instanceof Imba.Tag) {
			root.appendChild(node);
		} else if (node instanceof Array) {
			for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
				appendNested(root,ary[i]);
			};
		} else if (node != null && node !== false) {
			root.appendChild(Imba.createTextNode(node));
		};
		
		return;
	};


	// insert nodes before a certain node
	// does not need to return any tail, as before
	// will still be correct there
	// before must be an actual domnode
	function insertNestedBefore(root,node,before){
		if (node instanceof Imba.Tag) {
			root.insertBefore(node,before);
		} else if (node instanceof Array) {
			for (var i = 0, ary = iter$(node), len = ary.length; i < len; i++) {
				insertNestedBefore(root,ary[i],before);
			};
		} else if (node != null && node !== false) {
			root.insertBefore(Imba.createTextNode(node),before);
		};
		
		return before;
	};

	// after must be an actual domnode
	function insertNestedAfter(root,node,after){
		var before = after ? after.nextSibling : root._dom.firstChild;
		
		if (before) {
			insertNestedBefore(root,node,before);
			return before.previousSibling;
		} else {
			appendNested(root,node);
			return root._dom.lastChild;
		};
	};

	function reconcileCollectionChanges(root,new$,old,caret){
		
		var newLen = new$.length;
		var lastNew = new$[newLen - 1];
		
		// This re-order algorithm is based on the following principle:
		// 
		// We build a "chain" which shows which items are already sorted.
		// If we're going from [1, 2, 3] -> [2, 1, 3], the tree looks like:
		//
		// 	3 ->  0 (idx)
		// 	2 -> -1 (idx)
		// 	1 -> -1 (idx)
		//
		// This tells us that we have two chains of ordered items:
		// 
		// 	(1, 3) and (2)
		// 
		// The optimal re-ordering then becomes to keep the longest chain intact,
		// and move all the other items.
		
		var newPosition = [];
		
		// The tree/graph itself
		var prevChain = [];
		// The length of the chain
		var lengthChain = [];
		
		// Keep track of the longest chain
		var maxChainLength = 0;
		var maxChainEnd = 0;
		
		var hasTextNodes = false;
		var newPos;
		
		for (var idx = 0, ary = iter$(old), len = ary.length, node; idx < len; idx++) {
			// special case for Text nodes
			node = ary[idx];
			if (node && node.nodeType == 3) {
				newPos = new$.indexOf(node.textContent);
				if (newPos >= 0) { new$[newPos] = node };
				hasTextNodes = true;
			} else {
				newPos = new$.indexOf(node);
			};
			
			newPosition.push(newPos);
			
			if (newPos == -1) {
				root.removeChild(node);
				prevChain.push(-1);
				lengthChain.push(-1);
				continue;
			};
			
			var prevIdx = newPosition.length - 2;
			
			// Build the chain:
			while (prevIdx >= 0){
				if (newPosition[prevIdx] == -1) {
					prevIdx--;
				} else if (newPos > newPosition[prevIdx]) {
					// Yay, we're bigger than the previous!
					break;
				} else {
					// Nope, let's walk back the chain
					prevIdx = prevChain[prevIdx];
				};
			};
			
			prevChain.push(prevIdx);
			
			var currLength = (prevIdx == -1) ? 0 : (lengthChain[prevIdx] + 1);
			
			if (currLength > maxChainLength) {
				maxChainLength = currLength;
				maxChainEnd = idx;
			};
			
			lengthChain.push(currLength);
		};
		
		var stickyNodes = [];
		
		// Now we can walk the longest chain backwards and mark them as "sticky",
		// which implies that they should not be moved
		var cursor = newPosition.length - 1;
		while (cursor >= 0){
			if (cursor == maxChainEnd && newPosition[cursor] != -1) {
				stickyNodes[newPosition[cursor]] = true;
				maxChainEnd = prevChain[maxChainEnd];
			};
			
			cursor -= 1;
		};
		
		// possible to do this in reversed order instead?
		for (var idx1 = 0, items = iter$(new$), len_ = items.length, node1; idx1 < len_; idx1++) {
			node1 = items[idx1];
			if (!stickyNodes[idx1]) {
				// create textnode for string, and update the array
				if (!((node1 instanceof Imba.Tag))) {
					node1 = new$[idx1] = Imba.createTextNode(node1);
				};
				
				var after = new$[idx1 - 1];
				insertNestedAfter(root,node1,(after && after._dom || after || caret));
			};
			
			caret = node1._dom || (caret && caret.nextSibling || root._dom.firstChild);
		};
		
		// should trust that the last item in new list is the caret
		return lastNew && lastNew._dom || caret;
	};


	// expects a flat non-sparse array of nodes in both new and old, always
	function reconcileCollection(root,new$,old,caret){
		var k = new$.length;
		var i = k;
		var last = new$[k - 1];
		
		
		if (k == old.length && new$[0] === old[0]) {
			// running through to compare
			while (i--){
				if (new$[i] !== old[i]) { break; };
			};
		};
		
		if (i == -1) {
			return last && last._dom || last || caret;
		} else {
			return reconcileCollectionChanges(root,new$,old,caret);
		};
	};

	// the general reconciler that respects conditions etc
	// caret is the current node we want to insert things after
	function reconcileNested(root,new$,old,caret){
		
		// var skipnew = new == null or new === false or new === true
		var newIsNull = new$ == null || new$ === false;
		var oldIsNull = old == null || old === false;
		
		
		if (new$ === old) {
			// remember that the caret must be an actual dom element
			// we should instead move the actual caret? - trust
			if (newIsNull) {
				return caret;
			} else if (new$ && new$._dom) {
				return new$._dom;
			} else {
				return caret ? caret.nextSibling : root._dom.firstChild;
			};
		} else if (new$ instanceof Array) {
			if (old instanceof Array) {
				if (new$.static || old.static) {
					// if the static is not nested - we could get a hint from compiler
					// and just skip it
					if (new$.static == old.static) {
						for (var i = 0, ary = iter$(new$), len = ary.length; i < len; i++) {
							// this is where we could do the triple equal directly
							caret = reconcileNested(root,ary[i],old[i],caret);
						};
						return caret;
					} else {
						removeNested(root,old,caret);
					};
					
					// if they are not the same we continue through to the default
				} else {
					return reconcileCollection(root,new$,old,caret);
				};
			} else if (old instanceof Imba.Tag) {
				root.removeChild(old);
			} else if (!oldIsNull) {
				// old was a string-like object?
				root.removeChild(caret ? caret.nextSibling : root._dom.firstChild);
			};
			
			return insertNestedAfter(root,new$,caret);
			// remove old
		} else if (new$ instanceof Imba.Tag) {
			if (!oldIsNull) { removeNested(root,old,caret) };
			return insertNestedAfter(root,new$,caret);
		} else if (newIsNull) {
			if (!oldIsNull) { removeNested(root,old,caret) };
			return caret;
		} else {
			// if old did not exist we need to add a new directly
			var nextNode;
			// if old was array or imbatag we need to remove it and then add
			if (old instanceof Array) {
				removeNested(root,old,caret);
			} else if (old instanceof Imba.Tag) {
				root.removeChild(old);
			} else if (!oldIsNull) {
				// ...
				nextNode = caret ? caret.nextSibling : root._dom.firstChild;
				if ((nextNode instanceof Text) && nextNode.textContent != new$) {
					nextNode.textContent = new$;
					return nextNode;
				};
			};
			
			// now add the textnode
			return insertNestedAfter(root,new$,caret);
		};
	};


	_T.extendTag('element', function(tag){
		
		tag.prototype.setChildren = function (new$,typ){
			var old = this._children;
			
			if (new$ === old) {
				return this;
			};
			
			if (!old) {
				this.empty();
				appendNested(this,new$);
			} else if (typ == 2) {
				return this;
			} else if (typ == 1) {
				// here we _know _that it is an array with the same shape
				// every time
				var caret = null;
				for (var i = 0, ary = iter$(new$), len = ary.length; i < len; i++) {
					// prev = old[i]
					caret = reconcileNested(this,ary[i],old[i],caret);
				};
			} else if (typ == 3) {
				// this is possibly fully dynamic. It often is
				// but the old or new could be static while the other is not
				// this is not handled now
				// what if it was previously a static array? edgecase - but must work
				if (new$ instanceof Imba.Tag) {
					this.empty();
					this.appendChild(new$);
				} else if (new$ instanceof Array) {
					if (old instanceof Array) {
						reconcileNested(this,new$,old,null);
					} else {
						this.empty();
						appendNested(this,new$);
					};
				} else {
					this.setText(new$);
					return this;
				};
			} else if ((new$ instanceof Array) && (old instanceof Array)) {
				reconcileNested(this,new$,old,null);
			} else {
				this.empty();
				appendNested(this,new$);
			};
			
			this._children = new$;
			return this;
		};
		
		tag.prototype.content = function (){
			return this._content || this.children().toArray();
		};
		
		tag.prototype.setText = function (text){
			if (text != this._children) {
				this._children = text;
				this.dom().textContent = (text == null || text === false) ? '' : text;
			};
			this;
			return this;
		};
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Stack = __webpack_require__(16).Stack;
	var Menu$ = __webpack_require__(17), Menu = Menu$.Menu, MenuItem = Menu$.MenuItem;
	var Button$ = __webpack_require__(18), Button = Button$.Button, IconButton = Button$.IconButton;
	var TextField = __webpack_require__(19).TextField;
	var ListItem = __webpack_require__(20).ListItem;
	var Popover = __webpack_require__(29).Popover;

	var snarkdown = __webpack_require__(21);

	var MarkdownCache = {};

	function UXA(owner){
		this._owner = owner;
		this;
	};

	UXA.prototype.open = function (component){
		return Stack.show(component,this._owner);
	};

	UXA.prototype.menu = function (component){
		return this;
	};

	UXA.prototype.md = function (str){
		var MarkdownCache_, $1;
		return MarkdownCache[($1 = str)] || (MarkdownCache[$1] = snarkdown(str));
	};

	// hello
	_T.extendTag('element', function(tag){
		
		tag.prototype.uxa = function (){
			return this._uxa || (this._uxa = new UXA(this));
		};
		
		tag.prototype.__uxaMarkdown = {watch: 'uxaMarkdownDidSet',name: 'uxaMarkdown'};
		tag.prototype.uxaMarkdown = function(v){ return this._uxaMarkdown; }
		tag.prototype.setUxaMarkdown = function(v){
			var a = this.uxaMarkdown();
			if(v != a) { this._uxaMarkdown = v; }
			if(v != a) { this.uxaMarkdownDidSet && this.uxaMarkdownDidSet(v,a,this.__uxaMarkdown) }
			return this;
		};
		
		tag.prototype.uxaMarkdownDidSet = function (text){
			return this.dom().innerHTML = this.uxa().md(text);
		};
	});

	var Button = exports.Button = Button;
	var IconButton = exports.IconButton = IconButton;
	var Menu = exports.Menu = Menu;
	var TextField = exports.TextField = TextField;
	var ListItem = exports.ListItem = ListItem;
	var MenuItem = exports.MenuItem = MenuItem;
	var Popover = exports.Popover = Popover;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Menu = __webpack_require__(17).Menu;
	var Popover = __webpack_require__(29).Popover;

	var Overlay = _T.defineTag('Overlay', function(tag){
		tag.prototype.component = function(v){ return this._component; }
		tag.prototype.setComponent = function(v){ this._component = v; return this; };
		tag.prototype.target = function(v){ return this._target; }
		tag.prototype.setTarget = function(v){ this._target = v; return this; };
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				this.component().flag('floating').end(),
				(__.A = __.A || _T.DIV(this).flag('curtain').setHandler('tap','hide',this)).end()
			],1).synced();
		};
		
		tag.prototype.show = function (){
			this.flag('hidden');
			if (this._isMenu) this.reflow();
			document.body.appendChild(this.dom());
			this.dom().offsetWidth;
			this.unflag('hidden');
			this.flag('visible');
			return this;
		};
		
		tag.prototype.hide = function (){
			var self = this;
			self.flag('hidden');
			self.unflag('visible');
			setTimeout(function() {
				return self.dom().parentNode.removeChild(self.dom());
			},200);
			return self;
		};
		
		tag.prototype.setup = function (){
			this._isMenu = (this.component() instanceof Menu) || (this.component() instanceof Popover);
			return console.log('setup',this.target());
		};
		
		tag.prototype.reflow = function (){
			if (!this.target().dom().offsetParent) {
				if (!this.hasFlag('hide')) this.hide();
				return this;
			};
			
			var box = this.target().dom().getBoundingClientRect();
			
			var vw = window.innerWidth;
			var vh = window.innerHeight;
			
			var sx = 0; // window:scrollX
			var sy = 0; // window:scrollY
			
			var x = Math.round(box.left + sx + box.width * 0.5);
			var y = Math.round(box.top + sy + box.height * 0.5);
			
			var ax = (x > vw * 0.5) ? 1 : 0;
			var ay = (y > vh * 0.5) ? 1 : 0;
			
			var xmax = vw - 10;
			var xmin = 10;
			
			this.setFlag('ay',ay ? 'below' : 'above');
			this.setFlag('ax',(x > (vw * 0.5)) ? null : 'lft');
			
			var css = {
				maxWidth: 400
			};
			this.component().flag('abs');
			
			if (ay < 0.5) {
				css.top = box.bottom;
				css.maxHeight = vh - css.top;
			} else {
				css.bottom = box.top;
				css.maxHeight = vh - css.bottom;
			};
			
			if (ax < 0.5) {
				css.left = Math.max(box.left,10);
			} else {
				css.right = Math.max((vw - box.right),10);
			};
			
			console.log(x,vw,y,vh,ax,ay);
			
			return this.component().css(css);
			
			// css
			// 	padding-top: Math.round((box:bottom + sx) + 10)
			// 	bottom: (vh - (box:top - 10 + sy))
			// 	left: x
			// 	max-width: Math.min( (xmax - x) * 2, (x - xmin) * 2)
		};
		
		tag.prototype.calculateLabelPosition = function (){
			var box = this.dom().getBoundingClientRect();
			var ax = box.left / document.body.offsetWidth;
			var ay = box.top / document.body.offsetHeight;
			
			this.setFlag('ax',(ax > 0.7) ? 'axr' : (((ax < 0.3) ? 'axl' : 'axc')));
			this.setFlag('ay',(ay > 0.7) ? 'ayb' : (((ay < 0.3) ? 'ayt' : 'ayc')));
			return this;
		};
	})
	exports.Overlay = Overlay;


	function Stack(){ };

	exports.Stack = Stack; // export class 
	Stack.show = function (item,rel){
		var overlay = Overlay.build(this).setComponent(item).setTarget(rel).end();
		return overlay.show();
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Icon = __webpack_require__(28).Icon;

	var Menu = _T.defineTag('Menu')
	exports.Menu = Menu;

	var MenuItem = _T.defineTag('MenuItem', function(tag){
		tag.prototype.icon = function(v){ return this._icon; }
		tag.prototype.setIcon = function(v){ this._icon = v; return this; };
		tag.prototype.rightIcon = function(v){ return this._rightIcon; }
		tag.prototype.setRightIcon = function(v){ this._rightIcon = v; return this; };
		tag.prototype.label = function(v){ return this._label; }
		tag.prototype.setLabel = function(v){ this._label = v; return this; };
		tag.prototype.subtext = function(v){ return this._subtext; }
		tag.prototype.setSubtext = function(v){ this._subtext = v; return this; };
		tag.prototype.disabled = function(v){ return this.getAttribute('disabled'); }
		tag.prototype.setDisabled = function(v){ this.setAttribute('disabled',v); return this; };
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				this.icon() ? (
					(__.A = __.A || Icon.build(this).flag('left')).setData(this.icon()).end()
				) : void(0),
				self.label() ? (
					(__.B = __.B || _T.DIV(self).flag('text')).setUxaMarkdown(self.label()).end()
				) : void(0),
				self.subtext() ? (
					(__.C = __.C || _T.DIV(self).flag('subtext').flag('muted')).setUxaMarkdown(self.subtext()).end()
				) : void(0),
				self.rightIcon() ? (
					(__.D = __.D || Icon.build(self).flag('right')).setData(self.rightIcon()).end()
				) : void(0)
			],1).synced();
		};
	})
	exports.MenuItem = MenuItem;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Icon = __webpack_require__(28).Icon;

	var Button = _T.defineTag('Button', 'button', function(tag){
		tag.prototype.icon = function(v){ return this._icon; }
		tag.prototype.setIcon = function(v){ this._icon = v; return this; };
		tag.prototype.label = function(v){ return this._label; }
		tag.prototype.setLabel = function(v){ this._label = v; return this; };
		tag.prototype.uxaAnchor = function(v){ return this._uxaAnchor; }
		tag.prototype.setUxaAnchor = function(v){ this._uxaAnchor = v; return this; };
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.flag('button').setChildren([
				this.icon() ? (
					(__.A = __.A || Icon.build(this)).setData(this.icon()).end()
				) : void(0),
				self.label() ? (
					(__.B = __.B || _T.B(self)).setUxaMarkdown(self.label()).end()
				) : void(0)
			],1).synced();
		};
	})
	exports.Button = Button;

	var IconButton = _T.defineTag('IconButton', Button)
	exports.IconButton = IconButton;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var TextField = _T.defineTag('TextField', function(tag){
		tag.prototype.label = function(v){ return this._label; }
		tag.prototype.setLabel = function(v){ this._label = v; return this; };
		tag.prototype.desc = function(v){ return this._desc; }
		tag.prototype.setDesc = function(v){ this._desc = v; return this; };
		
		['disabled','placeholder'].map(function(key) {
			var setter = Imba.toCamelCase(("set-" + key));
			tag.prototype[key] = function(val) { return this.input()[key](); };
			return tag.prototype[setter] = function(val) {
				this.input()[setter](val);
				return this;
			};
		});
		
		tag.prototype.input = function (){
			return (this._input || _T.INPUT(this).ref_('input',this).setType('text').setRequired(true).setPattern("Sindre").setPlaceholder(" ")).end();
		};
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.flag('textfield').setChildren([
				this.input(),
				(__.A = __.A || _T.SPAN(this).flag('bar')).end(),
				(__.B = __.B || _T.LABEL(self)).setContent(self.label(),3).end(),
				(__.C = __.C || _T.SPAN(self).flag('helper').flag('desc')).dataset('desc',self.desc()).setContent(self.desc(),3).end()
			],1).synced();
		};
	})
	exports.TextField = TextField;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Icon = __webpack_require__(28).Icon;

	var ListItem = _T.defineTag('ListItem', function(tag){
		tag.prototype.icon = function(v){ return this._icon; }
		tag.prototype.setIcon = function(v){ this._icon = v; return this; };
		tag.prototype.rightIcon = function(v){ return this._rightIcon; }
		tag.prototype.setRightIcon = function(v){ this._rightIcon = v; return this; };
		tag.prototype.label = function(v){ return this._label; }
		tag.prototype.setLabel = function(v){ this._label = v; return this; };
		tag.prototype.subtext = function(v){ return this._subtext; }
		tag.prototype.setSubtext = function(v){ this._subtext = v; return this; };
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				(__.A = __.A || _T.DIV(this).flag('gutter')).setContent([
					this.icon() ? (
						(__.AA = __.AA || Icon.build(this).flag('left')).setData(this.icon()).end()
					) : void(0)
				],1).end(),
				(__.B = __.B || _T.DIV(self).flag('main')).setContent([
					self.label() ? (
						(__.BA = __.BA || _T.DIV(self).flag('text')).setUxaMarkdown(self.label()).end()
					) : void(0),
					self.subtext() ? (
						(__.BB = __.BB || _T.DIV(self).flag('subtext').flag('muted')).setUxaMarkdown(self.subtext()).end()
					) : void(0)
				],1).end(),
				self.rightIcon() ? (
					(__.C = __.C || Icon.build(self).flag('right')).setData(self.rightIcon()).end()
				) : void(0)
			],1).synced();
		};
	})
	exports.ListItem = ListItem;


/***/ },
/* 21 */
/***/ function(module, exports) {

	function e(e){return e.replace(RegExp("^"+(e.match(/^(\t| )+/)||"")[0],"gm"),"")}function n(e){return(e+"").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(a){function c(e){var n=t[e.replace(/\*/g,"_")[1]||""],r=i[i.length-1]==e;return n?n[1]?(i[r?"pop":"push"](e),n[0|r]):n[0]:e}function o(){for(var e="";i.length;)e+=c(i[i.length-1]);return e}var l,g,s,p,u,m=/((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,i=[],h="",f=0,$={};for(a=a.replace(/^\[(.+?)\]:\s*(.+)$/gm,function(e,n,r){return $[n.toLowerCase()]=r,""}).replace(/^\n+|\n+$/g,"");s=m.exec(a);)g=a.substring(f,s.index),f=m.lastIndex,l=s[0],g.match(/[^\\](\\\\)*\\$/)||(s[3]||s[4]?l='<pre class="code '+(s[4]?"poetry":s[2].toLowerCase())+'">'+e(n(s[3]||s[4]).replace(/^\n+|\n+$/g,""))+"</pre>":s[6]?(u=s[6],u.match(/\./)&&(s[5]=s[5].replace(/^\d+/gm,"")),p=r(e(s[5].replace(/^\s*[>*+.-]/gm,""))),">"===u?u="blockquote":(u=u.match(/\./)?"ol":"ul",p=p.replace(/^(.*)(\n|$)/gm,"<li>$1</li>")),l="<"+u+">"+p+"</"+u+">"):s[8]?l='<img src="'+n(s[8])+'" alt="'+n(s[7])+'">':s[10]?(h=h.replace("<a>",'<a href="'+n(s[11]||$[g.toLowerCase()])+'">'),l=o()+"</a>"):s[9]?l="<a>":s[12]||s[14]?(u="h"+(s[14]?s[14].length:"="===s[13][0]?1:2),l="<"+u+">"+r(s[12]||s[15])+"</"+u+">"):s[16]?l="<code>"+n(s[16])+"</code>":(s[17]||s[1])&&(l=c(s[17]||"--"))),h+=g,h+=l;return(h+a.substring(f)+o()).trim()}var t={"":["<em>","</em>"],_:["<strong>","</strong>"],"\n":["<br />"]," ":["<br />"],"-":["<hr />"]};module.exports=r;
	//# sourceMappingURL=snarkdown.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */

	;(function() {

	/**
	 * Block-Level Grammar
	 */

	var block = {
	  newline: /^\n+/,
	  code: /^( {4}[^\n]+\n*)+/,
	  fences: noop,
	  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	  nptable: noop,
	  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	  table: noop,
	  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	  text: /^[^\n]+/
	};

	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	  (/bull/g, block.bullet)
	  ();

	block.list = replace(block.list)
	  (/bull/g, block.bullet)
	  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	  ('def', '\\n+(?=' + block.def.source + ')')
	  ();

	block.blockquote = replace(block.blockquote)
	  ('def', block.def)
	  ();

	block._tag = '(?!(?:'
	  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

	block.html = replace(block.html)
	  ('comment', /<!--[\s\S]*?-->/)
	  ('closed', /<(tag)[\s\S]+?<\/\1>/)
	  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	  (/tag/g, block._tag)
	  ();

	block.paragraph = replace(block.paragraph)
	  ('hr', block.hr)
	  ('heading', block.heading)
	  ('lheading', block.lheading)
	  ('blockquote', block.blockquote)
	  ('tag', '<' + block._tag)
	  ('def', block.def)
	  ();

	/**
	 * Normal Block Grammar
	 */

	block.normal = merge({}, block);

	/**
	 * GFM Block Grammar
	 */

	block.gfm = merge({}, block.normal, {
	  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	  paragraph: /^/,
	  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});

	block.gfm.paragraph = replace(block.paragraph)
	  ('(?!', '(?!'
	    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	    + block.list.source.replace('\\1', '\\3') + '|')
	  ();

	/**
	 * GFM + Tables Block Grammar
	 */

	block.tables = merge({}, block.gfm, {
	  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});

	/**
	 * Block Lexer
	 */

	function Lexer(options) {
	  this.tokens = [];
	  this.tokens.links = {};
	  this.options = options || marked.defaults;
	  this.rules = block.normal;

	  if (this.options.gfm) {
	    if (this.options.tables) {
	      this.rules = block.tables;
	    } else {
	      this.rules = block.gfm;
	    }
	  }
	}

	/**
	 * Expose Block Rules
	 */

	Lexer.rules = block;

	/**
	 * Static Lex Method
	 */

	Lexer.lex = function(src, options) {
	  var lexer = new Lexer(options);
	  return lexer.lex(src);
	};

	/**
	 * Preprocessing
	 */

	Lexer.prototype.lex = function(src) {
	  src = src
	    .replace(/\r\n|\r/g, '\n')
	    .replace(/\t/g, '    ')
	    .replace(/\u00a0/g, ' ')
	    .replace(/\u2424/g, '\n');

	  return this.token(src, true);
	};

	/**
	 * Lexing
	 */

	Lexer.prototype.token = function(src, top, bq) {
	  var src = src.replace(/^ +$/gm, '')
	    , next
	    , loose
	    , cap
	    , bull
	    , b
	    , item
	    , space
	    , i
	    , l;

	  while (src) {
	    // newline
	    if (cap = this.rules.newline.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[0].length > 1) {
	        this.tokens.push({
	          type: 'space'
	        });
	      }
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      cap = cap[0].replace(/^ {4}/gm, '');
	      this.tokens.push({
	        type: 'code',
	        text: !this.options.pedantic
	          ? cap.replace(/\n+$/, '')
	          : cap
	      });
	      continue;
	    }

	    // fences (gfm)
	    if (cap = this.rules.fences.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'code',
	        lang: cap[2],
	        text: cap[3] || ''
	      });
	      continue;
	    }

	    // heading
	    if (cap = this.rules.heading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[1].length,
	        text: cap[2]
	      });
	      continue;
	    }

	    // table no leading pipe (gfm)
	    if (top && (cap = this.rules.nptable.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i].split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // lheading
	    if (cap = this.rules.lheading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[2] === '=' ? 1 : 2,
	        text: cap[1]
	      });
	      continue;
	    }

	    // hr
	    if (cap = this.rules.hr.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'hr'
	      });
	      continue;
	    }

	    // blockquote
	    if (cap = this.rules.blockquote.exec(src)) {
	      src = src.substring(cap[0].length);

	      this.tokens.push({
	        type: 'blockquote_start'
	      });

	      cap = cap[0].replace(/^ *> ?/gm, '');

	      // Pass `top` to keep the current
	      // "toplevel" state. This is exactly
	      // how markdown.pl works.
	      this.token(cap, top, true);

	      this.tokens.push({
	        type: 'blockquote_end'
	      });

	      continue;
	    }

	    // list
	    if (cap = this.rules.list.exec(src)) {
	      src = src.substring(cap[0].length);
	      bull = cap[2];

	      this.tokens.push({
	        type: 'list_start',
	        ordered: bull.length > 1
	      });

	      // Get each top-level item.
	      cap = cap[0].match(this.rules.item);

	      next = false;
	      l = cap.length;
	      i = 0;

	      for (; i < l; i++) {
	        item = cap[i];

	        // Remove the list item's bullet
	        // so it is seen as the next token.
	        space = item.length;
	        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

	        // Outdent whatever the
	        // list item contains. Hacky.
	        if (~item.indexOf('\n ')) {
	          space -= item.length;
	          item = !this.options.pedantic
	            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	            : item.replace(/^ {1,4}/gm, '');
	        }

	        // Determine whether the next list item belongs here.
	        // Backpedal if it does not belong in this list.
	        if (this.options.smartLists && i !== l - 1) {
	          b = block.bullet.exec(cap[i + 1])[0];
	          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	            src = cap.slice(i + 1).join('\n') + src;
	            i = l - 1;
	          }
	        }

	        // Determine whether item is loose or not.
	        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	        // for discount behavior.
	        loose = next || /\n\n(?!\s*$)/.test(item);
	        if (i !== l - 1) {
	          next = item.charAt(item.length - 1) === '\n';
	          if (!loose) loose = next;
	        }

	        this.tokens.push({
	          type: loose
	            ? 'loose_item_start'
	            : 'list_item_start'
	        });

	        // Recurse.
	        this.token(item, false, bq);

	        this.tokens.push({
	          type: 'list_item_end'
	        });
	      }

	      this.tokens.push({
	        type: 'list_end'
	      });

	      continue;
	    }

	    // html
	    if (cap = this.rules.html.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: this.options.sanitize
	          ? 'paragraph'
	          : 'html',
	        pre: !this.options.sanitizer
	          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	        text: cap[0]
	      });
	      continue;
	    }

	    // def
	    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.links[cap[1].toLowerCase()] = {
	        href: cap[2],
	        title: cap[3]
	      };
	      continue;
	    }

	    // table (gfm)
	    if (top && (cap = this.rules.table.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i]
	          .replace(/^ *\| *| *\| *$/g, '')
	          .split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // top-level paragraph
	    if (top && (cap = this.rules.paragraph.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'paragraph',
	        text: cap[1].charAt(cap[1].length - 1) === '\n'
	          ? cap[1].slice(0, -1)
	          : cap[1]
	      });
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      // Top-level should never reach here.
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'text',
	        text: cap[0]
	      });
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return this.tokens;
	};

	/**
	 * Inline-Level Grammar
	 */

	var inline = {
	  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	  url: noop,
	  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	  link: /^!?\[(inside)\]\(href\)/,
	  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	  br: /^ {2,}\n(?!\s*$)/,
	  del: noop,
	  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};

	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

	inline.link = replace(inline.link)
	  ('inside', inline._inside)
	  ('href', inline._href)
	  ();

	inline.reflink = replace(inline.reflink)
	  ('inside', inline._inside)
	  ();

	/**
	 * Normal Inline Grammar
	 */

	inline.normal = merge({}, inline);

	/**
	 * Pedantic Inline Grammar
	 */

	inline.pedantic = merge({}, inline.normal, {
	  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});

	/**
	 * GFM Inline Grammar
	 */

	inline.gfm = merge({}, inline.normal, {
	  escape: replace(inline.escape)('])', '~|])')(),
	  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	  del: /^~~(?=\S)([\s\S]*?\S)~~/,
	  text: replace(inline.text)
	    (']|', '~]|')
	    ('|', '|https?://|')
	    ()
	});

	/**
	 * GFM + Line Breaks Inline Grammar
	 */

	inline.breaks = merge({}, inline.gfm, {
	  br: replace(inline.br)('{2,}', '*')(),
	  text: replace(inline.gfm.text)('{2,}', '*')()
	});

	/**
	 * Inline Lexer & Compiler
	 */

	function InlineLexer(links, options) {
	  this.options = options || marked.defaults;
	  this.links = links;
	  this.rules = inline.normal;
	  this.renderer = this.options.renderer || new Renderer;
	  this.renderer.options = this.options;

	  if (!this.links) {
	    throw new
	      Error('Tokens array requires a `links` property.');
	  }

	  if (this.options.gfm) {
	    if (this.options.breaks) {
	      this.rules = inline.breaks;
	    } else {
	      this.rules = inline.gfm;
	    }
	  } else if (this.options.pedantic) {
	    this.rules = inline.pedantic;
	  }
	}

	/**
	 * Expose Inline Rules
	 */

	InlineLexer.rules = inline;

	/**
	 * Static Lexing/Compiling Method
	 */

	InlineLexer.output = function(src, links, options) {
	  var inline = new InlineLexer(links, options);
	  return inline.output(src);
	};

	/**
	 * Lexing/Compiling
	 */

	InlineLexer.prototype.output = function(src) {
	  var out = ''
	    , link
	    , text
	    , href
	    , cap;

	  while (src) {
	    // escape
	    if (cap = this.rules.escape.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += cap[1];
	      continue;
	    }

	    // autolink
	    if (cap = this.rules.autolink.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[2] === '@') {
	        text = cap[1].charAt(6) === ':'
	          ? this.mangle(cap[1].substring(7))
	          : this.mangle(cap[1]);
	        href = this.mangle('mailto:') + text;
	      } else {
	        text = escape(cap[1]);
	        href = text;
	      }
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // url (gfm)
	    if (!this.inLink && (cap = this.rules.url.exec(src))) {
	      src = src.substring(cap[0].length);
	      text = escape(cap[1]);
	      href = text;
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // tag
	    if (cap = this.rules.tag.exec(src)) {
	      if (!this.inLink && /^<a /i.test(cap[0])) {
	        this.inLink = true;
	      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	        this.inLink = false;
	      }
	      src = src.substring(cap[0].length);
	      out += this.options.sanitize
	        ? this.options.sanitizer
	          ? this.options.sanitizer(cap[0])
	          : escape(cap[0])
	        : cap[0]
	      continue;
	    }

	    // link
	    if (cap = this.rules.link.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.inLink = true;
	      out += this.outputLink(cap, {
	        href: cap[2],
	        title: cap[3]
	      });
	      this.inLink = false;
	      continue;
	    }

	    // reflink, nolink
	    if ((cap = this.rules.reflink.exec(src))
	        || (cap = this.rules.nolink.exec(src))) {
	      src = src.substring(cap[0].length);
	      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	      link = this.links[link.toLowerCase()];
	      if (!link || !link.href) {
	        out += cap[0].charAt(0);
	        src = cap[0].substring(1) + src;
	        continue;
	      }
	      this.inLink = true;
	      out += this.outputLink(cap, link);
	      this.inLink = false;
	      continue;
	    }

	    // strong
	    if (cap = this.rules.strong.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.strong(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // em
	    if (cap = this.rules.em.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.em(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.codespan(escape(cap[2], true));
	      continue;
	    }

	    // br
	    if (cap = this.rules.br.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.br();
	      continue;
	    }

	    // del (gfm)
	    if (cap = this.rules.del.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.del(this.output(cap[1]));
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.text(escape(this.smartypants(cap[0])));
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return out;
	};

	/**
	 * Compile Link
	 */

	InlineLexer.prototype.outputLink = function(cap, link) {
	  var href = escape(link.href)
	    , title = link.title ? escape(link.title) : null;

	  return cap[0].charAt(0) !== '!'
	    ? this.renderer.link(href, title, this.output(cap[1]))
	    : this.renderer.image(href, title, escape(cap[1]));
	};

	/**
	 * Smartypants Transformations
	 */

	InlineLexer.prototype.smartypants = function(text) {
	  if (!this.options.smartypants) return text;
	  return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	    // closing doubles
	    .replace(/"/g, '\u201d')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	};

	/**
	 * Mangle Links
	 */

	InlineLexer.prototype.mangle = function(text) {
	  if (!this.options.mangle) return text;
	  var out = ''
	    , l = text.length
	    , i = 0
	    , ch;

	  for (; i < l; i++) {
	    ch = text.charCodeAt(i);
	    if (Math.random() > 0.5) {
	      ch = 'x' + ch.toString(16);
	    }
	    out += '&#' + ch + ';';
	  }

	  return out;
	};

	/**
	 * Renderer
	 */

	function Renderer(options) {
	  this.options = options || {};
	}

	Renderer.prototype.code = function(code, lang, escaped) {
	  if (this.options.highlight) {
	    var out = this.options.highlight(code, lang);
	    if (out != null && out !== code) {
	      escaped = true;
	      code = out;
	    }
	  }

	  if (!lang) {
	    return '<pre><code>'
	      + (escaped ? code : escape(code, true))
	      + '\n</code></pre>';
	  }

	  return '<pre><code class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + (escaped ? code : escape(code, true))
	    + '\n</code></pre>\n';
	};

	Renderer.prototype.blockquote = function(quote) {
	  return '<blockquote>\n' + quote + '</blockquote>\n';
	};

	Renderer.prototype.html = function(html) {
	  return html;
	};

	Renderer.prototype.heading = function(text, level, raw) {
	  return '<h'
	    + level
	    + ' id="'
	    + this.options.headerPrefix
	    + raw.toLowerCase().replace(/[^\w]+/g, '-')
	    + '">'
	    + text
	    + '</h'
	    + level
	    + '>\n';
	};

	Renderer.prototype.hr = function() {
	  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};

	Renderer.prototype.list = function(body, ordered) {
	  var type = ordered ? 'ol' : 'ul';
	  return '<' + type + '>\n' + body + '</' + type + '>\n';
	};

	Renderer.prototype.listitem = function(text) {
	  return '<li>' + text + '</li>\n';
	};

	Renderer.prototype.paragraph = function(text) {
	  return '<p>' + text + '</p>\n';
	};

	Renderer.prototype.table = function(header, body) {
	  return '<table>\n'
	    + '<thead>\n'
	    + header
	    + '</thead>\n'
	    + '<tbody>\n'
	    + body
	    + '</tbody>\n'
	    + '</table>\n';
	};

	Renderer.prototype.tablerow = function(content) {
	  return '<tr>\n' + content + '</tr>\n';
	};

	Renderer.prototype.tablecell = function(content, flags) {
	  var type = flags.header ? 'th' : 'td';
	  var tag = flags.align
	    ? '<' + type + ' style="text-align:' + flags.align + '">'
	    : '<' + type + '>';
	  return tag + content + '</' + type + '>\n';
	};

	// span level renderer
	Renderer.prototype.strong = function(text) {
	  return '<strong>' + text + '</strong>';
	};

	Renderer.prototype.em = function(text) {
	  return '<em>' + text + '</em>';
	};

	Renderer.prototype.codespan = function(text) {
	  return '<code>' + text + '</code>';
	};

	Renderer.prototype.br = function() {
	  return this.options.xhtml ? '<br/>' : '<br>';
	};

	Renderer.prototype.del = function(text) {
	  return '<del>' + text + '</del>';
	};

	Renderer.prototype.link = function(href, title, text) {
	  if (this.options.sanitize) {
	    try {
	      var prot = decodeURIComponent(unescape(href))
	        .replace(/[^\w:]/g, '')
	        .toLowerCase();
	    } catch (e) {
	      return '';
	    }
	    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	      return '';
	    }
	  }
	  var out = '<a href="' + href + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += '>' + text + '</a>';
	  return out;
	};

	Renderer.prototype.image = function(href, title, text) {
	  var out = '<img src="' + href + '" alt="' + text + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += this.options.xhtml ? '/>' : '>';
	  return out;
	};

	Renderer.prototype.text = function(text) {
	  return text;
	};

	/**
	 * Parsing & Compiling
	 */

	function Parser(options) {
	  this.tokens = [];
	  this.token = null;
	  this.options = options || marked.defaults;
	  this.options.renderer = this.options.renderer || new Renderer;
	  this.renderer = this.options.renderer;
	  this.renderer.options = this.options;
	}

	/**
	 * Static Parse Method
	 */

	Parser.parse = function(src, options, renderer) {
	  var parser = new Parser(options, renderer);
	  return parser.parse(src);
	};

	/**
	 * Parse Loop
	 */

	Parser.prototype.parse = function(src) {
	  this.inline = new InlineLexer(src.links, this.options, this.renderer);
	  this.tokens = src.reverse();

	  var out = '';
	  while (this.next()) {
	    out += this.tok();
	  }

	  return out;
	};

	/**
	 * Next Token
	 */

	Parser.prototype.next = function() {
	  return this.token = this.tokens.pop();
	};

	/**
	 * Preview Next Token
	 */

	Parser.prototype.peek = function() {
	  return this.tokens[this.tokens.length - 1] || 0;
	};

	/**
	 * Parse Text Tokens
	 */

	Parser.prototype.parseText = function() {
	  var body = this.token.text;

	  while (this.peek().type === 'text') {
	    body += '\n' + this.next().text;
	  }

	  return this.inline.output(body);
	};

	/**
	 * Parse Current Token
	 */

	Parser.prototype.tok = function() {
	  switch (this.token.type) {
	    case 'space': {
	      return '';
	    }
	    case 'hr': {
	      return this.renderer.hr();
	    }
	    case 'heading': {
	      return this.renderer.heading(
	        this.inline.output(this.token.text),
	        this.token.depth,
	        this.token.text);
	    }
	    case 'code': {
	      return this.renderer.code(this.token.text,
	        this.token.lang,
	        this.token.escaped);
	    }
	    case 'table': {
	      var header = ''
	        , body = ''
	        , i
	        , row
	        , cell
	        , flags
	        , j;

	      // header
	      cell = '';
	      for (i = 0; i < this.token.header.length; i++) {
	        flags = { header: true, align: this.token.align[i] };
	        cell += this.renderer.tablecell(
	          this.inline.output(this.token.header[i]),
	          { header: true, align: this.token.align[i] }
	        );
	      }
	      header += this.renderer.tablerow(cell);

	      for (i = 0; i < this.token.cells.length; i++) {
	        row = this.token.cells[i];

	        cell = '';
	        for (j = 0; j < row.length; j++) {
	          cell += this.renderer.tablecell(
	            this.inline.output(row[j]),
	            { header: false, align: this.token.align[j] }
	          );
	        }

	        body += this.renderer.tablerow(cell);
	      }
	      return this.renderer.table(header, body);
	    }
	    case 'blockquote_start': {
	      var body = '';

	      while (this.next().type !== 'blockquote_end') {
	        body += this.tok();
	      }

	      return this.renderer.blockquote(body);
	    }
	    case 'list_start': {
	      var body = ''
	        , ordered = this.token.ordered;

	      while (this.next().type !== 'list_end') {
	        body += this.tok();
	      }

	      return this.renderer.list(body, ordered);
	    }
	    case 'list_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.token.type === 'text'
	          ? this.parseText()
	          : this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'loose_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'html': {
	      var html = !this.token.pre && !this.options.pedantic
	        ? this.inline.output(this.token.text)
	        : this.token.text;
	      return this.renderer.html(html);
	    }
	    case 'paragraph': {
	      return this.renderer.paragraph(this.inline.output(this.token.text));
	    }
	    case 'text': {
	      return this.renderer.paragraph(this.parseText());
	    }
	  }
	};

	/**
	 * Helpers
	 */

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	function unescape(html) {
		// explicitly match decimal, hex, and named HTML entities 
	  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
	    n = n.toLowerCase();
	    if (n === 'colon') return ':';
	    if (n.charAt(0) === '#') {
	      return n.charAt(1) === 'x'
	        ? String.fromCharCode(parseInt(n.substring(2), 16))
	        : String.fromCharCode(+n.substring(1));
	    }
	    return '';
	  });
	}

	function replace(regex, opt) {
	  regex = regex.source;
	  opt = opt || '';
	  return function self(name, val) {
	    if (!name) return new RegExp(regex, opt);
	    val = val.source || val;
	    val = val.replace(/(^|[^\[])\^/g, '$1');
	    regex = regex.replace(name, val);
	    return self;
	  };
	}

	function noop() {}
	noop.exec = noop;

	function merge(obj) {
	  var i = 1
	    , target
	    , key;

	  for (; i < arguments.length; i++) {
	    target = arguments[i];
	    for (key in target) {
	      if (Object.prototype.hasOwnProperty.call(target, key)) {
	        obj[key] = target[key];
	      }
	    }
	  }

	  return obj;
	}


	/**
	 * Marked
	 */

	function marked(src, opt, callback) {
	  if (callback || typeof opt === 'function') {
	    if (!callback) {
	      callback = opt;
	      opt = null;
	    }

	    opt = merge({}, marked.defaults, opt || {});

	    var highlight = opt.highlight
	      , tokens
	      , pending
	      , i = 0;

	    try {
	      tokens = Lexer.lex(src, opt)
	    } catch (e) {
	      return callback(e);
	    }

	    pending = tokens.length;

	    var done = function(err) {
	      if (err) {
	        opt.highlight = highlight;
	        return callback(err);
	      }

	      var out;

	      try {
	        out = Parser.parse(tokens, opt);
	      } catch (e) {
	        err = e;
	      }

	      opt.highlight = highlight;

	      return err
	        ? callback(err)
	        : callback(null, out);
	    };

	    if (!highlight || highlight.length < 3) {
	      return done();
	    }

	    delete opt.highlight;

	    if (!pending) return done();

	    for (; i < tokens.length; i++) {
	      (function(token) {
	        if (token.type !== 'code') {
	          return --pending || done();
	        }
	        return highlight(token.text, token.lang, function(err, code) {
	          if (err) return done(err);
	          if (code == null || code === token.text) {
	            return --pending || done();
	          }
	          token.text = code;
	          token.escaped = true;
	          --pending || done();
	        });
	      })(tokens[i]);
	    }

	    return;
	  }
	  try {
	    if (opt) opt = merge({}, marked.defaults, opt);
	    return Parser.parse(Lexer.lex(src, opt), opt);
	  } catch (e) {
	    e.message += '\nPlease report this to https://github.com/chjj/marked.';
	    if ((opt || marked.defaults).silent) {
	      return '<p>An error occured:</p><pre>'
	        + escape(e.message + '', true)
	        + '</pre>';
	    }
	    throw e;
	  }
	}

	/**
	 * Options
	 */

	marked.options =
	marked.setOptions = function(opt) {
	  merge(marked.defaults, opt);
	  return marked;
	};

	marked.defaults = {
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  sanitizer: null,
	  mangle: true,
	  smartLists: false,
	  silent: false,
	  highlight: null,
	  langPrefix: 'lang-',
	  smartypants: false,
	  headerPrefix: '',
	  renderer: new Renderer,
	  xhtml: false
	};

	/**
	 * Expose
	 */

	marked.Parser = Parser;
	marked.parser = Parser.parse;

	marked.Renderer = Renderer;

	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;

	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;

	marked.parse = marked;

	if (true) {
	  module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
	  define(function() { return marked; });
	} else {
	  this.marked = marked;
	}

	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var uxa$ = __webpack_require__(24), Button = uxa$.Button, IconButton = uxa$.IconButton, TextField = uxa$.TextField, ListItem = uxa$.ListItem, Menu = uxa$.Menu, MenuItem = uxa$.MenuItem, Popover = uxa$.Popover;

	var Head = _T.defineTag('Head', function(tag){
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.flag('header').flag('lg').flag('bar').flag('base-bg').flag('flat').setChildren([
				(__.A = __.A || _T.DIV(this).flag('masthead').setText("Scrimba")).end(),
				(__.B = __.B || _T.A(self).setHref("#forms").setText('forms')).end(),
				(__.C = __.C || _T.A(self).setHref("#articles").setText('articles')).end(),
				(__.D = __.D || _T.A(self).setHref("#panels").setText('panels')).end(),
				(__.E = __.E || _T.A(self).setHref("#alerts").setText('alerts')).end(),
				(__.F = __.F || _T.A(self).setHref("#buttons").setText('buttons')).end(),
				(__.G = __.G || Button.build(self).flag('primary').setHandler('tap','showCreate',self).setLabel('create')).end(),
				(self._avatar || Button.build(self).ref_('avatar',self).flag('primary').setHandler('tap','menu',self).setLabel('profile')).end(),
				(__.H = __.H || IconButton.build(self).flag('primary').setHandler('tap','showMenu2',self).setIcon(':').setUxaAnchor([1,1,1,1])).end()
			],2).synced();
		};
		
		tag.prototype.menu = function (){
			this.log("tap menu!",this);
			this._avatar.uxa().open(Popover.build(this).flag('list').flag('inset').setContent([
				ListItem.build(this).flag('header').setLabel('Sindre Aarsaether').setSubtext('hello@scrimba.com').end(),
				ListItem.build(this).setLabel('Profile photo').setSubtext('Change your profile photo').end(),
				ListItem.build(this).setLabel('Sign out').end(),
				_T.HR(this).flag('sm').end(),
				
				Menu.build(this).flag('inset').setContent([
					MenuItem.build(this).setIcon('w').setLabel('Open').end(),
					MenuItem.build(this).setIcon('v').setLabel('Paste in place').end(),
					MenuItem.build(this).setIcon('v').setLabel('Research').end(),
					MenuItem.build(this).setIcon('.').setLabel('Go to site...').end(),
					_T.HR(this).flag('sm').end(),
					MenuItem.build(this).setIcon('>').setLabel('Home').end(),
					MenuItem.build(this).setIcon('>').setLabel('Back').end(),
					MenuItem.build(this).setIcon('>').setLabel('Sign out').setDisabled(true).end()
				],2).end()
			
			// <Button label="My channel">
			// <Button label="Sign out">
			// <Button label="Settings">
			// <Button label="Help">
			// <hr>
			// <Button label="Come back">
			],2).end());
			return this;
		};
		
		tag.prototype.showMenu2 = function (e){
			return e.target().uxa().open(Menu.build(this).flag('inset').flag('paper').setContent([
				MenuItem.build(this).setIcon('w').setLabel('Open').end(),
				MenuItem.build(this).setIcon('v').setLabel('Paste in place').end(),
				MenuItem.build(this).setIcon('v').setLabel('Research').end(),
				MenuItem.build(this).setLabel('Go to site...').end(),
				_T.HR(this).flag('sm').end(),
				MenuItem.build(this).setIcon('>').setLabel('Home').end(),
				MenuItem.build(this).setIcon('>').setLabel('Back').end(),
				MenuItem.build(this).setIcon('>').setLabel('Sign out').setDisabled(true).end()
			],2).end());
		};
		
		tag.prototype.showCreate = function (e){
			return e.target().uxa().open(_T.DIV(this).flag('dialog').setContent([
				_T.SECTION(this).setContent([
					_T.H2(this).setText("Create new screencast").end(),
					_T.HR(this).end(),
					TextField.build(this).setLabel('Title').end(),
					TextField.build(this).setLabel('Last name').end()
				],2).end(),
				
				_T.FOOTER(this).flag('flat').setContent([
					Button.build(this).flag('muted').setLabel("dismiss").setIcon('x').end(),
					Button.build(this).flag('primary').setLabel("archive").setIcon('v').end()
				],2).end()
			],2).end());
		};
	})
	exports.Head = Head;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var Nav = _T.defineTag('Nav', function(tag){
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				(__.A = __.A || _T.HEADER(this).flag('lg').setText("scrimba")).end(),
				(__.B = __.B || _T.H2(self).setText("Hello there")).end()
			],2).synced();
		};
	})
	exports.Nav = Nav;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var mdart = __webpack_require__(27);

	var uxa$ = __webpack_require__(24), Button = uxa$.Button, TextField = uxa$.TextField;

	var Home = _T.defineTag('Home', function(tag){
		
		tag.prototype.render = function (){
			var self = this, __ = self.__;
			return this.setChildren([
				(__.A = __.A || _T.DIV(this).flag('section')).setMarkdown(mdart).end(),
				(__.B = __.B || TextField.build(self).setLabel("Something").setPlaceholder("Nothing to see")).end()
			],2).synced();
		};
	})
	exports.Home = Home;


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "# What is Imba?\nImba is a programming language for the web that compiles to performant and readable JavaScript. It is specifically designed to improve the way we create rich site and applications. It has language level support for defining, extending, subclassing, instantiating and rendering dom nodes. For a semi-complex application like TodoMVC, it is more than 10 times faster than React with less code, and a much smaller library.\n\n## Developers\nRather than being an academic exercise, Imba has been developed over several years, alongside actual applications. Imba has been fine-tuned to ease the challenges we face when developing rich, dynamic apps (and sites).\n\n## Interoperability\nImba compiles down to clean and readable JavaScript. Your formatting, indentaiton, and comments are included. You can use any existing JavaScript library seamlessly from Imba, and vica-versa.\n\n## Speed\nYou can use all the syntactic sugar in Imba without needing to worry about the performance and readability of the compiled code, and building your views using Imba's native support for tags results in unprecedented performance. \n\n## Performance\nRendering views using Imba's language level support for tags compiles to *extremely* performant code. In pure synchronous rendering of an application like TodoMVC, Imba beats all existing implementations by an **order of magnitude**."

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	function len$(a){
		return a && (a.len instanceof Function ? a.len() : a.length) || 0;
	};

	var Icon = _T.defineTag('Icon', 'i', function(tag){
		tag.prototype.__data = {watch: 'dataDidSet',name: 'data'};
		tag.prototype.data = function(v){ return this._data; }
		tag.prototype.setData = function(v){
			var a = this.data();
			if(v != a) { this._data = v; }
			if(v != a) { this.dataDidSet && this.dataDidSet(v,a,this.__data) }
			return this;
		};
		
		tag.prototype.dataDidSet = function (icon){
			console.log("Icon#dataDidSet",icon);
			if ((typeof icon=='string'||icon instanceof String) && len$(icon) == 1 && "xwvo*-=+><:.^".indexOf(icon) >= 0) {
				return (this.setText(icon),icon);
			};
		};
		
		// def build
		//	<self> <i>
	})
	exports.Icon = Icon;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var Popover = _T.defineTag('Popover')
	exports.Popover = Popover;


/***/ }
/******/ ]);