function DeviceS125(node, width, height) {
	DeviceS125.superclass.constructor.call(this, node, width, height);

	this.name = "s1-125";											// Название папки для поиска изображений
	this.title = 'Осциллограф С1-125';
}

extend(DeviceS125, Map);

DeviceS125.prototype.getArea = function () {
	var as = this.getAreaPre();
	var  multi = 1.25
	for(var i = 0; i < as.length; i++){
		var shape = as[i];
		
		switch (shape.shape)
		{
			case 'rect': 
				c = shape.coords.split(',');
				x = parseInt(c[0]) * multi;
				y = parseInt(c[1]) * multi;
				x2 = parseInt(c[2]) * multi;
				y2 = parseInt(c[3]) * multi;
				c[0] = x;
				c[1] = y;
				c[2] = x2;
				c[3] = y2;
				
				shape.coords = c.join(',')
			break;
			case 'circle': 
				c = shape.coords.split(',');
				x = parseInt(c[0]) * multi;
				y = parseInt(c[1]) * multi;
				r = parseInt(c[2]) * multi;
				
				c[0] = x;
				c[1] = y;
				c[2] = r;
				shape.coords = c.join(',')
			break;
		}
	}
	return as;
}

DeviceS125.prototype.getAreaPre = function () {
	var area = [];
	//добавляю новые поле параметров tooltip для вывода подсказок в режиме справки. Троицкий
	//добавляю новые поле параметров hint_text для вывода текста в боковом меню в режиме справки. Троицкий
	area.push({shape: "rect", key: "power", coords: "120,280,145,300", tooltip: "Кнопка включения прибора", hint_text: "Кнопка включения прибора"});

	return area;
}

DeviceS125.prototype.definitionControl = function () {
	var c = []

	c.push({key: 'power', cls: Button, param: 'd.power = !s.power; d.shiftUp=1; d.mode=0; d.at=0; d.outerPulse=d.def.outerPulsePos; d.calibration=0;d.T=0;d.D=0;d.R=0;d.K=0;d.U=0;d.calibration=0;d.set=0;d.param=0;d.set=0;d.tact=0,d.up=1'});

	// Мои компоненты. Троицкий
	c.push({key: 'menu', cls: Menu, param: null});

	return c;
}

var S125 = {};

S125.modework = function(d, s, map, mode) {
	d.mode = mode;
	map.control("generator").hand();
}
	
S125.getStateIndicator = function(t, name) {
	if (!t.power) return false;
	if (t.up) return true;
	m = {};
	m['indShiftDown'] = t.power && !t.shiftUp;
	m['indShiftUp'] = t.power && t.shiftUp;
	m['indInnerWork'] = t.power && (t.mode == t.def.innerWork);
	m['indExternalPulsePos'] = t.power && (t.mode == t.def.externalPulsePos);
	m['indExternalPulseNeg'] = t.power && (t.mode == t.def.externalPulseNeg);
	m['indHand'] = t.power && (t.mode == t.def.hand);
	m['indDirect'] = t.power && (t.mode == t.def.direct);
	m['indAT1'] = t.power && (t.at == t.def.at1 || t.at == 10);
	m['indAT2'] = t.power && (t.at == t.def.at2 || t.at == 10);
	m['indOuterPulsePos'] = t.power && (t.outerPulse == t.def.outerPulsePos);
	m['indOuterPulseNeg'] = t.power && (t.outerPulse == t.def.outerPulseNeg);
	m['indCalibration'] = t.power && (t.calibration > 0);
	
	return m[name];
}

S125.saveProgram = function saveProgram(state, state_new) {
	var p = state_new.p[state.np];
	var ap = ['T', 'D', 'R', 'K', 'U'];
	for(var i = 0; i < ap.length; i++) {
		var key = ap[i];
		p[key] = state_new[key];
	}
}

S125.loadProgram = function (state, state_new) {
	var p = state.p[state_new.np];
	var ap = ['T', 'D', 'R', 'K', 'U'];
	for(var i = 0; i < ap.length; i++) {
		var key = ap[i];
		state_new[key] = p[key];
	}
	state_new.tact=0;
}

S125.eventNumber = function (state, state_new, digit) {
	if (state.shiftUp) return;
	if (state.auto) return;
	if (state.set && !state.discharge && digit >= 1 && digit <= 4) {
			state_new.discharge = digit;
		return;
	}
	if (state.set && state.discharge && state.param != state.def.pNP) {
		S125.changeNumber(state, state_new, digit);
		return;
	}
	
	if (!state.set && state.param != state.def.pNP && state.param != 0) {
		var p = state.def.pvalue[state.param];
		if (state.discharge + 1 > p.count) return;
		state_new.discharge ++;
		
		state_new[p.name] = changeNumberDigit(state[p.name], digit, state_new.discharge, p.count);
		
		S125.saveProgram(state, state_new);
		state_new.tact=0;
		return;
	}
	
	if (state.param == state.def.pNP) {
		state_new.np = digit;
		S125.loadProgram(state, state_new);
		return;
	}		
}

S125.getTranslateDigitNumber = function (discharge, max) {
	if (discharge == 4) return 1;
	return discharge + 1;
}

S125.changeNumber = function (state, state_new, digit) {
	var p = state.def.pvalue[state.param];
	var number_digit = S125.getTranslateDigitNumber(state.discharge, p.count);
	state_new[p.name] = changeNumberDigit(state[p.name], digit, number_digit, p.count);
	S125.saveProgram(state, state_new);
	state_new.tact=0;
}

 S125.getNumber = function(state) {
	var p = state.def.pvalue[state.param];
	var number_digit = S125.getTranslateDigitNumber(state.discharge, p.count);
	return getNumberDigit(state[p.name], number_digit, p.count); }