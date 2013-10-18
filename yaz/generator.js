YAZ.Generator = function (name, param) {
	YAZ.Generator.superclass.constructor.call(this, name, param);
	this.timer = null;
	this.timerCounter = null;
	this.flushcontrInd = null;
	this.normalSignal = 0;
	this.timeWork = false;
	this.handFlush = null;
}
extend(YAZ.Generator, Logic);

YAZ.Generator.prototype.setPeriod = function(state) {
	var map = this.map;
	
	var valid = false;
	
	var n = -1;
	if (state.timerBegin > 0)
		n = Math.round(log10(state.timerBegin));
	if (n < 0) n = -1;
	state.realnumber = n;
	state.mode_on = 0;
	this.normalSignal = 1;
	
	var signal = state.signalbuf;
	if (!this.performSignal(signal)) signal = YAZ.inputEmptySignal();
	state.value = signal.freq;	
	state.metric = state.def.hz;
	
	if (this.normalSignal) {
		this.map.action(this, 'ok');
	}
	
	if (state.value < 0 && state.mode_on == 0) {
		state.mode_on = state.def.symbolMinus;
	}
	state.value = Math.abs(state.value);
	state.ready = this.normalSignal;
	
	return this.normalSignal;
}

YAZ.Generator.prototype.performSignal = function (signal) {
	var state = this.map.state;
	var a = signal;
	
	if (a.sinf && state.signal_mode != state.def.sinf) {
		this.map.action(this, 'warning', 'Настройте режим входного сигнала');
		return false;
	}
	
	if (!a.sinf && a.sin && state.signal_mode != state.def.sin) {
		this.map.action(this, 'warning', 'Настройте режим входного сигнала');
		return false;
	}
	
	if (!a.sinf && !a.sin && state.signal_mode != state.def.impuls) {
		this.map.action(this, 'warning', 'Настройте режим входного сигнала');
		return false;
	}
	
	if (a.freq < 1500000000 || a.freq > 18000000000 ) {
		this.map.action(this, 'warning', 'Частота должна быть в пределах от 1.5 Ггц до 18 Ггц ');
		return false;
	}
	
	if (state.handapply) {
		var f = state.handfreq;
		var f2 = a.freq / 1000000000;
		if (f2.toFixed(1) != f.toFixed(1)) {
			this.map.action(this, 'warning', 'Некорректно настроена несущая частота');
			return false;
		}
	}
	
			
	return true;
}

YAZ.Generator.timerCounterF = function (g) {
	var map = g.map;
	if (!g.timeWork) {
		map.state.timerCounterOn = false;
	} else {
		map.state.timerCounterOn = !map.state.timerCounterOn;
		map.state.timerCounter -= 500000;
	
		var upd = false;
		if (map.state.timerCounter <= 0) {
			map.action(g, 'score_end', map.state);
			upd = 1;
		}
		
		if (!map.state.power || !map.state.input) {
			map.action(g, 'score_end', map.state);
			upd = 1;
		}
		if (upd)
			map.action(g, 'state_change');
	}
	var c = map.control('indGoCounter');
	var s = map.state;
	c.setLight(s.power && s.timerCounterOn);
}

YAZ.Generator.timerCounterF2 = function (g, p) {
	var map = g.map;
	map.state.timerCounter = 0;
	map.action(g, 'score_end', map.state);
}

YAZ.Generator.prototype.stopCalc = function (d) {
	var g = this;
	if (g.timerCounter != null) {
		clearInterval(g.timerCounter);
		g.timerCounter = null;
		d.timerBegin -= (d.timerCounter <= 0) ? 0 : d.timerCounter;
		d.timerCounter = 0;
	}
	d.timerCounterOn = false;
}

YAZ.Generator.prototype.hand = function (s, d) {
	if (!d.power) return;
	clearTimeout(this.handFlush);
	var g = this;
	this.handFlush = setTimeout(function () {g.map.state.hand = g.map.state.def.handedit;g.map.action(g, 'state_change')}, 2000);
}

YAZ.Generator.prototype.startCalc = function (d) {
	if (!d.power) return;
	clearTimeout(this.timerScoreEnd);
	var g = this;
	var s = d;
	g.stopCalc(d);
	var map = g.map;
	

	if (s.input == 0) {
		map.action(this, 'warning', 'Подайте сигнал');
		d.ready = 0;
		return;
	}
	s.timerCounter = Math.pow(10, s.number_add);	
	
	if 	(s.minim) {
		d.timerCounter = 1 / s.signalbuf.freq * 1000000;
	}
	
	if (d.timerCounter == 0) return;
	d.timerBegin = d.timerCounter;

	d.timerCounterOn = true;
	//g.timeWork = true;
	var p = s.timerCounter / 1000;
	g.timerCounter = setInterval(function() {YAZ.Generator.timerCounterF2(g, p)}, s.timerCounter / 1000);
	g.map.action(g, 'state_change');
}

YAZ.Generator.prototype.setMap = function (map) {
	YAZ.Generator.superclass.setMap.call(this, map);
	var g = this;
	var state = map.state;
	
	//this.timerCounter = setInterval(function() {YAZ.Generator.timerCounterF(g)}, 500);

	map.addListener('state_change', this, function() {
		if (!map.state.power) return;
		if (!map.state.up) return;
		if (map.state.mode_on != map.state.def.symbolControl) return;
		setTimeout(function() { 
			if (!map.state.up) return;
			map.state_save();
			map.state.mode_on = map.state.def.symbolCalibration;
			map.state.metric = map.state.def.hz;
			map.action(g, 'state_change');
			}, 1000);
	});
	
	map.addListener('score', this, function(c, d) {
		g.startCalc(d);
		
	});
	
	map.addListener('score_end', this, function(c, d) {
		g.stopCalc(d);
		//if (d.fa != 0) {
			if (g.setPeriod(d))
			{
				clearTimeout(this.timerScoreEnd);
				this.timerScoreEnd = setTimeout(function () {g.map.action(g, 'score', d)}, 500);
			}
		//}
		g.map.action(g, 'state_change');
	});
	
	map.addListener('warning', this, function (control, param) {
		g.normalSignal = 0;
	});
	
	map.addListener('button_click', this, function(c) {
		if (!map.state.power) return;
		map.state.handlimit = 0;
		
		if (c.name != 'contrInd' && map.state.controlInd) {
			map.state.controlInd = false;
		}
		
		if (c.name == 'contrInd') {
			if (this.flushcontrInd != null) clearTimeout(this.flushcontrInd);
			this.flushcontrInd = setTimeout(function() { 
				if (!map.state.controlInd) return;
				map.state.controlInd = false;
				this.flushcontrInd = null;
				map.action(g, 'state_change');
			}, 10000);
		}
		
		if (!map.state.up) return;
		if (map.state.mode_on != map.state.def.symbolCalibration) return;
		map.state_save();
		map.state.mode_on = 0;
		map.state.up = 0;
		map.state.metric = 0;
		map.action(g, 'state_change');
	});
	
	map.addListener('button_post', this, function(c) {
		var map = g.map;
		//console.log('post: ', c.name);
		map.action(g, 'score', map.state);
	});

	
}
