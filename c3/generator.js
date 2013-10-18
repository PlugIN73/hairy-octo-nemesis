C3.Generator = function (name, param) {
	C3.Generator.superclass.constructor.call(this, name, param);
	this.timer = null;
	this.timerCounter = null;
	this.flushV = null;
	this.normalSignal = 0;
	this.timeWork = false;
	this.timerScoreEnd = null;
}
extend(C3.Generator, Logic);

C3.Generator.prototype.divSignal = function(signal1, signal2, state) {
	if (signal1.freq == 0 || signal2.freq == 0) {
		state.value = 0;
		if (signal2.freq == 0)
			state.mode_on = this.map.state.def.symbolOver;
	} else
		state.value = signal1.freq / signal2.freq;
		
	state.metric = 0;
}

C3.Generator.prototype.getminimtab = function() {
	var state = this.map.state;
	var signalA = state.signalAbuf;
	var signalB = state.signalBbuf;
	if (!this.performSignalA(signalA, 'А')) signalA = C3.inputEmptySignal();
	if (!this.performSignalA(signalB, 'Б')) signalB = C3.inputEmptySignal();
	
	if (signalA.period == 0 || signalB.period == 0) {
		return 1000000000;
	}
	
	var start = signalA.offset + (state.aFrontPlus ? 0 : signalA.duration);
	var stop = signalB.offset + (state.bFrontPlus ? 0 : signalB.duration);
			
	if (stop <= start) {
		var t = start - stop;
		var m = Math.floor(t / signalB.period)
		if (signalB.period * m < t) m += 1;
		stop += m * signalB.period;
	}
	return stop * 1000000;
}

C3.Generator.prototype.setPeriod = function(state) {
	var map = this.map;
	
	var signal = {};
	var valid = false;
	
	var n = -1;
	if (state.timerBegin > 0)
		n = Math.round(log10(state.timerBegin));
	state.realnumber = n;
	state.mode_on = 0;
	this.normalSignal = 1;
	
	
	if (state.fa == state.def.fc) {
		signal = state.signalCbuf;
		if (!this.performSignalC(signal, 'В')) signal = C3.inputEmptySignal();
		state.metric = state.def.hz;
		state.value = signal.freq;
	} else if (state.fa == state.def.tab) {
		var signalA = state.signalAbuf;
		var signalB = state.signalBbuf;
		if (!this.performSignalA(signalA, 'А')) signalA = C3.inputEmptySignal();
		if (!this.performSignalA(signalB, 'Б')) signalB = C3.inputEmptySignal();	
		state.metric = state.def.second;

		if (signalA.period == 0) {
			state.value = 0;
		} else {
			var nsec = state.timerBegin / 1000000;
			var start = signalA.offset + (state.aFrontPlus ? 0 : signalA.duration);
			var stop = signalB.offset + (state.bFrontPlus ? 0 : signalB.duration);
			
			if (start > nsec)
				state.value = 0;
			else {
				if (signalB.period == 0) {
					stop = nsec;
				}
				if (stop <= start) {
					var t = start - stop;
					var m = Math.floor(t / signalB.period)
					if (signalB.period * m < t) m += 1;
					stop += m * signalB.period;
				}
				if (stop > nsec)
					stop = nsec;
				var diff = stop - start;
				state.value = diff;
			}
		}
		
	} else if (state.fa == state.def.freq) {
		signal = state.signalAbuf;
		if (!this.performSignalA(signal, 'А')) signal = C3.inputEmptySignal();
		state.metric = state.def.hz;;
		state.value = signal.freq;
	} else if (state.fa == state.def.period) {
		signal = state.signalAbuf;
		if (!this.performSignalA(signal, 'А')) signal = C3.inputEmptySignal();
		state.metric = state.def.second;
		state.value = signal.period;
	}else if (state.fa == state.def.duration) {
		signal = state.signalAbuf;
		if (!this.performSignalA(signal, 'А')) signal = C3.inputEmptySignal();
		state.value = signal.duration;
		if (signal.period != 0 && !state.aFrontPlus)
			state.value = signal.period - signal.duration;
		state.metric = state.def.second;
	}else if (state.fa == state.def.fadivb) {
		var signalA = state.signalAbuf;
		var signalB = state.signalBbuf;
		if (!this.performSignalA(signalA, 'А')) signalA = C3.inputEmptySignal();
		if (!this.performSignalA(signalB, 'Б')) signalB = C3.inputEmptySignal();
		this.divSignal(signalB, signalA, state);
	} else if (state.fa == state.def.fadivc) {
		var signalA = state.signalAbuf;
		var signalB = state.signalCbuf;
		if (!this.performSignalA(signalA, 'А')) signalA = C3.inputEmptySignal();
		if (!this.performSignalC(signalB, 'В')) signalB = C3.inputEmptySignal();
		this.divSignal(signalB, signalA, state);
	}else if (state.fa == state.def.abplus) {
		var signalA = state.signalAbuf;
		var signalB = state.signalBbuf;
		if (!this.performSignalA(signalA, 'А')) signalA = C3.inputEmptySignal();
		if (!this.performSignalA(signalB, 'Б')) signalB = C3.inputEmptySignal();
		var ta = (signalA.period == 0) ? 0 : Math.floor(state.timerBegin / 1000000 / signalA.period);
		var tb = (signalB.period == 0) ? 0 : Math.floor(state.timerBegin / 1000000 / signalB.period);
		state.value = state.abplus ? ta + tb : ta - tb;
		state.realnumber = -1;
	}
	
	if (this.normalSignal) {
		this.map.action(this, 'ok');
	}
	
	if (state.value < 0 && state.mode_on == 0) {
		state.mode_on = state.def.symbolMinus;
	}
	state.value = Math.abs(state.value);
	
	return this.normalSignal;
}

