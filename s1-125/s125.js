function DeviceS125(node, width, height) {
	DeviceS125.superclass.constructor.call(this, node, width, height);

	this.name = "s1-125";											// Название папки для поиска изображений
	this.title = 'Осцилограф С1-125';
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
	area.push({shape: "rect", key: "power", coords: "55,335,79,355", tooltip: "Кнопка включения прибора", hint_text: "Кнопка включения прибора"});
	
	area.push({shape: "rect", key: "shift", coords: "441,288,480,323", tooltip: "Кнопка переключения поля ввода", hint_text: "Кнопка переключения поля ввода"});
	area.push({shape: "rect", key: "0", coords: "230,264,268,299", tooltip: "Режим внутреннего запуска / Цифра 0", hint_text: "Режим внутреннего запуска / Цифра 0"});
	area.push({shape: "rect", key: "5", coords: "231,302,268,329", tooltip: "Набор / Цифра 5", hint_text: "Набор / Цифра 5"});
	area.push({shape: "rect", key: "T", coords: "232,333,267,354", tooltip: "Подключение аттенюатора 1 / Период", hint_text: "Подключение аттенюатора 1 / Период"});
	area.push({shape: "rect", key: "1", coords: "271,263,304,299", tooltip: "Внешний запуск импульсами положительной полярности / Цифра 1", hint_text: "Внешний запуск импульсами положительной полярности / Цифра 1"});
	area.push({shape: "rect", key: "6", coords: "271,303,303,328", tooltip: "Номер программы / Цифра 6", hint_text: "Номер программы / Цифра 6"});
	area.push({shape: "rect", key: "D", coords: "269,331,303,355", tooltip: "Подключение аттенюатора 2 / Временной сдвиг", hint_text: "Подключение аттенюатора 2 / Временной сдвиг"});
	area.push({shape: "rect", key: "2", coords: "309,265,338,297", tooltip: "Внешний запуск импульсами отрицательной полярности / Цифра 2", hint_text: "Внешний запуск импульсами отрицательной полярности / Цифра 2"});
	area.push({shape: "rect", key: "7", coords: "308,301,337,327", tooltip: "Режим автомата / Цифра 7", hint_text: "Режим автомата / Цифра 7"});
	area.push({shape: "rect", key: "R", coords: "309,330,335,354", tooltip: "Выходные импульсы положительной полярности / Длительность", hint_text: "Выходные импульсы положительной полярности / Длительность"});
	area.push({shape: "rect", key: "3", coords: "341,264,372,296", tooltip: "Разовый механический запуск / Цифра 3", hint_text: "Разовый механический запуск / Цифра 3"});
	area.push({shape: "rect", key: "8", coords: "340,301,370,325", tooltip: "Калибровка 1 / Цифра 8", hint_text: "Калибровка 1 / Цифра 8"});
	area.push({shape: "rect", key: "K", coords: "340,330,369,354", tooltip: "Выходные импульсы отрицательной полярности / Множитель для временных параметров", hint_text: "Выходные импульсы отрицательной полярности / Множитель для временных параметров"});
	area.push({shape: "rect", key: "4", coords: "375,261,407,299", tooltip: "Режим постоянного тока / Цифра 4", hint_text: "Режим постоянного тока / Цифра 4"});
	area.push({shape: "rect", key: "U", coords: "374,331,406,354", tooltip: "Сброс режимов АВТ, ▼1, ▼2, АТ1, АТ2 / Амплитуда", hint_text: "Сброс режимов АВТ, ▼1, ▼2, АТ1, АТ2 / Амплитуда"});
	area.push({shape: "rect", key: "9", coords: "374,301,406,327", tooltip: "Калибровка 2 / Цифра 9", hint_text: "Калибровка 2 / Цифра 9"});
	area.push({shape: "circle", key: "level", coords: "65,289,16", tooltip: "", hint_text: ""}); 	// Неизвестные элементы. Троицкий
	area.push({shape: "circle", key: "freq", coords: "573,271,6", tooltip: "", hint_text: ""});
	area.push({shape: "circle", key: "indAT1", coords: "142,252,5", tooltip: "Индикатор подключения аттенюатора 20дБ", hint_text: "Индикатор подключения аттенюатора 20дБ"});
	area.push({shape: "circle", key: "indAT2", coords: "178,251,5", tooltip: "Индикатор подключения аттенюатора 40дБ", hint_text: "Индикатор подключения аттенюатора 40дБ"});
	area.push({shape: "circle", key: "indInnerWork", coords: "251,251,6", tooltip: "Индикатор работы прибора в режиме внутреннего запуска", hint_text: "Индикатор работы прибора в режиме внутреннего запуска"});
	area.push({shape: "circle", key: "indExternalPulsePos", coords: "284,250,5", tooltip: "Индикатор работы прибора в режиме внешнего запуска импульсами положительной полярности или синусоидальным напряжением", hint_text: "Индикатор работы прибора в режиме внешнего запуска импульсами положительной полярности или синусоидальным напряжением"});
	area.push({shape: "circle", key: "indExternalPulseNeg", coords: "321,248,6", tooltip: "Индикатор работы прибора в режиме внешнего запуска импульсами отрицательной полярности или синусоидальным напряжением", hint_text: "Индикатор работы прибора в режиме внешнего запуска импульсами отрицательной полярности или синусоидальным напряжением"});
	area.push({shape: "circle", key: "indHand", coords: "354,248,5", tooltip: "Индикатор работы прибора в режиме разового механического запуска", hint_text: "Индикатор работы прибора в режиме разового механического запуска"});
	area.push({shape: "circle", key: "indDirect", coords: "391,247,5", tooltip: "Индикатор работы прибора в режиме постоянного тока", hint_text: "Индикатор работы прибора в режиме постоянного тока"});
	area.push({shape: "circle", key: "indOuterPulsePos", coords: "461,247,6", tooltip: "Индикатор работы прибора в режиме с выходными импульсами положительной полярности", hint_text: "Индикатор работы прибора в режиме с выходными импульсами положительной полярности"});
	area.push({shape: "circle", key: "indOuterPulseNeg", coords: "496,246,5", tooltip: "Индикатор работы прибора в режиме с выходными импульсами отрицательной полярности", hint_text: "Индикатор работы прибора в режиме с выходными импульсами отрицательной полярности"});
	area.push({shape: "circle", key: "indCalibration", coords: "530,246,5", tooltip: "Индикатор работы прибора в режиме калибровки", hint_text: "Индикатор работы прибора в режиме калибровки"});
	area.push({shape: "circle", key: "indShiftDown", coords: "460,337,6", tooltip: "Индикатор нижнего поля ввода", hint_text: "Индикатор нижнего поля ввода"});
	area.push({shape: "circle", key: "indShiftUp", coords: "459,275,6", tooltip: "Индикатор верхнего поля ввода", hint_text: "Индикатор верхнего поля ввода"});
	
	area.push({shape: "rect", key: "indT", coords: "60,130,151,160", tooltip: "Индикатор периода", hint_text: "Индикатор периода"});
	area.push({shape: "rect", key: "indD", coords: "180,130,239,160", tooltip: "Индикатор временного сдвига", hint_text: "Индикатор временного сдвига"});
	area.push({shape: "rect", key: "indR", coords: "280,130,339,160", tooltip: "Индикатор длительности", hint_text: "Индикатор длительности"});
	area.push({shape: "rect", key: "indK", coords: "381,130,414,160", tooltip: "Индикатор масштаба", hint_text: "Индикатор масштаба"});
	area.push({shape: "rect", key: "indU", coords: "440,130,520,160", tooltip: "Индикатор амплитуды", hint_text: "Индикатор амплитуды"});
	area.push({shape: "rect", key: "indP", coords: "550,130,570,160", tooltip: "Индикатор номера программы", hint_text: "Индикатор номера программы"});
	
	area.push({shape: "circle", key: "bouterpulse", coords: "145,342,15", tooltip: "Разъём подключения внешнего источника имульсного сигнала", hint_text: "Разъём подключения внешнего источника имульсного сигнала"});
	area.push({shape: "circle", key: "bcloclpulse", coords: "574,333,15", tooltip: "Разъём подключения синхроимпульса", hint_text: "Разъём подключения синхроимпульса"});
	
	area.push({shape: "circle", key: "levelRun", coords: "65,294,16", tooltip: "Ручное регулирование уровня внешнего запуска", hint_text: "Ручное регулирование уровня внешнего запуска"});

	return area;
}

