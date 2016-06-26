'use strict';

import {Observable as $} from 'rx-lite';
import Element from './element';

var Toolbar = function(dom, context){
	Element.call(this, dom, context);
};

Toolbar.prototype = Object.create( Element.prototype );
Toolbar.prototype.constructor = Toolbar;

Toolbar.prototype.init = function(){
	Element.prototype.init.call(this);
	//jQuery(this.dom).find(".pane-body").perfectScrollbar();
};

Toolbar.prototype.refresh = function(){

	let context = this.context;
	let dom = this.dom;

	//jQuery(this.dom).find(".pane-body").perfectScrollbar('update');
};

export default Toolbar;
