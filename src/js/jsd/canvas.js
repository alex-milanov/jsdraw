
if(typeof jsd === "undefined"){ jsd = {}; }


jsd.Canvas = function(dom, context){
	gui.Element.call(this, dom, context);

	this.context = context;

	this.canvas = $(dom)[0];
	this.ctx = this.canvas.getContext("2d");

	this.paths = [];
	this.currentPath = [];

};

jsd.Canvas.prototype = Object.create( gui.Element );
jsd.Canvas.prototype.constructor = jsd.Canvas;

jsd.Canvas.prototype.init = function(){
	gui.Element.prototype.init.call(this);

	$(this.canvas).width(this.context.dimentions.width || 640);
	$(this.canvas).width(this.context.dimentions.height || 480);

	var painting = false;
	var self = this;
	$(this._dom).mousedown(function(e){
		self.currentPath = [];
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
			
		painting = true;
		self.currentPath.push([e.offsetX, e.offsetY]);
	});

	$(this._dom).mousemove(function(e){
		if(painting){
			self.currentPath.push([e.offsetX, e.offsetY]);
		}
	});

	$(this._dom).mouseup(function(e){
		painting = false;
		self.paths.push({
			points: self.currentPath,
			color: self.context.colors.fg || "#000000",
			brush: _.clone(self.context.brush)
		});
		self.currentPath = [];
	});

	$(this._dom).mouseleave(function(e){
		painting = false;
	});

	
	this.refresh();

}

jsd.Canvas.prototype.refresh = function(){

	var self = this;

	$(this.canvas).width(this.context.dimentions.width || 640);
	$(this.canvas).width(this.context.dimentions.height || 480);

	this.canvas.width = $(this.canvas).width();
	this.canvas.height = $(this.canvas).height();

	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas
	
	this.ctx.lineJoin = "round";

	function drawPath(path){
		console.log(path);
		self.ctx.strokeStyle = path.color;
		self.ctx.lineWidth = path.brush.size;
		self.ctx.beginPath();
		path.points.forEach(function(point, index){
			if(index == 0)
				return;
			self.ctx.moveTo(path.points[index-1][0],path.points[index-1][1]);
			self.ctx.lineTo(point[0], point[1]);
			self.ctx.closePath();
			self.ctx.stroke();
		})
	}

	this.paths.forEach(drawPath)

	if(this.currentPath.length>0)
		drawPath({points:this.currentPath,color: this.context.colors.fg, brush: _.clone(this.context.brush)});

	setTimeout( function(){
		self.refresh();
	},100);


}