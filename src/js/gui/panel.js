'use strict';

import {Observable as $} from 'rx-lite';
import Element from './element';

var Panel = function(dom, context){
	Element.call(this, dom, context);
};

Panel.prototype = Object.create( Element.prototype );
Panel.prototype.constructor = Panel;

Panel.prototype.init = function(){
	Element.prototype.init.call(this);
	//jQuery(this.dom).find(".pane-body").perfectScrollbar();
};

Panel.prototype.refresh = function(){

	let context = this.context;
	let dom = this.dom;

	//jQuery(this.dom).find(".pane-body").perfectScrollbar('update');
};

export default Panel;
