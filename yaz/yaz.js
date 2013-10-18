function DeviceYAZ(node, width, height) {
	DeviceYAZ.superclass.constructor.call(this, node, width, height);
	this.state = {
		power: 0, up:0, mode_on: 0, realnumber: 0, number_add: 0, input: 0, 
		metric: 0, minim: 0, timerBegin: 0, value: 0, signal_mode:0, controlInd: 0,
		timerCounter: 0, timerCounterOn: 0, degree: 0, hand: 0, handapply: 0, ready: 0, handfreq: 0, handlimit: 0,
		def: {symbolControl: 1, symbolOver: 2, symbolCalibration: 3, symbolMinus: 4, 
		kilo: 12, mega: 13, giga: 14, mili: 15, micro:16, nano: 17, second: 18, hz: 19, impuls: 20, sin:21, sinf: 22, handlr: 23, handrl: 24, handedit: 25}
	};
		
	this.state.signalbuf = YAZ.inputEmptySignal();
	
	this.start_state = jQuery.extend(true, {}, this.state);

	this.state_time_variables = [];
	this.InitEx(); 												// загрузить упражнения из файла yaz exercises.js
	this.name = "yaz";											// Название папки для поиска изображений
	this.title = "Блок преобразования частоты ЯЗЧ-175/1";
}

extend(DeviceYAZ, Map);

DeviceYAZ.prototype.getArea = function () {
	var as = this.getAreaPre();
	//return as;
	var maxx = 598;
	var dy = 310;
	for(var i = 0; i < as.length; i++){
		var shape = as[i];
		
		switch (shape.shape)
		{
			case 'rect': 
				c = shape.coords.split(',');
				x = parseInt(c[0]);
				y = parseInt(c[1]);
				x2 = parseInt(c[2]);
				y2 = parseInt(c[3]);
				
				if (x2 > maxx)
				{
					x2 -= maxx;
					x -= maxx;
					y += dy;
					y2 += dy;
					
					c[0] = x;
					c[1] = y;
					c[2] = x2;
					c[3] = y2;
					
					shape.coords = c.join(',')
				}
			break;
			case 'circle': 
				c = shape.coords.split(',');
				x = parseInt(c[0]);
				y = parseInt(c[1]);
				r = parseInt(c[2]);
				
				if (x > maxx)
				{
					x -= maxx;
					y += dy;
					
					c[0] = x;
					c[1] = y;
					c[2] = r;
					
					shape.coords = c.join(',')
				}
			break;
		}
	}
	return as;
}

