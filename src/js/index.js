'use strict';

import {Observable as $} from 'rx-lite';

import Element from './gui/element';
import View from './jsd/view';

let context = {
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

const presets = {
	brushSize: document.querySelector("#brush-size"),
	brushSizeValue: document.querySelector("#brush-size-value")
}

presets.brushSize.value = context.brush.size;
presets.brushSizeValue.textContent = context.brush.size;

view.init();
toolbox.init();

document.querySelector("#color-fg").addEventListener('change', ev => {
	context.colors.fg = ev.target.value;
})


const brushSizeChange$ = $.merge(
	$.fromEvent(presets.brushSize, 'change').map(ev => ev.target.value),
	$.fromEvent(document, 'keypress')
		.filter(ev => ['[', ']'].indexOf(ev.key) > -1)
		.map(ev => (ev.key === '[') ? context.brush.size - 1 : context.brush.size + 1)
)
	.filter(value => value > 0 && value <= 100);

brushSizeChange$.subscribe(value => {
	context.brush.size = value;
	presets.brushSizeValue.textContent = value;
	presets.brushSize.value = value;
})
