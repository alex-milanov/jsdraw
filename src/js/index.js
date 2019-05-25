'use strict';

const Rx = require('rx');
const $ = Rx.Observable;

// util
const vdom = require('./util/vdom');

// const Element from './gui/element';
// const View = require('./jsd/view');
const canvasService = require('./services/canvas');

// const view = new View(".viewport .view", context);
// const toolbox = new Element(".toolbox", context);

const actions = require('./actions');
const ui = require('./ui');

// reduce actions to state
const state$ = actions.stream
	.scan((state, reducer) => reducer(state), {})
	.map(state => (console.log(state), state));

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));

// patch stream to dom
vdom.patchStream(ui$, '.gui');


const mapEventType = type => ev => ({ev, type});
const fromDomEvent = (dom, type) => $.fromEvent(dom, type).map(mapEventType(type));

const mouseDown$ = fromDomEvent(document, 'mousedown');
const mouseMove$ = fromDomEvent(document, 'mousemove');
const mouseUp$ = fromDomEvent(document, 'mouseup');
const mouseLeave$ = fromDomEvent(document, 'mouseleave');

const drawEvent$ = $.merge(mouseDown$, mouseMove$, mouseUp$, mouseLeave$)
	.filter(({ev, type}) => ev.target === document.querySelector('.viewport'))
	.subscribe(({ev, type}) => console.log(ev, type));

// state$.first().subscribe(state => canvasService.init({dom: '.viewport .view', actions, state$, state}));

// state$.map(state => canvasService.refresh({dom: '.viewport .view', state, actions})).subscribe();

window.actions = actions;

// const presets = {
// 	brushSize: document.querySelector("#brush-size"),
// 	brushSizeValue: document.querySelector("#brush-size-value")
// }
//
// presets.brushSize.value = context.brush.size;
// presets.brushSizeValue.textContent = context.brush.size;
//
// view.init();
// toolbox.init();
//
// document.querySelector("#color-fg").addEventListener('change', ev => {
// 	context.colors.fg = ev.target.value;
// })

//
// const brushSizeChange$ = $.merge(
// 	$.fromEvent(presets.brushSize, 'change').map(ev => ev.target.value),
// 	$.fromEvent(document, 'keypress')
// 		.filter(ev => ['[', ']'].indexOf(ev.key) > -1)
// 		.map(ev => (ev.key === '[') ? context.brush.size - 1 : context.brush.size + 1)
// )
// 	.filter(value => value > 0 && value <= 100);

// brushSizeChange$.subscribe(value => {
// 	context.brush.size = value;
// 	presets.brushSizeValue.textContent = value;
// 	presets.brushSize.value = value;
// })
