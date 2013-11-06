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
	var interval = 100;

	this.timerSignal = setInterval(function() {
		var state = this.map.state;
    // Если прибор выключен то ничего не делаем
		if (state.power == 0) {
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

// Функция для получения входного импульса
// Здесь пока захардкожена синусоида, надо будет динамически получать
S125.Generator.prototype.getInputPulse = function() {
  return function(x) { return Math.sin(x); }
}

// Здесь в этой функции идет основное преобразование координаты X в Y
S125.Generator.prototype.yFunction = function(x, state) {
  var state = this.map.state;

  // Получаем функцию входного импульса и применяем ее
  var inputPulseFn = this.getInputPulse();
  var y = inputPulseFn(x);

  // Тестовая хрень для рандомной генерации графика
  //y *= Math.random() * 4 - 2;

  // Если включен переключатель инвертирования, то инвертируем график
 	if (state.inversion == true) {
 		y = y * -1;
 	}

  // Если подключена "Земля"
 	if (state.earthA == true) {
 		y = 0;
 	}

  // Если канал А закрыт. Если у кого-то есть идеи как это сделать лучше - велкам.
  if (state.closedA == true) {
    y = -2000000;
  }

  // Добавляем смещение по вертикали
  y += state.vertical_offset;

 return y;
}

// Здесь идет генерация точек для графика
S125.Generator.prototype.signal = function() {
  this.fill_lines = false;

  // Максимальное значение по X
  var MAX_X = 14;
  // Шаг по X
  var STEP_X = 0.5;

  var points1 = [];
  var points2 = [];
  for (var i = 0; i < MAX_X; i += STEP_X) {
    points1.push([ i, this.yFunction(i) ]);
  }

  for (var i = 0; i < MAX_X; i += STEP_X) {
    points2.push([ i, 2 + this.yFunction(i) ]);
  }

  var series = [
    {data: points1, lines: {fill: this.fill_lines}, color: "#33CC66"},
    {data: points2, lines: {fill: this.fill_lines}, color: "#33CC66"}
  ];

  this.map.action(this, 'signal', series);
}
