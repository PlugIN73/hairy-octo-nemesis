	function IndicatorNumber(name, param) {
		IndicatorNumber.superclass.constructor.call(this, name, param);
		this.param = param;
		this.attr = null;
		if (param != null)
			this.attr = param.attr;
	}
	extend(IndicatorNumber, Control)
	
	IndicatorNumber.prototype.setMap = function (map) {
		IndicatorNumber.superclass.setMap.call(this, map);
		map.addListener('state_change', this, function() {
			var cond = this.param.cond;
			var t = map.state;
			if (eval(cond))
				this.setNumber(eval(this.param.val), this.param.int, this.param.fract);
			else
				this.render.hide();
		})
	}
		
	IndicatorNumber.prototype.setNumber = function (number, int, fract) {
		this.render.number(number, int, fract);
	}
	
	IndicatorNumber.prototype.draw = function () {
		this.renderControl.hide();
		this.render.renderNumber(this.map, this.attr);
	}