DeviceYAZ.prototype.getAreaPre = function () {
	var area = [];
	area.push({shape: "circle", key: "power", coords: "71,254,22", tooltip: "Кнопка включения прибора", hint_text: "Кнопка включения прибора"});
	area.push({shape: "rect", key: "x", coords: "172,135,198,166", tooltip: "Сброс", hint_text: "Сброс"});
	area.push({shape: "rect", key: "0", coords: "205,136,234,166", tooltip: "0", hint_text: "0"});
	area.push({shape: "rect", key: "1", coords: "243,135,270,162", tooltip: "1", hint_text: "1"});
	area.push({shape: "rect", key: "2", coords: "276,137,303,167", tooltip: "2", hint_text: "2"});
	area.push({shape: "rect", key: "3", coords: "307,137,336,168", tooltip: "3", hint_text: "3"});
	area.push({shape: "rect", key: "up", coords: "343,136,371,167", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "controlInd", coords: "380,134,410,169", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "scale", coords: "167,184,197,215", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "program", coords: "203,184,232,216", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "4", coords: "235,185,267,219", tooltip: "4", hint_text: "4"});
	area.push({shape: "rect", key: "5", coords: "273,183,300,219", tooltip: "5", hint_text: "5"});
	area.push({shape: "rect", key: "6", coords: "308,186,336,219", tooltip: "6", hint_text: "6"});
	area.push({shape: "rect", key: "down", coords: "341,190,371,220", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "min", coords: "378,187,408,220", tooltip: "Минимальное время счета", hint_text: "Минимальное время счета"});
	area.push({shape: "rect", key: "shift", coords: "158,235,187,268", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "sign", coords: "196,235,223,268", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "7", coords: "234,239,263,270", tooltip: "7", hint_text: "7"});
	area.push({shape: "rect", key: "8", coords: "268,236,295,269", tooltip: "8", hint_text: "8"});
	area.push({shape: "rect", key: "9", coords: "305,239,330,271", tooltip: "9", hint_text: "9"});
	area.push({shape: "rect", key: "vp", coords: "341,239,371,271", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "vs", coords: "375,241,404,276", tooltip: "Текст подсказки", hint_text: ""});
	
	area.push({shape: "rect", key: "indSymbol", coords: "91,71,101,71", tooltip: "Текст подсказки", hint_text: ""});
	
	area.push({shape: "rect", key: "indmili", coords: "464,40,484,61", tooltip: "Индикатор кратного результата счета МИЛИ", hint_text: "Индикатор кратного результата счета МИЛИ"});
	area.push({shape: "rect", key: "indk", coords: "492,41,509,59", tooltip: "Индикатор кратного результата счета КИЛО", hint_text: "Индикатор кратного результата счета КИЛО"});
	area.push({shape: "rect", key: "inds", coords: "521,41,537,60", tooltip: "Индикатор еденицы измерения результата в секундах", hint_text: "Индикатор еденицы измерения результата в секундах"});
	area.push({shape: "rect", key: "indmicro", coords: "465,66,482,80", tooltip: "Индикатор кратного результата счета МИКРО", hint_text: "Индикатор кратного результата счета МИКРО"});
	area.push({shape: "rect", key: "indM", coords: "493,64,507,79", tooltip: "Индикатор кратного результата счета МЕГА", hint_text: "Индикатор кратного результата счета МЕГА"});
	area.push({shape: "rect", key: "indHz", coords: "518,64,539,79", tooltip: "Индикатор еденицы измерения результата в герцах", hint_text: "Индикатор еденицы измерения результата в герцах"});
	area.push({shape: "rect", key: "indnano", coords: "462,86,482,97", tooltip: "Индикатор кратного результата счета НАНО", hint_text: "Индикатор кратного результата счета НАНО"});
	area.push({shape: "rect", key: "indG", coords: "492,84,509,98", tooltip: "Индикатор кратного результата счета ГИГА", hint_text: "Индикатор кратного результата счета ГИГА"});
	area.push({shape: "rect", key: "indV", coords: "517,84,536,99", tooltip: "Индикатор еденицы измерения результата в вольтах", hint_text: "Индикатор еденицы измерения результата в вольтах"});
	area.push({shape: "rect", key: "indExternal", coords: "465,103,515,115", tooltip: "Индикатор работы в режиме внешнего строба", hint_text: "Индикатор работы в режиме внешнего строба"});
	area.push({shape: "rect", key: "indUp", coords: "521,102,538,116", tooltip: "Индикатор контроля", hint_text: "Индикатор контроля"});

	area.push({shape: "rect", key: "indCounter", coords: "980,58,1074,92", tooltip: "Индикатор порядка времени счета", hint_text: "Индикатор порядка времени счета"});
		
	area.push({shape: "rect", key: "indGoCounter", coords: "61,39,82,54", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "indConnect", coords: "62,57,77,73", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "indOnline", coords: "57,94,75,114", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "indText", coords: "119,54,119,88", tooltip: "Текст подсказки", hint_text: ""});

	
	area.push({shape: "circle", key: "indPower", coords: "70,205,8", tooltip: "Текст подсказки", hint_text: ""});
	
	area.push({shape: "rect", key: "ng", coords: "760,148,792,178", tooltip: "Измерение частоты НГ или несущей ИМ сигналов", hint_text: "Измерение частоты НГ или несущей ИМ сигналов"});
	area.push({shape: "rect", key: "left", coords: "816,148,840,179", tooltip: "Измерение частоты взаданной отметке и предустановка метки частоты при движени к нижней границе диапазона", hint_text: "Измерение частоты взаданной отметке и предустановка метки частоты при движени к нижней границе диапазона"});
	area.push({shape: "rect", key: "right", coords: "864,146,895,177", tooltip: "Измерение частоты взаданной отметке и предустановка метки частоты при движени к верхней границе диапазона", hint_text: "Измерение частоты взаданной отметке и предустановка метки частоты при движени к нижней границе диапазона"});
	area.push({shape: "rect", key: "F", coords: "922,147,948,178", tooltip: "Режим автоматического измерения частоты НГ сигнала с частотной модуляцией и переход к измерениям в ручном режиме", hint_text: "Режим автоматического измерения частоты НГ сигнала с частотной модуляцией и переход к измерениям в ручном режиме"});
	area.push({shape: "rect", key: "contrInd", coords: "971,148,998,178", tooltip: "Проверка работоспособности индикаторов прибора", hint_text: "Проверка работоспособности индикаторов прибора"});
	area.push({shape: "rect", key: "indCounter", coords: "993,64,1032,100", tooltip: "Индикатор времени счета", hint_text: "Индикатор времени счета"});
	area.push({shape: "rect", key: "indIM", coords: "767,102,792,116", tooltip: "Задан режим измерения несущей частоты ИМ сигналов", hint_text: "Задан режим измерения несущей частоты ИМ сигналов"});
	area.push({shape: "rect", key: "indHand", coords: "811,100,831,116", tooltip: "Задан ручной режим измерения", hint_text: "Задан ручной режим измерения"});
	area.push({shape: "rect", key: "indReady", coords: "862,98,883,119", tooltip: "Завершена настройка прибора при достаточной входной мощности и соответствии вида сигнала установленному режиму", hint_text: "Завершена настройка прибора при достаточной входной мощности и соответствии вида сигнала установленному режиму"});
	area.push({shape: "rect", key: "indSinf", coords: "903,97,930,121", tooltip: "Задан режим автоматического измерения НГ сигналов с частотной модуляцией", hint_text: "Задан режим автоматического измерения НГ сигналов с частотной модуляцией"});
	area.push({shape: "circle", key: "input1", coords: "770,267,22", tooltip: "Входной разъем подключения", hint_text: "Входной разъем подключения"});
	area.push({shape: "circle", key: "input2", coords: "990,267,22", tooltip: "Входной разъем подключения", hint_text: "Входной разъем подключения"});
	area.push({shape: "rect", key: "input3", coords: "843,250,918,285", tooltip: "Входной разъем подключения", hint_text: "Входной разъем подключения"});

	return area;
}

