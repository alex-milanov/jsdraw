'use strict';

import jQuery from 'jquery';
import _ from 'lodash';
import gui from '../gui';

var View = function(dom, context){
	gui.Element.call(this, dom, context);

	this.context = context;

	this.layers = [];
	this.focusedLayer = null;

	this.newLayer();

};

View.prototype = Object.create( gui.Element );
View.prototype.constructor = View;

View.prototype.newLayer = function(duplocate){
	var canvas = document.createElement('canvas');
	canvas.zIndex = 100 + this.layers.length;
	var layer = {
		name:  "Layer "+this.layers.length,
		canvas: canvas,
		paths: []
	}
	this.layers.push(layer);
	this.focusedLayer = this.layers.length-1;
	jQuery(this.dom)[0].appendChild(canvas);
}

View.prototype.init = function(){
	gui.Element.prototype.init.call(this);

	jQuery(this.view).width(this.context.dimentions.width || 640);
	jQuery(this.view).width(this.context.dimentions.height || 480);

	var painting = false;
	var scope = this;

	var currentPath = [];
	var ctx = null

	jQuery(this.dom).mousedown(function(e){
		currentPath = [];
		painting = true;

		var layer = scope.layers[0];

		ctx = layer.canvas.getContext("2d");
		ctx.lineJoin = "round";
		ctx.strokeStyle = scope.context.colors.fg || "#000000",
		ctx.lineWidth = scope.context.brush.size;
		/*ctx.shadowBlur = 1;
		ctx.shadowColor = 'rgb(0, 0, 0)';*/
		ctx.beginPath();
		ctx.moveTo(e.offsetX, e.offsetY);
		currentPath.push([e.offsetX, e.offsetY]);
	});

	jQuery(this.dom).mousemove(function(e){
		if(painting){
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
			currentPath.push([e.offsetX, e.offsetY]);
		}
	});

	jQuery(this.dom).mouseup(function(e){
		ctx.closePath();
		ctx = null;
		painting = false;
		console.log(scope.layers);
		scope.layers[scope.focusedLayer].paths.push({
			points: currentPath,
			color: scope.context.colors.fg || "#000000",
			brush: _.clone(scope.context.brush)
		});
		currentPath = [];
		scope.refresh();
	});

	jQuery(this._dom).mouseleave(function(e){
		painting = false;
	});


	this.refresh();

}

View.prototype.refresh = function(){

	var scope = this;

	jQuery(this.dom).width(this.context.dimentions.width || 640);
	jQuery(this.dom).height(this.context.dimentions.height || 480);

	function drawPath(ctx, path){
		ctx.lineJoin = "round";
		ctx.strokeStyle = path.color;
		ctx.lineWidth = path.brush.size;
		/*ctx.shadowBlur = 1;
		ctx.shadowColor = 'rgb(0, 0, 0)';*/

		ctx.beginPath();
		ctx.moveTo(path.points[0][0],path.points[0][1]);
		path.points.forEach(function(point, index){
			if(index == 0)
				return;
			ctx.lineTo(point[0], point[1]);
		})
		ctx.stroke();
		ctx.closePath();
	}

	this.layers.forEach(function(layer){
		layer.canvas.width = jQuery(scope.dom).width();
		layer.canvas.height = jQuery(scope.dom).height();
		var ctx = layer.canvas.getContext("2d");
		ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height); // Clears the canvas
		layer.paths.forEach(function(path){
			drawPath(ctx, path);
		})
	})
}

export default View;
