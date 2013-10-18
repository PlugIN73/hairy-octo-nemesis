	function Control(name, param){
		Control.superclass.constructor.call(this, name, param);
	}
	extend(Control, Logic);
	
	Control.prototype.haveArea = function () {
		return true;
	}
	
	Control.prototype.setRender = function(render) {
		this.render = render;
		this.renderControl = jQuery.extend(true, {}, render);
	}
	
	Control.prototype.draw = function () {
		this.renderControl.hide();
		this.render.render(this.map);
		this.render.show();
	}
	
	Control.prototype.drawControl = function () {
		this.render.hide();
		this.renderControl.renderControl(this.map);
		this.renderControl.show();
	}
	
	Control.prototype.box = function () {
		return this.renderControl.getNode(this.map).getBBox();
	}
	
	Control.prototype.action = function () {}