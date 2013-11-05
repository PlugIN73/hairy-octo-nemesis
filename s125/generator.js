S125.GeneratorSignal = function(param) {
	this.param = param;
}

S125.GeneratorSignal.prototype.signal = function (nsec) {
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

S125.GeneratorOne = function(param) {
	this.param = param;
	this.nsecond = 0;
}

S125.GeneratorOne.prototype.start = function() {
	var interval = 1;
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
      console.log(p)
			if (eval(p.param.cond)) {
				p.signal(g.nsecond);
      }	else {
				p.param.funcsingal(0);
      }
		}
		g.nsecond += interval * 1000000;

	}, interval);
}

S125.GeneratorOne.prototype.stop = function() {
	if (this.timer == null) return;
	clearInterval(this.timer);
	this.timer = null;
}

S125.Generator = function (name, param) {
	S125.Generator.superclass.constructor.call(this, name, param);
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
	this.outerSignalG = new S125.GeneratorSignal(this.outerSignalParam);

	this.clockPulseParam = {param:{v: 1.5, f: 1000000, d: 0.0000001}, scale: 1000000, cond: 't.clockpulseInput'}
	this.clockPulseParam.funcsingal = function(s) {g.map.control('clock_pulse').signal(s)};
	this.clockPulseG = new S125.GeneratorSignal(this.clockPulseParam);

	this.gen = new S125.GeneratorOne({g: this, generator: [this.outerSignalG, this.clockPulseG]});
}

extend(S125.Generator, Logic);

S125.Generator.prototype.setMap = function (map) {
	S125.Generator.superclass.setMap.call(this, map);
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

S125.Generator.prototype.hand = function () {
	this.nsecond = 0;
	this.outer = 0;
}

S125.Generator.prototype.startSignal = function() {
	var g = this;
	var interval = 50;
	var scale = 10000;
	this.timerSignal = setInterval(function() {

		var t = g.map.state;
		var u = t.U;
		if (t.power == 0)
			return;
		if (t.mode == 0)
			return g.signal(0, u);


		t.signal = signal;
		g.map.action(this, 'signal', signal);

		g.nsecond += interval * 10 / scale;
	}, interval );
}

S125.Generator.prototype.stopSignal = function() {
	clearInterval(this.timerSignal);
}

S125.Generator.prototype.startAuto = function() {
	var g = this;
	var interval = 5;
	this.timerAuto = setInterval(function() {
		if (g.map == null) return;
		var t = g.map.state;
		if (t.param == 0) return;
		if (t.auto == 0) return;
		if (t.param != t.def.pNP) {
			if (t.discharge == 0) return;
			var v = S125.getNumber(t);
			v++;
			v %= 10;
			S125.changeNumber(t, t, v);
		} else {
			t.np ++;
			t.np %= 10;
			S125.loadProgram(t, t);
		}
		g.map.action(g, 'state_change');
	}, interval);
}

S125.Generator.prototype.stopAuto = function() {
	clearInterval(this.timerAuto);
}

var x3 = -1;


// Здесь в этой функции идет основное преобразование координаты X в Y
function yFunction(x, state) {
  var y = 3 * Math.sin(x);

 	if (state.inversion == true) {
 		y = y * -1;
 	}

  y += state.vertical_offset;


 	if (state.earthA == true) {
 		y = y * 0;
 	}

  return y;
}

S125.Generator.prototype.signal = function(tact, max) {
  // console.log(tact, max)
	// var t = this.map.state;
  this.fill_lines = false;
	// t.signal = 3* Math.sin(x3);

  var points = [];
  for (var i = 0; i < 14; i += 0.5) {
    var point = [
      i,
      yFunction(i, this.map.state)
    ]
    points.push(point);
  }

	this.map.action(this, 'signal', points); // this.map.state.vertical_offset + t.signal);
	// t.tact++;
}