DeviceS125.prototype.definitionControl = function () {
	var c = []

	
	
	c.push({key: 'power', cls: Button, param: 'd.power = !s.power; d.shiftUp=1; d.mode=0; d.at=0; d.outerPulse=d.def.outerPulsePos; d.calibration=0;d.T=0;d.D=0;d.R=0;d.K=0;d.U=0;d.calibration=0;d.set=0;d.param=0;d.set=0;d.tact=0,d.up=1'});

//c.push({key: 'power', cls: Button, param: 'd.power = !s.power; d.shiftUp=1; d.mode=0; d.at=0; d.outerPulse=d.def.outerPulsePos; d.calibration=0;d.T=3;d.D=0;d.R=1;d.K=0;d.U=1234;d.calibration=0;d.set=0;d.param=0;d.set=0;d.tact=0,d.up=1'});
	
	c.push({key: 'indShiftDown', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indShiftUp', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indInnerWork', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indExternalPulsePos', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indExternalPulseNeg', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indHand', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indDirect', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indAT1', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indAT2', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indOuterPulsePos', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indOuterPulseNeg', cls: IndicatorDiode, param: G5.getStateIndicator});
	c.push({key: 'indCalibration', cls: IndicatorDiode, param: G5.getStateIndicator});

	c.push({key: 'shift', cls: Button, param: 'd.shiftUp = !s.shiftUp'});
	c.push({key: '0', cls: Button, param: [{cond: 's.shiftUp', act: 'G5.modework(d, s, map, s.def.innerWork)'}, 
		'G5.eventNumber(s, d, 0)']});
	c.push({key: '1', cls: Button, param: [{cond: 's.shiftUp', act: 'G5.modework(d, s, map, s.def.externalPulsePos)'}, 
		{cond: '!s.shiftUp && s.set && !s.discharge', act: 'd.discharge=1'},
		'G5.eventNumber(s, d, 1)']});
	c.push({key: '2', cls: Button, param: [{cond: 's.shiftUp', act: 'G5.modework(d, s, map, s.def.externalPulseNeg)'},
		'G5.eventNumber(s, d, 2)']});
	c.push({key: '3', cls: Button, param: [{cond: 's.shiftUp', act: 'd.mode = s.def.hand;d.tact=0;map.control("generator").hand()'},
		'G5.eventNumber(s, d, 3)']});
	c.push({key: '4', cls: Button, param: [{cond: 's.shiftUp', act: 'G5.modework(d, s, map, s.def.direct)'},
		'G5.eventNumber(s, d, 4)']});
	c.push({key: '5', cls: Button, param: [{cond: 's.shiftUp&&s.param', act: 'd.set = 1;d.discharge=0'}, 
		'G5.eventNumber(s, d, 5)']});
	c.push({key: '6', cls: Button, param: [{cond: 's.shiftUp', act: 'd.param=s.def.pNP;d.set=0;d.discharge=0'},
		'G5.eventNumber(s, d, 6)']});
	c.push({key: '7', cls: Button, param: [{cond: 's.shiftUp', act: 'd.auto = 1'},
		'G5.eventNumber(s, d, 7)']});
	c.push({key: '8', cls: Button, param: [{cond: 's.shiftUp', act: 'd.calibration = 1'},
		'G5.eventNumber(s, d, 8)']});
	c.push({key: '9', cls: Button, param: [{cond: 's.shiftUp', act: 'd.calibration = 2'},
		'G5.eventNumber(s, d, 9)']});
	c.push({key: 'T', cls: Button, param: [{cond: 's.shiftUp', act: 'd.at = s.def.at1'}, 
		{cond: '!s.shifUp&&!s.auto', act: 'd.param=s.def.pT;d.set=0;d.discharge=0'}]});
	c.push({key: 'D', cls: Button, param: [{cond: 's.shiftUp', act: 'd.at = s.def.at2'},
		{cond: '!s.shifUp&&!s.auto', act: 'd.param=d.def.pD;d.set=0;d.discharge=0'}]});
	c.push({key: 'R', cls: Button, param: [{cond: 's.shiftUp', act: 'd.outerPulse = s.def.outerPulsePos'}, 
		{cond: '!s.shifUp&&!s.auto', act: 'd.param=d.def.pR;d.set=0;d.discharge=0'}]});
	c.push({key: 'K', cls: Button, param: [{cond: 's.shiftUp', act: 'd.outerPulse = s.def.outerPulseNeg'}, 
		{cond: '!s.shifUp&&!s.auto', act: 'd.param=d.def.pK;d.set=0;d.discharge=0'}]});
	c.push({key: 'U', cls: Button, param: [{cond: 's.shiftUp', act: 'd.auto = 0;  d.calibration = 0, d.at = 0'}, 
		{cond: '!s.shifUp&&!s.auto', act: 'd.param=s.def.pU;d.set=0;d.discharge=0'}]});
	
	
	c.push({key: 'indT', cls: IndicatorNumber, param: {cond: 't.power', val: 't.T', int: 2, fract: 1}});
	c.push({key: 'indD', cls: IndicatorNumber, param: {cond: 't.power', val: 't.D', int: 2, fract: 1}});
	c.push({key: 'indR', cls: IndicatorNumber, param: {cond: 't.power', val: 't.R', int: 2, fract: 1}});
	c.push({key: 'indK', cls: IndicatorNumber, param: {cond: 't.power', val: 't.K', int: 1, fract: 0}});
	c.push({key: 'indU', cls: IndicatorNumber, param: {cond: 't.power', val: 't.U', int: 1, fract: 3}});
	c.push({key: 'indP', cls: IndicatorNumber, param: {cond: 't.power', val: 't.np', int: 1, fract: 0}});
	
	c.push({key: 'generator', cls: G5.Generator, param: null});
	c.push({key: 'graph', cls: GraphVisio, param: null});
	c.push({key: 'recomend', cls: Recomend, param: null});
	

	c.push({key: 'bcloclpulse', cls: ButtonBoxImage, param: {act: 'd.clockpulseInput=!s.clockpulseInput', on: 't.clockpulseInput', image_on: "g5/g5-in2.png;41;53", image_off: null}});
	c.push({key: 'bouterpulse', cls: ButtonBoxImage, param: {act: 'd.outerpulseInput=!s.outerpulseInput', on: 't.outerpulseInput', image_on: "g5/g5-in2.png;41;53", image_off: null}});

	// Мои компоненты. Троицкий
	c.push({key: 'menu', cls: Menu, param: null});
	c.push({key: 'tutor', cls: Tutor, param: null});
	
	c.push({key: 'levelRun', cls: Reostat, param: {action: 'd.levelRun=val', options: {minAngle: 0, maxAngle: 360, angleOffset: -90, angle: 360, minValue: 0, maxValue: 10}, ropt: {cont: {opacity: 0}, ind: {fill: 'red'}, indr: 3, inddr: -11}}});
	
	return c;
}

