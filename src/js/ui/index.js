'use strict';

const {div, span, h1, header, i, button, input, canvas} = require('../util/vdom');

const tools = [
  {
    cls: '.fa.fa-hand-paper-o',
    name: 'move',
    key: 'v'
  },
  {
    cls: '.fa.fa-pencil',
    name: 'brush',
    key: 'b'
  },
  {
    cls: '.fa.fa-eraser',
    name: 'eraser',
    key: 'e'
  },
  {
    cls: '.fa.fa-fire-extinguisher',
    name: 'bucket',
    key: 'g'
  }
];

module.exports = ({state, actions}) => div('.gui', [
  div('.header', [
    div('.toolbox', tools.map(tool =>
      button(tool.cls, {
        class: {
          selected: (tool.name === state.tool)
        },
        on: {
          click: ev => actions.change('tool', tool.name)
        }
      }))),
    h1('.logo', [
      i('.fa.fa-paint-brush'),
      span('JSDraw')
    ]),
    div('.presets', [
      input('#brush-size', {
        props: {type: 'range', step: 1, min: 0, max: 100, value: state.brush.size},
        on: {change: ev => actions.change('brush-size', ev.target.value)}
      }),
      span('#brush-size-value', state.brush.size),
      div('.color-preset', [
        input('#color-fg', {
          props: {type: 'color', value: state.color.fg},
          on: {change: ev => actions.change('color-fg', ev.target.value)}
        }),
        input('#color-bg', {
          props: {type: 'color', value: state.color.bg},
          on: {change: ev => actions.change('color-bg', ev.target.value)}
        })
      ])
    ])
  ]),
  div('.viewport', [
    div('.view', [
      div('.layers', state.layers.map((layer, index) =>
        canvas(`#layer-${index}`, {style: {zIndex: (100 + index)}})
      )),
      canvas('.interaction')
    ])
  ])
]);
