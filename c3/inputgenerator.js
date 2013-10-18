C3.InputGenerator = function (name, param) {
	C3.InputGenerator.superclass.constructor.call(this, name, param);
}

extend(C3.InputGenerator, Logic);

C3.InputGenerator.prototype.action = function (d, s, control) {
	var g = this;
	if (control.name == 'inputA') {
		if (!s.inputA) {
			var v = g.param();
			if (v == null)	return;
			d.signalAbuf = {freq: v.freq, period: 1 / v.freq, v: v.v, duration: v.t, sin: v.sin, offset: v.offset};
			
			var fail = false;
			fail = fail || v.v > 10000;
			if (fail) 
				this.map.action(this, 'fatal', 'Напряжение больше 10 вольт по входу A');
			else
				d.inputA = !s.inputA;
		} else  {
			d.signalAbuf = C3.inputEmptySignal();
			d.inputA = !s.inputA;
		}
		g.map.action(this, 'score', g.map.state);
	}
	if (control.name == 'inputB') {
		if (!s.inputB) {
			var v = g.param();
			if (v == null)	return;
			d.signalBbuf = {freq: v.freq, period: 1 / v.freq, v: v.v, duration: v.t, sin: v.sin, offset: v.offset};
			
			var fail = false;
			fail = fail || v.v > 10000;
			if (fail) 
				this.map.action(this, 'fatal', 'Напряжение больше 10 вольт по входу Б');
			else
				d.inputB = !s.inputB;
		} else  {		
			d.signalBbuf = C3.inputEmptySignal();
			d.inputB = !s.inputB;
		}
		g.map.action(this, 'score', g.map.state);
	}
	if (control.name == 'inputC') {
		if (!s.inputC) {
			var v = g.param();
			if (v == null)	return;
			d.signalCbuf = {freq: v.freq, period: 1 / v.freq, v: v.v, duration: v.t, sin: v.sin, offset: v.offset};
			
			var fail = false;
			fail = fail || v.v > 1000;
			if (fail) 
				this.map.action(this, 'fatal', 'Напряжение больше 1 вольта по входу В');
			else
				d.inputC = !s.inputC;
		} else  {		
			d.signalCbuf = C3.inputEmptySignal();
			d.inputC = !s.inputC;
		}
		g.map.action(this, 'score', g.map.state);
	}
}

C3.InputGenerator.prototype.setMap = function (map) {
	C3.InputGenerator.superclass.setMap.call(this, map);
	this.lastA = map.state.inputA;
	
	var state = map.state;
}
