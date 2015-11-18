

if(typeof gui === "undefined"){ var gui = {}; }


gui.Element = function(dom, context){

	this.dom = $(dom);
	this.context = (typeof context === 'undefined') ? this : context ;

};

gui.Element.prototype.init = function(){

	var context = this.context;

	$(this.dom).on("click","a[class*='-toggle']",function(){
		$(this).toggleClass("toggled");
		var $toggleRef = $($(this).data("toggle-ref"));
		var _toggleClass = $(this).data("toggle-class");
		var _toggleParam = $(this).data("toggle-param");
		$toggleRef.toggleClass(_toggleClass);
		if(_toggleParam !== ""){
			context.params[_toggleParam] = !context.params[_toggleParam];
		}
	});

	$(this.dom).on("click","a[class*='-trigger']",function(){
		var _triggerMethod = $(this).data("trigger-method");
		if(typeof context[_triggerMethod] !== "undefined"){
			if($(this).data("trigger-id")){
				context[_triggerMethod]($(this).data("trigger-id"));
			}
			context[_triggerMethod]();
		}
	});


	$(this.dom).on("click","a[class*='-option']",function(_ev){
		$("a[class*='-option']").removeClass("selected");
		$(this).addClass("selected");

		var _optionParam = $(this).data("option-param");
		var _optionValue = $(this).data("option-value");

		context.params[_optionParam] = _optionValue;
	});


};