C3.Generator.prototype.performSignalC = function (signal, channel) {
	var state = this.map.state;
	var s = signal;
	
	if (s.v > 1000) {
		this.map.action(this, 'warning', 'Напряжение больше 1 вольта на входе ' + channel);
		return false;
	}
	if (!s.sin) {
		this.map.action(this, 'warning', 'Только синусоидальный сигнал на входе ' + channel);
		return false;
	}
	
	if (s.freq < 100000000 || s.freq > 1000000000) {
		this.map.action(this, 'warning', 'Частота должна быть от 100 МГц до 1000 МГц на входе ' + channel);
		return false;
	}
	
	if (s.v < 100 && !state.booster) {
		this.map.action(this, 'warning', 'При напряжение меньше 100 мВ надо включать усилитель для входа ' + channel);
		return false;
	}

	return true;
}

C3.Generator.prototype.performSignalA = function (signal, channel) {
	var state = this.map.state;
	var a = signal;
	var level;
	if (channel == 'А')
	{
		c = state.ac;
		level = state.levelA;
	}
	else
	{
		c = state.bc;
		level = state.levelB;
	}
		
	if (a.v > 10000) {
		this.map.action(this, 'warning', 'Напряжение больше 10 вольт на входе ' + channel);
		return false;
	}
	
	if (a.freq > 10000000 && c.om != 50) {
		this.map.action(this, 'warning', 'При частоте больше 10 МГц рекомендуется входное сопротевление 50 Ом на входе ' + channel);
		return false;
	}
	
	if (a.sin == 0 && c.om != 50) {
		this.map.action(this, 'warning', 'При имульсных измерениях рекомендуется входное сопротевление 50 Ом на входе ' + channel);
		return false;
	}
	
	if (a.freq > 150000000) {
		this.map.action(this, 'warning', 'Частота должна быть меньше 150 Мгц на входе ' + channel);
		return false;
	}
	
	if (a.freq < 10000000 && !state.periodLess10m) {
		this.map.action(this, 'warning', 'При частоте меньше 10 Мгц требуется ограничение частоты на входе ' + channel);
		return false;
	}
	
	if (a.freq > 10000000 && state.periodLess10m) {
		this.map.action(this, 'warning', 'При частоте больше 10 Мгц ограничение частоты не требуется на входе ' + channel);
		return false;
	}
	
	if (a.freq <= 10 && c.toque != state.def.toqueConst) {
		this.map.action(this, 'warning', 'При частоте меньше илм равным 10 Гц связь по постоянному току на входе ' + channel);
		return false;
	}
	if (a.freq > 10 && c.toque != state.def.toqueVar) {
		this.map.action(this, 'warning', 'При частоте больше 10 Гц связь по переменному току на входе ' + channel);
		return false;
	}
	if (a.v >= 50 && a.v <= 600 && a.sin == 1 && c.x != 1) {
		this.map.action(this, 'warning', 'Для уровня входного сигнала синусоидальной формы от 0.05В до 0.6В Катт должен равняться 1 на входе ' + channel);
		return false;
	}
	if (a.v >= 150 && a.v <= 1500 && a.sin == 0 && c.x != 1) {
		this.map.action(this, 'warning', 'Для уровня входного сигнала импульсной формы от 0.15В до 1.5В Катт должен равняться 1 на входе ' + channel);
		return false;
	}
	
	if (a.v >= 600 && a.v <= 10000 && a.sin == 1 && c.x != 10) {
		this.map.action(this, 'warning', 'Для уровня входного сигнала синусоидальной формы от 0.6В до 10В Катт должен равняться 10 на входе ' + channel);
		return false;
	}
	if (a.v >= 1500 && a.v <= 10000 && a.sin == 0 && c.x != 10) {
		this.map.action(this, 'warning', 'Для уровня входного сигнала импульсной формы от 1.5В до 1.В Катт должен равняться 10 на входе ' + channel);
		return false;
	}
	
	if (level < -500 || level > 500) {
		this.map.action(this, 'warning', 'Настройти уровень на входе ' + channel);
		return false;
	}
			
	return true;
}

