'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Path = require('../gfx/path');

const mapEventType = type => ev => ({ev, type});
const fromDomEvent = (dom, type) => $.fromEvent(dom, type).map(mapEventType(type));

const init = ({dom, state$, actions}) => {

  const mouseDown$ = fromDomEvent(document, 'mousedown');
  const mouseMove$ = fromDomEvent(document, 'mousemove');
  const mouseUp$ = fromDomEvent(document, 'mouseup');
  const mouseLeave$ = fromDomEvent(document, 'mouseleave');

	let painting = false;
	let currentPath = null;
	let ctx = null;

  const mouseEvent$ = $.merge(mouseDown$, mouseMove$, mouseUp$, mouseLeave$)
    .withLatestFrom(state$, ({type, ev}, state) => {
      console.log(ev);
      if(ev.target !== document.querySelector(dom))
        return;
      dom = ev.target;
      console.log(type, ev);
      switch (type) {
        case 'mousedown':
          currentPath = new Path({
            lineJoin: 'round',
            brush: Object.assign({},state.brush),
            color: state.color.fg || '#000000'
          });

          painting = true;
          ctx = dom.querySelector('.interaction').getContext('2d');
          ctx.canvas.width = dom.clientWidth;
          ctx.canvas.height = dom.clientHeight;
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
          actions.addPath(state.focusedLayer, Object.create(currentPath))
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
    });

  mouseEvent$.subscribe();
}

const refresh = ({dom, state, actions}) => {
  dom = document.querySelector(dom);

  state.layers.forEach((layer, index) => {
    const canvas = dom.querySelector('.layers > #layer-' + index);
    canvas.width = dom.clientWidth;
    canvas.height = dom.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
    layer.paths.forEach(path => path.drawOn(ctx));
  })
}

module.exports = {
  init,
  refresh
}
