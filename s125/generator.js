S125.Generator = function (name, param) {
	S125.Generator.superclass.constructor.call(this, name, param);
}

extend(S125.Generator, Logic);

S125.Generator.prototype.setMap = function (map) {
	S125.Generator.superclass.setMap.call(this, map);

	map.addListener('stop', this, function() {
		this.stopSignal();
		this.stopAuto();
	}.bind(this))

	map.addListener('start', this, function() {
		this.stopSignal();
		this.stopAuto();
		this.startSignal();
	}.bind(this))

	map.addListener('button_click', this, function() {
		if (!map.state.power) return;
		map.action(this, 'state_change');
	}.bind(this));
}

S125.Generator.prototype.startSignal = function() {
  // Интервал проверки сигнала (генерации графика)
	var interval = 500;

	this.timerSignal = setInterval(function() {
		var state = this.map.state;
    // Если прибор выключен то ничего не делаем
    console.log(state.connectedSignalA)
		if (state.power == 0 || state.connectedSignalA == 0) {
      return;
    // Если какой то режим (надо посмотреть какой), то генерируем график
    // агада, приходит из s125.js definitionControl, при нажатии на кнопку повера
    } else if (state.mode == 0) {
      return this.signal();
    }

	}.bind(this), interval );
}

S125.Generator.prototype.stopSignal = function() {
	clearInterval(this.timerSignal);
}

S125.Generator.prototype.stopAuto = function() {
	clearInterval(this.timerAuto);
}

// Здесь в этой функции идет основное преобразование координаты X в Y
S125.Generator.prototype.yFunction = function(x, state) {

  // Получаем функцию входного импульса и применяем ее
  var y = state.inputPulseFn(x);

  // Если включен переключатель инвертирования, то инвертируем график
 	if (state.inversion == true) {
 		y = y * -1;
 	}

  // Если подключена "Земля"
 	if (state.earth == true) {
 		y = 0;
 	}

  // Если канал А закрыт. Если у кого-то есть идеи как это сделать лучше - велкам.
  if (state.closed == true) {
    y = -2000000;
  }

  // Добавляем смещение по вертикали
  y += state.vertical_offset;

 return y;
}

// Функция для получения импульса A канала
// Здесь пока захардкожена синусоида, надо будет динамически получать
S125.Generator.prototype.getAOptions = function() {
  var state = this.map.state;
  return {
    inputPulseFn: function(x) { return 5 * Math.sin(x); },
    inversion: state.inversion,
    earth: state.earthA,
    closed: state.closed,
    vertical_offset: state.vertical_offset
  };
}

// Функция для получения импульса B канала
S125.Generator.prototype.getBOptions = function() {
  var state = this.map.state;
  return {
    inputPulseFn: function(x) { return 3 * Math.cos(x); },
    inversion: state.inversion,
    earth: state.earthA,
    closed: state.closed,
    vertical_offset: state.vertical_offset
  };
}

S125.Generator.prototype.generatePlot = function(options, color) {
  // Максимальное значение по X
  var MAX_X = 14;
  // Шаг по X
  var STEP_X = 0.5;

  var points = [];
  for (var i = 0; i < MAX_X; i += STEP_X) {
    points.push([ i, this.yFunction(i, options) ]);
  }

  return {data: points, lines: {fill: false}, color: color};
}

// Здесь идет генерация точек для графика
S125.Generator.prototype.signal = function() {
  var state = this.map.state;

  var colorA =  0; //"#33CC66";
  var colorB =  1; //"#43CC86";

  var graphics = [];

  // if (state.openA == 1) {
  var plotA = this.generatePlot(this.getAOptions(), colorA);
  graphics.push(plotA);
  // }

  // if (state.openB == 1) {
  var plotB = this.generatePlot(this.getBOptions(), colorB);
  graphics.push(plotB);
  // }

  this.map.action(this, 'signal', graphics);
}
