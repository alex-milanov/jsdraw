'use strict';

class Path {
  constructor({color, brush, lineJoin}){
    this.color = color;
    this.brush = brush;
    this.lineJoin = lineJoin;
    this.points = [];
    this.path2d = new Path2D();
  }
  moveTo(x, y){
    this.path2d.moveTo(x, y);
    this.points.push([x, y]);
  }
  lineTo(x, y){
    this.path2d.lineTo(x, y);
    this.points.push([x, y]);
  }
  drawOn(ctx){
    ctx.lineJoin = this.lineJoin;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.brush.size;
    ctx.stroke(this.path2d);
  }
};

export default Path;
