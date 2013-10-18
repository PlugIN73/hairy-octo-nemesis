function ButtonFlag(name, param) {
	ButtonBox.superclass.constructor.call(this, name, param);
	this.param = param;
}
extend(ButtonFlag, Button);

ButtonFlag.prototype.setRender = function(render) {
	ButtonFlag.superclass.setRender.call(this, render);
}

ButtonFlag.prototype.setMap = function (map) {
	ButtonBox.superclass.setMap.call(this, map);
		
	map.addListener('state_change', this, function() {
		var t = map.state;
		m = eval(this.param.on);
		this.setLight(m);
	})
}

ButtonFlag.prototype.setLight = function (on) {
	this.light = on;
	if(on)
		this.render.lightOnOpacity(0.5);
	else
		this.render.lightOff();
}