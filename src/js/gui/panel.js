"use strict";

if(typeof gui === "undefined"){ gui = {}; }

gui.Panel = function(dom, context){
	gui.Element.call(this, dom, context);
};

gui.Panel.prototype = Object.create( gui.Element );
gui.Panel.prototype.constructor = gui.Panel;

gui.Panel.prototype.init = function(){
	gui.Element.prototype.init.call(this);
};

gui.Panel.prototype.refresh = function(){
	
	var context = this._context;

};