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
	this.timerSignal = setInterval(this.signal.bind(this), 500);
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

  // Добавляем амплитуду
  y *= state.amp;

  // Если включен переключатель инвертирования, то инвертируем график
 	if (state.inversionA) {
 		y = y * -1;
 	}

  // Если подключена "Земля"
 	if (state.earth) {
 		y = 0;
 	}

  // Добавляем смещение по вертикали
  y += state.vertical;

 return y;
}

// Функция для получения импульса A канала
// Здесь пока захардкожена синусоида, надо будет динамически получать
S125.Generator.prototype.getAOptions = function() {
  var formula_signalA = document.getElementById('signalA');
  var state = this.map.state;
  return {
    inputPulseFn: function(x) { return Math.sin(x); },
    inversionA: state.inversionA,
    earth: state.earthA,
    closed: state.closedA,
    vertical: state.verticalA,
    amp: state.ampA / 1000,
    gorizont: state.gorizont
  };
}

// Функция для получения импульса B канала
S125.Generator.prototype.getBOptions = function() {
  var formula_signalB = document.getElementById('signalB')
  var state = this.map.state;
  return {
    inputPulseFn: function(x) { return -Math.sin(x); },
    inversionA: state.inversionA,
    earth: state.earthB,
    closed: state.closedB,
    vertical: state.verticalB,
    amp: state.ampB / 1000,
    gorizont: state.gorizont
  };
}

S125.Generator.prototype.generatePlot = function(options, color) {
  // Максимальное oзначение по X
  var MAX_X = 14;
  // Шаг по X
  var STEP_X = 0.5;

  var points = [];
  for (var i = 0; i < MAX_X + 0; i += STEP_X) {
    points.push([ i, this.yFunction(i + options.gorizont, options) ]);
  }

  return {data: points, lines: {fill: false}, color: color};
}

// Функция для генерирования алгебраич. суммы 2ух графиков
S125.Generator.prototype.generatePlot = function(options, color) {
  // Максимальное oзначение по X
  var MAX_X = 14;
  // Шаг по X
  var STEP_X = 0.5;

  var points = [];
  for (var i = 0; i < MAX_X + 0; i += STEP_X) {
    var y1 =
    points.push([ i, this.yFunction(i + options.gorizont, options) ]);
  }

  return {data: points, lines: {fill: false}, color: color};
}
S125.Generator.prototype.generateComboPlot = function(options1, options2, color) {
  // Максимальное oзначение по X
  var MAX_X = 14;
  // Шаг по X
  var STEP_X = 0.5;

  var points = [];
  for (var i = 0; i < MAX_X + 0; i += STEP_X) {
    var y1 = this.yFunction(i + options1.gorizont, options1);
    var y2 = this.yFunction(i + options2.gorizont, options2);
    points.push([ i, y1 + y2]);
  }

  return {data: points, lines: {fill: false}, color: color};
}

function isShowSignalA(state) {
  return state.connectedSignalA && !state.closedA && (state.showSignalA || state.showSignalAB);
}

function isShowSignalAWithB(state) {
  return ( state.connectedSignalA && !state.closedA)
      && ( state.connectedSignalB && !state.closedB) && state.showSignalAB;
}

function isShowSignalB(state) {
  return state.connectedSignalB && !state.closedB && (state.showSignalB || state.showSignalAB);
}

// Здесь идет генерация точек для графика
S125.Generator.prototype.signal = function() {
  var state = this.map.state;

  var colorA = 0;
  var colorB = 1;
  var colorAB = 2;

  var graphics = [];

  // если включен переключатель A и Б
  if (isShowSignalAWithB(state)) {
    // Показываем оба графика
    if (state.showSignalComboAB) {
      graphics = [
        this.generatePlot(this.getAOptions(), colorA),
        this.generatePlot(this.getBOptions(), colorB)
      ];
    } else
      // Показываем алгебраическую сумму 2ух графиков
      if (state.showSignalComboAwithB) {
        graphics.push( this.generateComboPlot(this.getAOptions(), this.getBOptions(), colorAB) );
      } else
      // Попеременно показываем 1 или 2ой график
      if (state.showSignalComboBlink) {
        if (typeof this.currentSignal == 'undefined') {this.currentSignal = 'A';}
        if (this.currentSignal == 'A') {
          var plotA = this.generatePlot(this.getAOptions(), colorA);
          graphics.push(plotA);
          this.currentSignal = 'B';
        } else if (this.currentSignal == 'B') {
          var plotB = this.generatePlot(this.getBOptions(), colorB);
          graphics.push(plotB);
          this.currentSignal = 'A';
        }
      }
  } else
  // Если подключен сигнал А и он не закрыт и включен тумблер показа сигнала
  if (isShowSignalA(state)) {
    // Генерируем график для него
    var plotA = this.generatePlot(this.getAOptions(), colorA);
    graphics.push(plotA);
  } else
  // Если подключен сигнал B и он не закрыт и включен тумблер показа сигнала
  if (isShowSignalB(state))  {
    // Генерируем график для него
    var plotB = this.generatePlot(this.getBOptions(), colorB);
    graphics.push(plotB);
  }

  // Если прибор включен и есть графики то
  if (state.power && graphics.length > 0) {
    // Рисуем графики
    this.map.action(this, 'signal', graphics);
  } else {
    // Очищаем график
    this.map.action(this, 'signal', [{data: [[0, 0]], lines: {fill: false}, color: 1}]);
  }
}