var G5 = {};

G5.modework = function(d, s, map, mode) {
	d.mode = mode;
	map.control("generator").hand();
}
	
G5.getStateIndicator = function(t, name) {
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

G5.saveProgram = function saveProgram(state, state_new) {
	var p = state_new.p[state.np];
	var ap = ['T', 'D', 'R', 'K', 'U'];
	for(var i = 0; i < ap.length; i++) {
		var key = ap[i];
		p[key] = state_new[key];
	}
}

G5.loadProgram = function (state, state_new) {
	var p = state.p[state_new.np];
	var ap = ['T', 'D', 'R', 'K', 'U'];
	for(var i = 0; i < ap.length; i++) {
		var key = ap[i];
		state_new[key] = p[key];
	}
	state_new.tact=0;
}

G5.eventNumber = function (state, state_new, digit) {
	if (state.shiftUp) return;
	if (state.auto) return;
	if (state.set && !state.discharge && digit >= 1 && digit <= 4) {
			state_new.discharge = digit;
		return;
	}
	if (state.set && state.discharge && state.param != state.def.pNP) {
		G5.changeNumber(state, state_new, digit);
		return;
	}
	
	if (!state.set && state.param != state.def.pNP && state.param != 0) {
		var p = state.def.pvalue[state.param];
		if (state.discharge + 1 > p.count) return;
		state_new.discharge ++;
		
		state_new[p.name] = changeNumberDigit(state[p.name], digit, state_new.discharge, p.count);
		
		G5.saveProgram(state, state_new);
		state_new.tact=0;
		return;
	}
	
	if (state.param == state.def.pNP) {
		state_new.np = digit;
		G5.loadProgram(state, state_new);
		return;
	}		
}

G5.getTranslateDigitNumber = function (discharge, max) {
	if (discharge == 4) return 1;
	return discharge + 1;
}

G5.changeNumber = function (state, state_new, digit) {
	var p = state.def.pvalue[state.param];
	var number_digit = G5.getTranslateDigitNumber(state.discharge, p.count);
	state_new[p.name] = changeNumberDigit(state[p.name], digit, number_digit, p.count);
	G5.saveProgram(state, state_new);
	state_new.tact=0;
}

 G5.getNumber = function(state) {
	var p = state.def.pvalue[state.param];
	var number_digit = G5.getTranslateDigitNumber(state.discharge, p.count);
	return getNumberDigit(state[p.name], number_digit, p.count); }