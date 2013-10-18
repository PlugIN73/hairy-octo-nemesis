function DeviceC3(node, width, height) {
	DeviceC3.superclass.constructor.call(this, node, width, height);
	this.state = {
		power: 0, up:0, mode_on: 0, realnumber: 0, number_add: 0, inputA: 0, fa: 0, 
		booster: 0, metric: 0, inputB: 0, aFrontPlus: 0, bFrontPlus: 0, inputC: 0,
		periodLess10m: 0, levelA: 0, levelB: 0, minim: 0, timerBegin: 0, value: 0,
		timerCounter: 0, timerCounterOn: 0, degree: 0, butV: 0,
		ac: {x: 1, om: 50, toque: 0}, abplus: 1,
		def: {symbolControl: 1, symbolOver: 2, symbolCalibration: 3, symbolMinus: 4, toqueVar: 5, toqueConst: 6, 
			freq : 7, period: 8, duration: 9, kilo: 12, mega: 13, giga: 14, mili: 15, micro:16, nano: 17, second: 18, hz: 19, fc: 20, tab: 21, fadivb: 22, fadivc: 23, abplus: 24}
	};
	
	this.state.ac.toque = this.state.def.toqueConst;
	this.state.bc = cp(this.state.ac);
	
	this.state.signal = C3.inputEmptySignal();
	this.state.signalAbuf = C3.inputEmptySignal();
	this.state.signalBbuf = C3.inputEmptySignal();
	this.state.signalCbuf = C3.inputEmptySignal();
	
	this.start_state = jQuery.extend(true, {}, this.state);

	this.state_time_variables = ["timerCounterOn", "timerCounter"];
	this.InitEx(); 												// загрузить упражнения из файла c3 exercises.js
	this.name = "c3";											// Название папки для поиска изображений
	this.title = 'Частотомер Ч3-64';
}

extend(DeviceC3, Map);