DeviceYAZ.prototype.definitionControl = function () {
	var c = [];
	
	c.push({key: 'power', cls: Button, param: 	'd.power=!s.power;d.up=1;d.mode_on=d.def.symbolControl;d.number_add=5;d.metric=0;d.signal_mode=d.def.sin;d.hand=0'});
	
	c.push({key: 'indSymbol', cls: IndicatorText, param: {cond: 't.power&&t.mode_on', 
		val: 'switch(t.mode_on) {case t.def.symbolControl: "A";break; case t.def.symbolOver: "8";break; case t.def.symbolCalibration: String.fromCharCode(8847);break; case t.def.symbolMinus: String.fromCharCode(8852);break;}'}});
		

	c.push({key: 'indText', cls: IndicatorText, param: {cond: true, val: 'YAZ.mainIndicator(t).t', attr: {'text-anchor': 'start'}}});
	
	c.push({key: 'indCounter', cls: IndicatorText, param: {cond: 't.power', val: '(t.minim)?String.fromCharCode(8852):t.number_add'}});
		
	c.push({key: 'indPower', cls: IndicatorDiode, param: YAZ.getStateIndicator});
	
	c.push({key: 'indmili', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indk', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'inds', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indmicro', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indM', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indHz', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indnano', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indG', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indV', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indExternal', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indUp', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	
	
	c.push({key: 'indConnect', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indOnline', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indGoCounter', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
		
	c.push({key: '2', cls: Button, param: 'YAZ.eventNumber(s, d, 2)'});
	c.push({key: '3', cls: Button, param: 'YAZ.eventNumber(s, d, 3)'});
	c.push({key: '4', cls: Button, param: 'YAZ.eventNumber(s, d, 4)'});
	c.push({key: '5', cls: Button, param: 'YAZ.eventNumber(s, d, 5)'});
	
	//c.push({key: 'input1', cls: ButtonBox, param: {cond: '1', act: 'map.control("inputGenerator").action(d, s, b)', on: 't.input'}});
	c.push({key: 'input1', cls: ButtonBoxImage, param: {cond: '1', act: 'map.control("inputGenerator").action(d, s, b)', on: 't.input', image_on: "yaz/in2.png;263;61"}});
	c.push({key: 'input2', cls: ButtonBox, param: {cond: '1', act: 'map.control("inputGenerator").action(d, s, b)', on: 't.input'}});
	c.push({key: 'input3', cls: ButtonBox, param: {cond: '1', act: 'map.control("inputGenerator").action(d, s, b)', on: 't.input'}});
	
	c.push({key: 'min', cls: ButtonBox, param: {cond: 's.power', act: 'd.minim=!s.minim;', on: 't.minim'}});
	c.push({key: 'x', cls: Button, param: {cond: 's.power', act: 'd.minim=0;d.hand=0;d.handapply=0'}});	
	
	c.push({key: 'menu', cls: Menu, param: null});
	c.push({key: 'generator', cls: YAZ.Generator, param: null});
	
	
	c.push({key: 'ng', cls: ButtonFlag, param: {act: 'YAZ.setsignalmode(d, s, false)', on: 't.power&&t.signal_mode==t.def.sin'}});
	c.push({key: 'left', cls: Button, param: 'YAZ.hand(d, s, b, true)'});
	c.push({key: 'right', cls: Button, param: 'YAZ.hand(d, s, b, false)'});
	c.push({key: 'contrInd', cls: Button, param: 'd.controlInd=1'});
	c.push({key: 'F', cls: Button, param: 'YAZ.handaply(d, s, b)'});

	c.push({key: 'indIM', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indHand', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indReady', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});
	c.push({key: 'indSinf', cls: IndicatorDiodeOpacity, param: YAZ.getStateIndicator});


	c.push({key: 'indText', cls: IndicatorText, param: {cond: true, val: 'YAZ.mainIndicator(t).t', attr: {'text-anchor': 'start'}}});

	// Мои компоненты. Троицкий
	c.push({key: 'menu', cls: Menu, param: null});
	c.push({key: 'tutor', cls: Tutor, param: null});
	return c;
}

var YAZ = {}

YAZ.hand = function(d, s, b, left) {
	if (s.hand != s.def.handedit) {
		if (left) {
			d.hand = d.def.handrl;
			d.handfreq = 18;
		}
		else
		{
			d.hand = d.def.handlr;
			d.handfreq = 1.5;
		}
		b.map.control('generator').hand(s, d);
	} else {
		var f = d.handfreq;
		if (left) 
			f -= 0.1;
		else
			f += 0.1;
		var limit = false;
		if (f > 18)	{
			f = 18;
			limit = true;
		}
		if (f < 1.5) {
			f = 1.5;
			limit = true;
		}
		d.handfreq = f;
		if (limit) {
			d.handlimit = 1;
			setTimeout(function () {d.handlimit = 0;b.map.action(b, 'state_change');}, 200);
		}
	}
}

YAZ.handaply = function(d, s, b) {
	if (s.hand == s.def.handedit) {
		d.handapply = true;
		d.hand = 0;
	} else {
		d.signal_mode=d.def.sinf;
	}
}

YAZ.setsignalmode = function(d, s, sinf) {
	if (s.signal_mode != d.def.sin)
		d.signal_mode = d.def.sin;
	else
		d.signal_mode = d.def.impuls;
}

YAZ.getNumberSignal = function (n, t) {
	var r = {};
	if (n == 0)
		r = {t: n / 1, d: 0}
	else if (n > 999999999)
		r = {t: n / 1000000000, d: t.def.giga};
	else if (n > 999999)
		r = {t: n / 1000000, d: t.def.mega};
	else if (n > 999)
		r = {t: n / 1000, d: t.def.kilo};
	else if (n >= 1)
		r = {t: n / 1, d: 0}
	else if (n >= 0.001)
		r = {t: n * 1000, d: t.def.mili};
	else if (n >= 0.000001)
		r = {t: n * 1000000, d: t.def.micro};
	else
		r = {t: n * 1000000000, d: t.def.nano};
	r.t = r.t.toFixed(t.realnumber + 1);
	return r;
}


YAZ.mainIndicator = function (t) {
	if (!t.power) return {t: "", d: 0};
	if (t.up)	{
		if (t.mode_on == t.def.symbolControl)
			return {t: "888,8888888888", d: 0};
		if (t.mode_on == t.def.symbolCalibration)
			return {t: "099,9999999999", d: t.def.mega};
	}
	
	if (t.hand != 0) {
		if (t.handlimit) {
			return {t: '', d: t.def.giga};
		}
		var delim = String.fromCharCode(8852) + String.fromCharCode(8852);
		if (t.hand == t.def.handlr) {
			return {t: "1.5" + delim + "18.0", d: t.def.giga};
		}
		if (t.hand == t.def.handrl) {
			return {t: "18.0" + delim + "1.5", d: t.def.giga};
		}
		if (t.hand == t.def.handedit) {
			return {t: t.handfreq.toFixed(1), d: t.def.giga};
		}
	}
	
	
	if (t.timerCounter >= 0 && t.input != 0) {
		return YAZ.getNumberSignal(t.value, t);
	}
	return {t: "888,8888888888", d: 0};
}

YAZ.getStateIndicator = function(t, name) {
	m = {};
	m['indPower'] = t.power;
	
	m['indk'] = t.power && YAZ.mainIndicator(t).d == t.def.kilo;
	m['indM'] = t.power && YAZ.mainIndicator(t).d == t.def.mega;
	m['indG'] = t.power && YAZ.mainIndicator(t).d == t.def.giga;
	m['indmili'] = t.power && YAZ.mainIndicator(t).d == t.def.mili;
	m['indmicro'] = t.power && YAZ.mainIndicator(t).d == t.def.micro;
	m['indnano'] = t.power && YAZ.mainIndicator(t).d == t.def.nano;
	
	m['inds'] = t.power && t.metric == t.def.second;
	m['indHz'] = t.power && t.metric == t.def.hz;

	m['indUp'] = t.power && t.up && t.mode_on == t.def.symbolCalibration;
	
	m["indConnect"] = t.power && (!t.input);
	m["indOnline"] = true;
	m["indGoCounter"] = t.power && (!t.timerCounterOn || t.up && t.mode_on == t.def.symbolControl);
	
	
	m['indIM'] = t.power && (t.signal_mode == t.def.impuls || t.controlInd);
	m['indHand'] = t.power && (t.hand || t.controlInd || t.handapply);
	m['indReady'] = t.power && (t.ready || t.controlInd);
	m['indSinf'] = t.power && (t.signal_mode == t.def.sinf || t.controlInd);

	return m[name];
}


YAZ.eventNumber = function (state, state_new, digit) {
	if (!state.power) return;
	state_new.number_add = digit;
}

YAZ.inputEmptySignal = function () {
	return cp({freq: 0, sin: 0, sinf: 0});
}