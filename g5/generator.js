G5.GeneratorSignal = function(param) {
	this.param = param;
}

G5.GeneratorSignal.prototype.signal = function (nsec) {
	var param = this.param;
	var c = 1000000000
	var p = param.param;
	var t  = Math.floor((1 / p.f) * c);
	var s = nsec / param.scale;
	var k = s / t;
	var signal = s - t * Math.floor(k);
	signal = (signal < p.d * c) * p.v;
	param.funcsingal(signal);
}

G5.GeneratorOne = function(param) {
	this.param = param;
	this.nsecond = 0;
}

G5.GeneratorOne.prototype.start = function() {
	var interval = 100;
	var scale = this.param.scale;
	var param = this.param;
	var g = this;
	if (this.timer != null) return;
	this.timer = setInterval(function() { 
		if (param.g.map == null) return;
		var t = param.g.map.state;
		if (t.power == 0)
			return;
			
		for(var i = 0; i < param.generator.length; i++) {
			var p = param.generator[i];
			if (eval(p.param.cond))
				p.signal(g.nsecond);
			else
				p.param.funcsingal(0);
		}
		g.nsecond += interval * 1000000;
	
	}, interval);
}

G5.GeneratorOne.prototype.stop = function() {
	if (this.timer == null) return;
	clearInterval(this.timer);
	this.timer = null;
}

G5.Generator = function (name, param) {
	G5.Generator.superclass.constructor.call(this, name, param);
	this.timer = null;
	this.nsecond = 0;
	this.nseconddif = 0;
	
	this.outer = false;
	var g = this;
	this.outerSignalParam = {param:{v: 5, f: 1000000, d: 0.0000001}, scale: 1000000, cond: 't.outerpulseInput&&t.levelRun==5'}
	this.outerSignalParam.funcsingal = function(s) {
		g.map.control('outer_pulse').signal(s);
		if (s != 0 && !g.outer) {g.outer = 1;g.nseconddif = g.nsecond;}
	};
	this.outerSignalG = new G5.GeneratorSignal(this.outerSignalParam);
	
	this.clockPulseParam = {param:{v: 1.5, f: 1000000, d: 0.0000001}, scale: 1000000, cond: 't.clockpulseInput'}
	this.clockPulseParam.funcsingal = function(s) {g.map.control('clock_pulse').signal(s)};
	this.clockPulseG = new G5.GeneratorSignal(this.clockPulseParam);
	
	this.gen = new G5.GeneratorOne({g: this, generator: [this.outerSignalG, this.clockPulseG]});
}

extend(G5.Generator, Logic);

G5.Generator.prototype.setMap = function (map) {
	G5.Generator.superclass.setMap.call(this, map);
	var g = this;
	map.addListener('stop', this, function() {
		g.stopSignal();
		g.stopAuto();
		g.gen.stop();
	})
	
	map.addListener('start', this, function() {
		g.stopSignal();
		g.stopAuto();
		
		g.startSignal();
		g.startAuto();
			
		g.gen.start();
	})
	
	map.addListener('button_click', this, function() {
		if (!map.state.power) return;
		if (!map.state.up) return;
		map.state.up = 0;
		map.action(g, 'state_change');
	});
}

G5.Generator.prototype.hand = function () {
	this.nsecond = 0;
	this.outer = 0;
}

G5.Generator.prototype.startSignal = function() {
	var g = this;
	var interval = 100;
	var scale = 1000000;
	this.timerSignal = setInterval(function() { 
		if (g.map == null) return;
		var t = g.map.state;
		var u = t.U;
		if (t.at == t.def.at1)
			u = u / 10;
		if (t.at == t.def.at2)
			u = u / 100;
		if (t.power == 0)
			return;
		if (t.mode == 0)
			return g.signal(0, u);
		var tact = 0;
		if (t.T == 0 || t.R == 0 || u == 0) 
			return g.signal(0, u);
		
		var p = Math.pow(10, t.K);
		
		var ns = g.nsecond;
		if (t.mode == t.def.externalPulsePos || t.mode == t.def.externalPulseNeg) {
			if (!t.outerpulseInput) {
				g.outer = 0;
				return g.signal(0, u);
			}
			ns -= t.D * p / 10 * 1000;
			
			if (t.mode == t.def.externalPulseNeg) {
				ns -= 100;
			}
			
			ns -= g.nseconddif;
			if (ns < 0 || !g.outer) {
				g.nsecond += interval * 1000000/ scale;
				return g.signal(0, u);
			}
		}
		
		
		var period  = t.T * p / 10 * 1000;
		var s = ns;
		
		if (t.mode == t.def.hand && s >= period) {
			t.mode = 0;
			return g.signal(0, u);
		}
		
		var k = s / period;
		var signal = s - period * Math.floor(k);
		signal = (signal < t.R * p / 10 * 1000) * u / 1000;
		if (t.mode == t.def.direct)
			signal = u / 1000;
		
		if (t.outerPulse == t.def.outerPulseNeg) {
			signal = -signal;
		}
		
		t.signal = signal;
		g.map.action(this, 'signal', signal);
		
		g.nsecond += interval * 1000000 / scale;
	}, interval );
}

G5.Generator.prototype.stopSignal = function() {
	clearInterval(this.timerSignal);
}

G5.Generator.prototype.startAuto = function() {
	var g = this;
	var interval = 500;
	this.timerAuto = setInterval(function() { 
		if (g.map == null) return;
		var t = g.map.state;
		if (t.param == 0) return;
		if (t.auto == 0) return;
		if (t.param != t.def.pNP) {
			if (t.discharge == 0) return;
			var v = G5.getNumber(t);
			v++;
			v %= 10;
			G5.changeNumber(t, t, v);
		} else {
			t.np ++;
			t.np %= 10;
			G5.loadProgram(t, t);
		}
		g.map.action(g, 'state_change');
	}, interval);
}

G5.Generator.prototype.stopAuto = function() {
	clearInterval(this.timerAuto);
}

G5.Generator.prototype.signal = function(tact, max) {
	var t = this.map.state;
	
	
	t.signal = 0;
	this.map.action(this, 'signal', t.signal);
	t.tact++;
}