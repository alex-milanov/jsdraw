'use strict';

import jQuery from 'jquery';
import Element from './gui/element';
import View from './jsd/view';

var context = {
	params: {
		tool: "pencil"
	},
	colors: {
		fg: "#000000",
		bg: "#ffffff"
	},
	brush: {
		size: 1
	},
	dimentions: {
		width: 640,
		height: 480
	}
}

const view = new View(".viewport .view", context);
const toolbox = new Element(".toolbox", context);

jQuery(document).ready(function(){
	view.init();
	toolbox.init();

	jQuery("#canvas-width").change(function(){
		context.dimentions.width = jQuery(this).val();
	})

	jQuery("#canvas-height").change(function(){
		context.dimentions.height = jQuery(this).val();
	})

	jQuery("#color-fg").change(function(){
		context.colors.fg = jQuery(this).val();
	})

	jQuery("#brush-size").change(function(){
		context.brush.size = jQuery(this).val();
	})

});
