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

view.init();
toolbox.init();

document.querySelector("#color-fg").addEventListener('change', ev => {
	context.colors.fg = ev.target.value;
})

document.querySelector("#brush-size").addEventListener('change', ev => {
	context.brush.size = ev.target.value;
})
