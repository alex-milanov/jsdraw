"use strict";

var context = {
	params: {
		mode: "pencil"	
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

var view = new jsd.View(".viewport .view", context);

$(document).ready(function(){
	view.init();

	$("#canvas-width").change(function(){
		context.dimentions.width = $(this).val();
	})

	$("#canvas-height").change(function(){
		context.dimentions.height = $(this).val();
	})

	$("#color-fg").change(function(){
		context.colors.fg = $(this).val();
	})

	$("#brush-size").change(function(){
		context.brush.size = $(this).val();
	})

})