DeviceC3.prototype.getArea = function () {
	var as = this.getAreaPre();
	//return as;
	var maxx = 594;
	var dy = 306;
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

DeviceC3.prototype.getAreaPre = function () {
	var area = [];
	area.push({shape: "circle", key: "power", coords: "71,254,22", tooltip: "Кнопка включения прибора", hint_text: "Кнопка включения прибора"});
	area.push({shape: "rect", key: "x", coords: "172,135,198,166", tooltip: "Сброс", hint_text: "Сброс"});
	area.push({shape: "rect", key: "0", coords: "205,136,234,166", tooltip: "0", hint_text: "0"});
	area.push({shape: "rect", key: "1", coords: "243,135,270,162", tooltip: "1", hint_text: "1"});
	area.push({shape: "rect", key: "2", coords: "276,137,303,167", tooltip: "2", hint_text: "2"});
	area.push({shape: "rect", key: "3", coords: "307,137,336,168", tooltip: "3", hint_text: "3"});
	area.push({shape: "rect", key: "up", coords: "343,136,371,167", tooltip: "Контроль", hint_text: "Контроль"});
	area.push({shape: "rect", key: "controlInd", coords: "380,134,410,169", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "scale", coords: "167,184,197,215", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "program", coords: "203,184,232,216", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "4", coords: "235,185,267,219", tooltip: "4", hint_text: "4"});
	area.push({shape: "rect", key: "5", coords: "273,183,300,219", tooltip: "5", hint_text: "5"});
	area.push({shape: "rect", key: "6", coords: "308,186,336,219", tooltip: "6", hint_text: "6"});
	area.push({shape: "rect", key: "down", coords: "341,190,371,220", tooltip: "Калибровка", hint_text: "Калибровка"});
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
	area.push({shape: "rect", key: "fA", coords: "682,138,717,172", tooltip: "Измерение частоты по каналу А", hint_text: "Измерение частоты по каналу А"});
	//area.push({shape: "rect", key: "1/fA", coords: "728,142,757,172", tooltip: "Текст подсказки", hint_text: ""});			// Поменял название для того чтобы работали картинки. Троицкий
	area.push({shape: "rect", key: "fA^-1", coords: "728,142,757,172", tooltip: "Измерение периода по каналу А", hint_text: "Измерение периода по каналу А"});
	area.push({shape: "rect", key: "fB", coords: "767,141,795,175", tooltip: "Измерение частоты по каналу В", hint_text: "Измерение частоты по каналу В"});
	area.push({shape: "rect", key: "tA-b", coords: "808,140,837,174", tooltip: "Измерение интервалов времени по каналам А и Б", hint_text: "Измерение интервалов времени по каналам А и Б"});
	area.push({shape: "rect", key: "ta", coords: "848,141,873,173", tooltip: "Измерение интервалов времени по каналу А", hint_text: "Измерение интервалов времени по каналу А"});
	//area.push({shape: "rect", key: "fb/fA", coords: "886,143,912,176", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "rect", key: "fbfA^-1", coords: "886,143,912,176", tooltip: "Измерение отношения частот по каналам Б и А ", hint_text: "Измерение отношения частот по каналам Б и А "});			// Поменял название для того чтобы работали картинки. Троицкий
	area.push({shape: "rect", key: "but!", coords: "924,141,953,176", tooltip: "Режим суммы или разности числа колебаний", hint_text: "Режим суммы или разности числа колебаний"});
	area.push({shape: "rect", key: "^a", coords: "963,141,994,178", tooltip: "Ограничение по частоте", hint_text: "Ограничение по частоте"});
	area.push({shape: "rect", key: "V", coords: "1005,144,1036,176", tooltip: "Устновка уровня", hint_text: "Устновка уровня"});

	area.push({shape: "rect", key: "indCounter", coords: "980,58,1074,92", tooltip: "Время счета", hint_text: "Время счета"});
	
	
	
	/*
	area.push({shape: "circle", key: "indax1x10_x1", coords: "712,202,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indax1x10_x10", coords: "712,219,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indaom_50", coords: "739,238,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indaom_1", coords: "740,286,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indToqueVar", coords: "827,231,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indToqueConst", coords: "826,292,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indbx1x10_x1", coords: "1017,192,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indbx1x10_x10", coords: "1017,233,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indbom_50", coords: "978,241,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indbom_1", coords: "978,287,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indFrontB+", coords: "1018,246,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indFrontB-", coords: "1019,286,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indToqueVarB", coords: "893,240,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indToqueConstB", coords: "895,283,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indFrontA+", coords: "702,243,5", tooltip: "Текст подсказки", hint_text: ""});
	area.push({shape: "circle", key: "indFrontA-", coords: "702,283,5", tooltip: "Текст подсказки", hint_text: ""});
	*/
	area.push({shape: "circle", key: "inputA", coords: "787,263,19", tooltip: "Разъем подключения сигнала А", hint_text: "Разъем подключения сигнала А"});
	area.push({shape: "rect", key: "ax1x10", coords: "695,196,706,224", tooltip: "Переключатель коэффициента ослабления входного аттенюатора для входа А", hint_text: "Переключатель коэффициента ослабления входного аттенюатора для входа А"});
	area.push({shape: "rect", key: "aOm", coords: "737,246,751,275", tooltip: "Переключатель входного сопративления для входа А", hint_text: "Переключатель входного сопративления для входа А"});
	area.push({shape: "rect", key: "aToque", coords: "823,245,835,290", tooltip: "Перключатель связи с измеряемым сигналом для входа А", hint_text: "Перключатель связи с измеряемым сигналом для входа А"});
	
	
	area.push({shape: "rect", key: "bx1x10", coords: "1009,199,1023,227", tooltip: "Переключатель коэффициента ослабления входного аттенюатора для входа Б", hint_text: "Переключатель коэффициента ослабления входного аттенюатора для входа Б"});
	area.push({shape: "rect", key: "bOm", coords: "973,248,984,275", tooltip: "Переключатель входного сопративления для входа Б", hint_text: "Переключатель входного сопративления для входа Б"});
	area.push({shape: "rect", key: "bfront", coords: "1011,249,1023,276", tooltip: "Переключатель фронта входного сигнала для входа Б", hint_text: "Переключатель фронта входного сигнала для входа Б"});
	area.push({shape: "rect", key: "bToque", coords: "889,246,899,276", tooltip: "Перключатель связи с измеряемым сигналом для входа Б", hint_text: "Перключатель связи с измеряемым сигналом для входа Б"});
	area.push({shape: "rect", key: "afront", coords: "695,246,707,275", tooltip: "Переключатель фронта входного сигнала для входа А", hint_text: "Переключатель фронта входного сигнала для входа А"});
	
	
	area.push({shape: "circle", key: "inputB", coords: "939,264,19", tooltip: "Разъем подключения сигнала Б", hint_text: "Разъем подключения сигнала Б"});
	
	area.push({shape: "circle", key: "inputC", coords: "1071,262,19", tooltip: "Разъем подключения сигнала В", hint_text: "Разъем подключения сигнала В"});
	
	area.push({shape: "rect", key: "indPeriod", coords: "891,59,1010,88", tooltip: "", hint_text: ""});
	area.push({shape: "rect", key: "indfadivc", coords: "887,97,917,118", tooltip: "Индикатор отношения частот сигналов по входам А и В", hint_text: "Индикатор отношения частот сигналов по входам А и В"});

	area.push({shape: "rect", key: "indGoCounter", coords: "61,39,82,54", tooltip: "Индикатор произведения счета", hint_text: "Индикатор произведения счета"});
	area.push({shape: "rect", key: "indConnect", coords: "62,57,77,73", tooltip: "Индикатор отсутствия сигнала", hint_text: "Индикатор отсутствия сигнала"});
	area.push({shape: "rect", key: "indOnline", coords: "57,94,75,114", tooltip: "Индикатор кварцевого генератора", hint_text: "Индикатор кварцевого генератора"});
	area.push({shape: "rect", key: "indText", coords: "119,54,119,88", tooltip: "Текст подсказки", hint_text: ""});

	area.push({shape: "circle", key: "levelA", coords: "790,210,20", tooltip: "Ручка уровня запуска формирующего устройства для входа А", hint_text: "Ручка уровня запуска формирующего устройства для входа А"});
	area.push({shape: "circle", key: "levelB", coords: "948,210,20", tooltip: "Ручка уровня запуска формирующего устройства для входа Б", hint_text: "Ручка уровня запуска формирующего устройства для входа Б"});

	area.push({shape: "circle", key: "indlevelA-", coords: "749,213,6", tooltip: "Индкатор уровня запуска формирующего устройства для входа А меньше 0", hint_text: "Индкатор уровня запуска формирующего устройства для входа А меньше 0"});
	area.push({shape: "circle", key: "indlevelA+", coords: "820,212,6", tooltip: "Индкатор уровня запуска формирующего устройства для входа А больше 0", hint_text: "Индкатор уровня запуска формирующего устройства для входа А больше 0"});
	area.push({shape: "circle", key: "indlevelB-", coords: "899,212,6", tooltip: "Индкатор уровня запуска формирующего устройства для входа Б меньше 0", hint_text: "Индкатор уровня запуска формирующего устройства для входа Б меньше 0"});
	area.push({shape: "circle", key: "indlevelB+", coords: "972,213,6", tooltip: "Индкатор уровня запуска формирующего устройства для входа Б больше 0", hint_text: "Индкатор уровня запуска формирующего устройства для входа Б больше 0"});

	
	area.push({shape: "circle", key: "indPower", coords: "70,205,8", tooltip: "Индикатор питания прибора", hint_text: "Индикатор питания прибора"});
	area.push({shape: "rect", key: "booster", coords: "1040,201,1090,227", tooltip: "Разъем для питания усилителя", hint_text: "Разъем для питания усилителя"});
	
	area.push({shape: "rect", key: "a+b", coords: "704,72,749,98", tooltip: "Переключатель суммы сигналов (задняя панель прибора)", hint_text: "Переключатель суммы сигналов (задняя панель прибора)"});
	area.push({shape: "rect", key: "a-b", coords: "761,72,802,98", tooltip: "Переключатель разности сигналов (задняя панель прибора)", hint_text: "Переключатель разности сигналов (задняя панель прибора)"});


	return area;
}

DeviceC3.prototype.definitionControl = function () {
	var c = [];
	c.push({key: 'levelA', cls: Reostat, param: {action: 'd.levelA=val', options: {minAngle: 0, angle: 90, minValue: -1000, maxValue: 1000}, ropt: {cont: {opacity: 0}, ind: {fill: 'red'}, indr: 3, inddr: -13}}});
	c.push({key: 'levelB', cls: Reostat, param: {action: 'd.levelB=val', options: {minAngle: 0, angle: 90, minValue: -1000, maxValue: 1000}, ropt: {cont: {opacity: 0}, ind: {fill: 'red'}, indr: 3, inddr: -13}}});
	
	c.push({key: 'power', cls: Button, param: 	'd.power=!s.power;d.up=1;d.mode_on=d.def.symbolControl;d.fa=0;d.number_add=5;d.metric=0;'});

	c.push({key: 'indSymbol', cls: IndicatorText, param: {cond: 't.power&&t.mode_on', 
		val: 'switch(t.mode_on) {case t.def.symbolControl: "A";break; case t.def.symbolOver: "8";break; case t.def.symbolCalibration: String.fromCharCode(8847);break; case t.def.symbolMinus: String.fromCharCode(8852);break;}'}});
		
	/*	
	c.push({key: 'indSymbol', cls: IndicatorText, param: {cond: 't.power&&t.mode_on', 
		val: 'switch(t.mode_on) {case t.def.symbolControl: String.fromCharCode(8847);break; default: ""; break;}'}});
		*/

	c.push({key: 'indCounter', cls: IndicatorNumber, param: {cond: 't.power', val: 't.number_add', int: 1, fract: 0}});
	
	c.push({key: 'indText', cls: IndicatorText, param: {cond: true, val: 'C3.mainIndicator(t).t', attr: {'text-anchor': 'start'}}});
		
	c.push({key: 'indPower', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indlevelA-', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indlevelA+', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indlevelB-', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indlevelB+', cls: IndicatorDiode, param: C3.getStateIndicator});
	
	c.push({key: 'indmili', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indk', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'inds', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indmicro', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indM', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indHz', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indnano', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indG', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indV', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indExternal', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indUp', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	
	/*
	c.push({key: 'indax1x10_x1', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indax1x10_x10', cls: IndicatorDiode, param: C3.getStateIndicator});
	c.push({key: 'indaom_50', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indaom_1', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indToqueVar', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indToqueConst', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indFrontA+', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indFrontA-', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	
	c.push({key: 'indbx1x10_x1', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indbx1x10_x10', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indbom_50', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indbom_1', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indToqueVarB', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indToqueConstB', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indFrontB+', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indFrontB-', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	*/
	
	c.push({key: 'indConnect', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indOnline', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indGoCounter', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	c.push({key: 'indfadivc', cls: IndicatorDiodeOpacity, param: C3.getStateIndicator});
	
	
	c.push({key: '0', cls: Button, param: 'C3.eventNumber(s, d, 0)'});
	c.push({key: '1', cls: Button, param: 'C3.eventNumber(s, d, 1)'});
	c.push({key: '2', cls: Button, param: 'C3.eventNumber(s, d, 2)'});
	c.push({key: '3', cls: Button, param: 'C3.eventNumber(s, d, 3)'});
	c.push({key: '4', cls: Button, param: 'C3.eventNumber(s, d, 4)'});
	c.push({key: '5', cls: Button, param: 'C3.eventNumber(s, d, 5)'});
	c.push({key: '6', cls: Button, param: 'C3.eventNumber(s, d, 6)'});
	c.push({key: '7', cls: Button, param: 'C3.eventNumber(s, d, 7)'});
	c.push({key: '8', cls: Button, param: 'C3.eventNumber(s, d, 8)'});
	c.push({key: '9', cls: Button, param: 'C3.eventNumber(s, d, 9)'});
	
	c.push({key: 'ax1x10', cls: ButtonBoxImage, param: {act: 'd.ac.x = (s.ac.x == 1) ? 10 : 1', on: 't.ac.x == 1', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'aOm', cls: ButtonBoxImage, param: {act: 'd.ac.om = (s.ac.om == 1) ? 50 : 1', on: 't.ac.om == 50', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'afront', cls: ButtonBoxImage, param: {act: 'd.aFrontPlus=!s.aFrontPlus', on: 't.aFrontPlus', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'aToque', cls: ButtonBoxImage, param: {act: 'd.ac.toque = (s.ac.toque == s.def.toqueVar) ? s.def.toqueConst : s.def.toqueVar', on: 't.ac.toque==t.def.toqueVar', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	
	c.push({key: 'inputA', cls: ButtonBoxImage, param: {act: 'map.control("inputGenerator").action(d, s, b)', on: 't.inputA', image_on: "c3/in.png;40;47", image_off: null}});
	c.push({key: 'inputB', cls: ButtonBoxImage, param: {act: 'map.control("inputGenerator").action(d, s, b)', on: 't.inputB', image_on: "c3/inB.png;46;55", image_off: null}});
	c.push({key: 'inputC', cls: ButtonBoxImage, param: {act: 'map.control("inputGenerator").action(d, s, b)', on: 't.inputC', image_on: "c3/inB.png;46;55", image_off: null}});
	
	
	c.push({key: 'bx1x10', cls: ButtonBoxImage, param: {act: 'd.bc.x = (s.bc.x == 1) ? 10 : 1', on: 't.bc.x == 1', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'bOm', cls: ButtonBoxImage, param: {act: 'd.bc.om = (s.bc.om == 1) ? 50 : 1', on: 't.bc.om == 50', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'bfront', cls: ButtonBoxImage, param: {act: 'd.bFrontPlus=!s.bFrontPlus', on: 't.bFrontPlus', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	c.push({key: 'bToque', cls: ButtonBoxImage, param: {act: 'd.bc.toque = (s.bc.toque == s.def.toqueVar) ? s.def.toqueConst : s.def.toqueVar', on: 't.bc.toque==t.def.toqueVar', image_on: "c3/butTop.png;15;29", image_off: "c3/butDown.png;15;29"}});
	
	//c.push({key: 'bfront', cls: Button, param: 'd.bFrontPlus=!s.bFrontPlus'});
	//c.push({key: 'bx1x10', cls: Button, param: 'd.bc.x = (s.bc.x == 1) ? 10 : 1'});
	//c.push({key: 'bOm', cls: Button, param: 'd.bc.om = (s.bc.om == 1) ? 50 : 1'});
	//c.push({key: 'bToque', cls: Button, param: 'd.bc.toque = (s.bc.toque == s.def.toqueVar) ? s.def.toqueConst : s.def.toqueVar'});
	
	c.push({key: '^a', cls: ButtonBox, param: {cond: 's.power', act: 'd.periodLess10m=!s.periodLess10m;', on: 't.power&&t.periodLess10m'}});
	c.push({key: 'V', cls: ButtonBox, param: {cond: 's.power', act: 'd.V=1;', on: 't.power&&t.V'}});
	
	c.push({key: 'booster', cls: ButtonBox, param: {cond: '1', act: 'd.booster=!s.booster;', on: 't.booster'}});
	c.push({key: 'min', cls: ButtonBox, param: {cond: 's.power', act: 'd.minim=!s.minim;', on: 't.minim'}});
	
	c.push({key: 'a+b', cls: ButtonBox, param: {cond: '1', act: 'd.abplus=1;', on: 't.abplus', top: 1}});
	c.push({key: 'a-b', cls: ButtonBox, param: {cond: '1', act: 'd.abplus=0;', on: '!t.abplus', top: 1}});	
	
	c.push({key: 'fA', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.freq)', on: 't.power&&t.fa==t.def.freq'}});
	//c.push({key: '1/fA', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.period)', on: 't.power&&t.fa==t.def.period'}});
	c.push({key: 'fA^-1', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.period)', on: 't.power&&t.fa==t.def.period'}});		// Поменял название для того чтобы работали картинки. Троицкий
	c.push({key: 'ta', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.duration)', on: 't.power&&t.fa==t.def.duration'}});
	c.push({key: 'fB', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.fc)', on: 't.power&&t.fa==t.def.fc'}});
	//c.push({key: 'fb/fA', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.fadivb)', on: 't.power&&(t.fa==t.def.fadivb||t.fa==t.def.fadivc)'}});
	c.push({key: 'fbfA^-1', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.fadivb)', on: 't.power&&(t.fa==t.def.fadivb||t.fa==t.def.fadivc)'}});		// Поменял название для того чтобы работали картинки. Троицкий
	c.push({key: 'but!', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.abplus)', on: 't.power&&t.fa==t.def.abplus'}});
	c.push({key: 'tA-b', cls: ButtonBox, param: {act: 'C3.runGenerator(map, d, s, s.def.tab)', on: 't.power&&t.fa==t.def.tab'}});
	
	c.push({key: 'x', cls: Button, param: {cond: 's.power', act: 'd.minim=0;d.periodLess10m=0;d.fa=0'}});
		
	c.push({key: 'generator', cls: C3.Generator, param: null});

	// Мои компоненты. Троицкий
	c.push({key: 'menu', cls: Menu, param: null});
	c.push({key: 'tutor', cls: Tutor, param: null});
	return c;
}

var C3 = {}

C3.runGenerator = function(map, d, s, param) {
	if (param == s.def.fadivb) {
		d.fa = (d.fa == s.def.fadivb) ? s.def.fadivc : s.def.fadivb;
	} else
		d.fa = param;
}

C3.getNumberSignal = function (n, t) {
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


C3.mainIndicator = function (t) {
	if (!t.power) return {t: "", d: 0};
	if (t.up)	{
		if (t.mode_on == t.def.symbolControl)
			return {t: "888,8888888888", d: 0};
		if (t.mode_on == t.def.symbolCalibration)
			return {t: "099,9999999999", d: t.def.mega};
	}
	
	if (t.V) {
		var s = '---';
		s +=  t.levelA < 0 ? '_' : ' ';
		s += zeroFill(Math.abs(t.levelA), 4, 0)
		s +=  t.levelB < 0 ? '_' : ' ';
		s += zeroFill(Math.abs(t.levelB), 4, 0)
		return {t: s, d: 0};
	}
	
	if (t.timerCounter >= 0 && t.fa != 0) {
		return C3.getNumberSignal(t.value, t);
	}
	return {t: "888,8888888888", d: 0};
}

C3.getStateIndicator = function(t, name) {
	m = {};
	m['indPower'] = t.power;
	
	m['indk'] = t.power && C3.mainIndicator(t).d == t.def.kilo;
	m['indM'] = t.power && C3.mainIndicator(t).d == t.def.mega;
	m['indG'] = t.power && C3.mainIndicator(t).d == t.def.giga;
	m['indmili'] = t.power && C3.mainIndicator(t).d == t.def.mili;
	m['indmicro'] = t.power && C3.mainIndicator(t).d == t.def.micro;
	m['indnano'] = t.power && C3.mainIndicator(t).d == t.def.nano;
	
	m['inds'] = t.power && t.metric == t.def.second;
	m['indHz'] = t.power && t.metric == t.def.hz;
	/*
	
	m['indV'] = t.power && t.up;
	*/
	m['indUp'] = t.power && t.up && t.mode_on == t.def.symbolCalibration;
	
	//m['indExternal'] = t.power && t.up;
	
	
	m['indfadivc'] = t.power && t.fa == t.def.fadivc;

	m['indlevelA-'] = t.power && t.levelA < 0;
	m['indlevelA+'] = t.power && t.levelA >= 0;
	m['indlevelB-'] = t.power && t.levelB < 0;
	m['indlevelB+'] = t.power && t.levelB >= 0;
	
	/*
	m["indax1x10_x1"] = t.ac.x == 1;
	m["indax1x10_x10"] = t.ac.x == 10;
	m["indaom_50"] = t.ac.om == 50;
	m["indaom_1"] = t.ac.om == 1;
	m["indToqueVar"] = t.ac.toque == t.def.toqueVar;
	m["indToqueConst"] = t.ac.toque == t.def.toqueConst;
	m["indFrontA+"] = t.aFrontPlus;
	m["indFrontA-"] =!t.aFrontPlus;
	
	m["indbx1x10_x1"] = t.bc.x == 1;
	m["indbx1x10_x10"] = t.bc.x == 10;
	m["indbom_50"] = t.bc.om == 50;
	m["indbom_1"] = t.bc.om == 1;
	m["indToqueVarB"] = t.bc.toque == t.def.toqueVar;
	m["indToqueConstB"] = t.bc.toque == t.def.toqueConst;
	m["indFrontB+"] = t.bFrontPlus;
	m["indFrontB-"] = !t.bFrontPlus;
	*/
	
	
	m["indConnect"] = t.power && !(t.inputA || t.inputB || t.inputC);
	m["indOnline"] = true;
	m["indGoCounter"] = t.power && (!t.timerCounterOn || t.up && t.mode_on == t.def.symbolControl);

	return m[name];
}


C3.eventNumber = function (state, state_new, digit) {
	if (!state.power) return;
	state_new.number_add = digit;
}

C3.inputEmptySignal = function () {
	return cp({freq: 0, period: 0, v: 0, duration: 0, sin: 0, offset: 0});
}