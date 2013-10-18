function Rheostat(container, indicator, options){

	this.options = {
    radius: 27,
    
    // Диапазон величин регулируемого параметра.
    minValue: 0,
    maxValue: 100,
    
    // Ограничение углов вращения индикатора.
    minAngle: 90,
    maxAngle: 180,
    
    // Сдвиг нуля шкалы в градусах.
    angleOffset: 0, //-90,
    
    // Развернуть ли шкалу?
    reversed: true,
	angle: 0
	
  }
  
  this.func = null;
  this.last_value = null;
  
  this.options = $.extend(this.options, options);
  
  // Константы для конвертирования градусов в радианы и наоборот.
  this.deg2rad = Math.PI / 180;
  this.rad2deg = 180 / Math.PI;
  
  // Флаг, указывающий на то, что мы зажали левую кнопку мыши на контроле.
  this.captured = false;
  
  this.angle = this.options.angle;
  this.mouseAngle = 0;
  this.oldMouseAngle = 0;

    this.indicator = indicator;
    this.container = container;
    
    // Добавляем обработку событий мыши.
	var g = this;
    this.container.bind('mousedown', function(e) {g.captureMouse(e)});
	this.container.bind('mousewheel', function(e) {g.handleWheel(e)});
	
	this.indicator.bind('mousedown', function(e) {g.captureMouse(e)});
	this.indicator.bind('mousewheel', function(e) {g.handleWheel(e)});
    
    $(document).bind('mousemove', function(e) {g.updateAngle(e)});
    $(document).bind('mouseup', function(e) {g.releaseMouse(e)});

    // Размер контейнера нам нужен для того, чтобы сместить систему координат индикатора
    // из левого верхнего угла контейнера в его центр. 
    this.offset = {
      x: Math.floor(this.container.width() / 2) - Math.floor(this.indicator.width() / 2),
      y: Math.floor(this.container.height() / 2) - Math.floor(this.indicator.height() / 2)
    };
    
    // Угол по умолчанию в начало шкалы.
    this.updateIndicatorPosition();
    
    // Показываем спрятанный по умолчанию индикатор.
    //this.indicator.css('visibility', 'visible').fadein;
  }
  
  // Обработка колесика мыши.
Rheostat.prototype.handleWheel = function(e){
    // Вычисление угла.
    var wheelAngle = this.angle + e.wheel;
    if ((wheelAngle >= this.options.minAngle) && (wheelAngle <= this.options.maxAngle)){
      this.oldMouseAngle = this.mouseAngle = this.angle = wheelAngle;
      this.updateIndicatorPosition();
    }
  }
  
  Rheostat.prototype.dif = function(a, b) {
	var d = Math.abs(a - b);
	var ad = Math.abs(d - 360);
	return Math.min(d, ad);
  }
  
  Rheostat.prototype.setAngle = function(a) {
	//return;
	if (a < this.options.minAngle || a > this.options.maxAngle) {
		var difMin = this.dif(a, this.options.minAngle);
		var difMax = this.dif(a, this.options.maxAngle);
		if (difMax < difMin)
			a = this.options.maxAngle;
		else
			a = this.options.minAngle;
	}
	if (a == this.mouseAngle)
		return;
	this.oldMouseAngle = this.mouseAngle = this.angle = a;
    this.updateIndicatorPosition();
  }
  
  // Запоминаем, что контрол захвачен мышью.
  Rheostat.prototype.captureMouse = function(e){
    this.captured = true;
    
    // Выставляем индикатор в место клика.
    var mouseAngle = this.getMouseAngle(e);
	this.setAngle(mouseAngle);
  }
  
  // Стираем флаг захвата.
  Rheostat.prototype.releaseMouse = function(){
    this.captured = false;
  }
  
  // В этом методе считается угол по положению курсора мыши.
  Rheostat.prototype.getMouseAngle = function(e){
    var containerPosition = this.container.position();
  
    // Катеты нашего треугольника.
    // К mouseLeft я прибавил 0.1 для того, чтобы избежать возможного деления на ноль впоследствии.
    var mouseLeft = e.pageX - this.offset.x - containerPosition.left + 0.1;
    var mouseTop = this.offset.y - e.pageY + containerPosition.top;
  
    // Вычисление угла наклона курсора (т.к. Math.atan() возвращает значение в радианах,
    // для более простого оперирования с ним переведем его в градусы).
    var angle = Math.atan(mouseTop / mouseLeft) * this.rad2deg;
  
    // Т.к. функция арктангенса может вернуть нам значения только от -90 до +90, то
    // если курсор находится в левой половине к углу прибавим 180. Иначе в левой половине
    // мы индикатор никогда не увидим.
    if (mouseLeft < 0)
      angle += 180;
  
    // Еще одна проверка, чтобы иметь сплошную последовательность значений от 0 до 360 градусов.
	angle -= this.options.angleOffset
    if (angle < 0) {
	  var n = -angle / 360	
      angle += (n + 1) * 360;
	}
	  
	if (angle > 360)
		angle = angle % 360;
	
    return angle;
  }
  
  // Вычисляем угол поворота индикатора на основе направления движения курсора мыши.
  Rheostat.prototype.updateAngle = function(e){
    // Захвачен ли контрол мышью?
    if (this.captured){
		
      var mouseAngle = this.getMouseAngle(e);
	  this.setAngle(mouseAngle);

    }
  }
  
  // Считаем значение в соответствии с заданными минимальным и максимальным значениями регулируемой величины.
  Rheostat.prototype.updateValue = function(){
	if (this.func == null) return;
    var value = Math.floor(
      (this.options.maxValue - this.options.minValue ) *
      (this.angle - this.options.minAngle) /
      (this.options.maxAngle - this.options.minAngle)
    );
  
	value = (this.options.reversed) ? this.options.maxValue - value : value;
	if (value != this.last_value) this.func(value);
	this.last_value = value;
  }
  
  Rheostat.prototype.setUpdate = function (e)  {
	this.func = e;
  }
  
  // Обновление положения индикатора.
  Rheostat.prototype.updateIndicatorPosition = function(){
    // Переводим угол в радианы для передачи его в Math.cos() и Math.sin().
	
    var radAngle = (this.angle + this.options.angleOffset) * this.deg2rad;
    var left = this.options.radius * Math.cos(radAngle) + this.offset.x;
    
    // Обратите внимание на знак "-". Этим мы разворачиваем ось y наоборот.
    var top = -this.options.radius * Math.sin(radAngle) + this.offset.y;
    
    // Позиционирование индикатора.
    //this.indicator.css({left: left, top: top});
	this.indicator.setposition({left: left, top: top});
    
    // Обновляем значение.
    this.updateValue();
  }