"use strict";

if(typeof gui === "undefined"){ gui = {}; }

gui.Toolbar = function(dom, context){
	gui.Element.call(this, dom, context);
};

gui.Toolbar.prototype = Object.create( gui.Element );
gui.Toolbar.prototype.constructor = gui.Toolbar;

gui.Toolbar.prototype.init = function(){
	
	gui.Element.prototype.init.call(this);
	
	var context = this._context;
};

gui.Toolbar.prototype.refresh = function(){
	
};