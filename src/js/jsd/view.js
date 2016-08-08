'use strict';

import {Observable as $} from 'rx-lite';
import gui from '../gui';
import Path from '../gfx/path';

class View extends gui.Element {
	constructor(dom, context) {
		super(dom, context);
		this.context = context;
		this.layers = [];
		this.focusedLayer = null;
		this.newLayer();
	}
	newLayer() {
		const canvas = document.createElement('canvas');
		canvas.zIndex = 100 + this.layers.length;
		const layer = {
			name:  "Layer " + this.layers.length,
			canvas: canvas,
			paths: []
		};
		this.layers.push(layer);
		this.focusedLayer = this.layers.length - 1;
		this.dom.querySelector('.layers').appendChild(canvas);
	}
	init() {
		super.init();

		let painting = false;
		let currentPath = null;
		let ctx = null;

		const mapEventType = type => ev => ({ev, type});
		const fromDomEvent = (dom, type) => $.fromEvent(dom, type).map(mapEventType(type));

		const mouseDown$ = fromDomEvent(this.dom, 'mousedown');
		const mouseMove$ = fromDomEvent(this.dom, 'mousemove');
		const mouseUp$ = fromDomEvent(this.dom, 'mouseup');
		const mouseLeave$ = fromDomEvent(this.dom, 'mouseleave');

		const mouseEvent$ = $.merge(
			mouseDown$, mouseMove$, mouseUp$, mouseLeave$
		)
			.map(({type, ev}) => {
				switch (type) {
					case 'mousedown':
						currentPath = new Path({
							lineJoin: 'round',
							brush: Object.assign({},this.context.brush),
							color: this.context.colors.fg || '#000000'
						});

						painting = true;
						ctx = this.dom.querySelector('.interaction').getContext('2d');
						ctx.canvas.width = this.dom.clientWidth;
						ctx.canvas.height = this.dom.clientHeight;
						// ctx.shadowBlur = 1;
						// ctx.shadowColor = 'rclientWidthgb(0, 0, 0)';

						currentPath.moveTo(ev.offsetX, ev.offsetY);
						break;
					case 'mousemove':
						if(painting){
							ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
							currentPath.lineTo(ev.offsetX, ev.offsetY);
							currentPath.drawOn(ctx);
						}
						break;
					case 'mouseup':
						// currentPath.path2d.closePath();
						this.layers[this.focusedLayer].paths.push(Object.create(currentPath));
						ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
						ctx = null;
						painting = false;
						currentPath = null;
						this.refresh();
						break;
					case 'mouseleave':
						painting = false;
						break;
					default:
						break;
				}
			}
		);

		mouseEvent$.subscribe();

		this.refresh();
	}
	refresh() {
		this.layers.forEach((layer) => {
			layer.canvas.width = this.dom.clientWidth;
			layer.canvas.height = this.dom.clientHeight;
			const ctx = layer.canvas.getContext("2d");
			ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height); // Clears the canvas
			layer.paths.forEach(path => path.drawOn(ctx));
		})
	}
}

export default View;
