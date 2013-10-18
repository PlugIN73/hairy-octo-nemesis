YAZ.InputGenerator = function (name, param) {
	YAZ.InputGenerator.superclass.constructor.call(this, name, param);
}

extend(YAZ.InputGenerator, Logic);

YAZ.InputGenerator.prototype.action = function (d, s, control) {
	var g = this;
	
	if (!s.input) {
		var v = g.param();
		if (v == null)	return;
		d.signalbuf = {freq: v.freq, sin: v.sin, sinf: v.sinf};
		
		d.input = !s.input;
	} else  {		
		d.signalbuf = YAZ.inputEmptySignal();
		d.input = !s.input;
		g.map.action(this, 'score_end', g.map.state);
	}
}
