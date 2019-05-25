'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

// util
// const {assignPropVal} = require('../util/data');

const switchFn = (value, options) => options[value] || options['default'] || false;

const stream = new Subject();

const init = () => stream.onNext(state => ({
  	tool: "brush",
  	color: {
  		fg: "#000000",
  		bg: "#ffffff"
  	},
  	brush: {
  		size: 10
  	},
  	dimentions: {
  		width: 640,
  		height: 480
  	},
    layers: [{
      name: 'Background',
      paths: []
    }],
    focusedLayer: 0
}));

const change = (prop, value) => stream.onNext(state =>
  Object.assign({}, state, switchFn(prop, {
    'tool': {tool: value},
    'brush-size': {brush: {size: value}},
    'color-fg': {color: Object.assign({}, state.color, {fg: value})},
    'color-bg': {color: Object.assign({}, state.color, {bg: value})},
    'default': {}
  })));

const addPath = (index, path) => stream.onNext(state =>
  Object.assign({}, state, {
    layers: [].concat(
      state.layers.slice(0, index),
      [Object.assign({}, state.layers[index], {paths: [].concat(state.layers[index].paths, [path])})],
      state.layers.slice(index + 1)
    )
  })
)

module.exports = {
	stream,
	init,
  change
};