C3.Generator.timerCounterF = function (g) {
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
		
		if (!map.state.power || !map.state.fa) {
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

C3.Generator.timerCounterF2 = function (g, p) {
	var map = g.map;
	map.state.timerCounter = 0;
	map.action(g, 'score_end', map.state);
}

C3.Generator.prototype.stopCalc = function (d) {
	var g = this;
	if (g.timerCounter != null) {
		clearInterval(g.timerCounter);
		g.timerCounter = null;
		d.timerBegin -= (d.timerCounter <= 0) ? 0 : d.timerCounter;
		d.timerCounter = 0;
	}
	d.timerCounterOn = false;
}

C3.Generator.prototype.startCalc = function (d) {
	if (!d.power) return;
	clearTimeout(this.timerScoreEnd);
	var g = this;
	var s = d;
	g.stopCalc(d);
	var map = g.map;
	
	if (s.fa == 0) {
		map.action(this, 'warning', 'Нет режима');
		return;
	}
	
	var ic = this.inputcond[s.fa];
	var ac = {'А': s.inputA, 'Б': s.inputB, 'В': s.inputC};
	for(var i = 0; i < ic.length; i++) {
		var l = ic[i];
		if (!ac[l]) {
			map.action(this, 'warning', 'Соедините разъём ' + l);
			return;
		}
	}
	
	s.timerCounter = Math.pow(10, s.number_add);	
	
	if 	(s.minim) {
		if (d.fa == s.def.freq || d.fa == s.def.period 
		|| d.fa == s.def.duration || d.fa == s.def.fadivb
		|| d.fa == s.def.fadivc) {
				d.timerCounter = s.signalAbuf.period * 1000000;
	}
		if (d.fa == s.def.fc) {
			d.timerCounter = s.signalCbuf.period * 1000000 * 8;
		}
		if (d.fa == s.def.tab) {
			var c = map.control('generator');
			d.timerCounter = c.getminimtab();
		}
		if (d.timerCounter == 0) d.timerCounter = 500;
	}
	
	if (d.timerCounter == 0) return;
	d.timerBegin = d.timerCounter;
	d.timerCounterOn = true;
	//g.timeWork = true;
	var p = s.timerCounter / 1000;
	g.timerCounter = setInterval(function() {C3.Generator.timerCounterF2(g, p)}, s.timerCounter / 1000);
	g.map.action(g, 'state_change');
}

C3.Generator.prototype.setMap = function (map) {
	C3.Generator.superclass.setMap.call(this, map);
	var g = this;
	var state = map.state;
	
	//this.timerCounter = setInterval(function() {C3.Generator.timerCounterF(g)}, 500);
	
	var inputcond = {};
	inputcond[state.def.fc] = ['В'];
	inputcond[state.def.tab] = ['А', 'Б'];
	inputcond[state.def.freq] = ['А'];
	inputcond[state.def.period] = ['А'];
	inputcond[state.def.duration] = ['А'];
	inputcond[state.def.fadivb] = ['А', 'Б'];
	inputcond[state.def.fadivc] = ['А', 'В'];
	inputcond[state.def.abplus] = ['А', 'Б'];
	this.inputcond = inputcond;
	
	
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
		if (d.fa != 0) {
			if (g.setPeriod(d))
			{
				clearTimeout(this.timerScoreEnd);
				this.timerScoreEnd = setTimeout(function () {g.map.action(g, 'score', d)}, 500);
			}
		}
		g.map.action(g, 'state_change');
	});
	
	map.addListener('warning', this, function (control, param) {
		g.normalSignal = 0;
	});
	
	map.addListener('button_click', this, function(c) {
		if (!map.state.power) return;
		
		if (c.name != 'V' && map.state.V) {
			map.state.V = false;
		}
		
		if (c.name == 'V') {
			if (this.flushV != null) clearTimeout(this.flushV);
			this.flushV = setTimeout(function() { 
				if (!map.state.V) return;
				map.state.V = false;
				this.flushV = null;
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
