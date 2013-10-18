function IndicatorText(name, param) {
	IndicatorNumber.superclass.constructor.call(this, name, param);
	this.param = param;
}
extend(IndicatorText, Control)

IndicatorText.prototype.setMap = function (map) {
	IndicatorNumber.superclass.setMap.call(this, map);
	map.addListener('state_change', this, function() {
		var cond = this.param.cond;
		var t = map.state;
		if (eval(cond))
			this.setText(eval(this.param.val));
		else
			this.render.hide();
	})
}
	
IndicatorText.prototype.setText = function (text) {
	this.render.text(text);
}

IndicatorText.prototype.draw = function () {
	this.renderControl.hide();
	this.render.renderText(this.map);
	if (this.param.attr) this.render.node.attr(this.param.attr);
}