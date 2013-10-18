function IndicatorDiode(name, func_state) {
	IndicatorDiode.superclass.constructor.call(this, name);
	this.func_state = func_state;
}
extend(IndicatorDiode, Control)

IndicatorDiode.prototype.setMap = function (map) {
	IndicatorDiode.superclass.setMap.call(this, map);
	map.addListener('state_change', this, function() {
		m = this.func_state(map.state, this.name);
		this.setLight(m);
	})
}
	
IndicatorDiode.prototype.setLight = function (on) {
	this.light = on;
	if(on)
		this.render.lightOn();
	else
		this.render.lightOff();
}