
if(typeof jsd === "undefined"){ jsd = {}; }


jsd.Canvas = function(dom, context){
	gui.Element.call(this, dom, context);

	this.canvas = $(dom)[0];
	this.ctx = this.canvas.getContext("2d");

	this.paths = [];
	this.currentPath = [];

};

jsd.Canvas.prototype = Object.create( gui.Element );
jsd.Canvas.prototype.constructor = jsd.Canvas;

jsd.Canvas.prototype.init = function(){
	gui.Element.prototype.init.call(this);

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
		self.paths.push(self.currentPath);
		self.currentPath = [];
	});

	$(this._dom).mouseleave(function(e){
		painting = false;
	});

	
	this.refresh();

}

jsd.Canvas.prototype.refresh = function(){

	var self = this;


	this.canvas.width = $(this.canvas).width();
	this.canvas.height = $(this.canvas).height();

	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Clears the canvas
	
	this.ctx.strokeStyle = "#df4b26";
	this.ctx.lineJoin = "round";

	function drawPath(path){
		self.ctx.beginPath();
		path.forEach(function(point, index){
			if(index == 0)
				return;
			self.ctx.moveTo(path[index-1][0],path[index-1][1]);
			self.ctx.lineTo(point[0], point[1]);
			self.ctx.closePath();
			self.ctx.stroke();
		})
	}

	this.paths.forEach(drawPath)

	drawPath(this.currentPath);

	setTimeout( function(){
		self.refresh();
	},100);


}