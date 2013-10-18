	function IndicatorDiodeOpacity(name, func_state) {
		IndicatorDiodeOpacity.superclass.constructor.call(this, name);
		this.func_state = func_state;
	}
	extend(IndicatorDiodeOpacity, Control)
	
	IndicatorDiodeOpacity.prototype.setMap = function (map) {
		IndicatorDiodeOpacity.superclass.setMap.call(this, map);
		map.addListener('state_change', this, function() {
			m = this.func_state(map.state, this.name);
			this.setLight(m);
		})
	}
		
	IndicatorDiodeOpacity.prototype.setLight = function (on) {
		this.light = on;
		if(on)
			this.render.lightOnOpacity('0.4');
		else
			this.render.lightOff();
	}