function ButtonBox(name, param) {
	ButtonBox.superclass.constructor.call(this, name, param);
	this.param = param;
}
extend(ButtonBox, Button);

ButtonBox.prototype.setRender = function(render) {
	ButtonBox.superclass.setRender.call(this, render);
}

ButtonBox.prototype.setMap = function (map) {
	ButtonBox.superclass.setMap.call(this, map);
	
	var b = this.box();
	var area = {shape: "circle", coords: (b.x + b.width/2)  + "," + (b.y + b.height/2) + ",5"}
	if (this.param.top) {
		area.coords = (b.x + b.width/2)  + "," + b.y + ",5";
	}
	this.renderDiode = new Render(area, this);
	this.renderDiode.getNode(map);
	
	map.addListener('state_change', this, function() {
		var t = map.state;
		m = eval(this.param.on);
		this.setLight(m);
	})
}

ButtonBox.prototype.setLight = function (on) {
	this.light = on;
	if(on)
		this.renderDiode.lightOn();
	else
		this.renderDiode.lightOff();
}