function DeviceS125(node, width, height) {
	DeviceS125.superclass.constructor.call(this, node, width, height);
  this.state = {
    power: 0, inversion: 0, earthA: 0, closedA: 0, earthA: 0, openA: 1,
    p: [], vertical_offset: 0,
    def: {}
  };

  this.start_state = jQuery.extend(true, {}, this.state);

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
	area.push({shape: "rect", key: "power", coords: "120,280,145,300", tooltip: "Кнопка включения прибора", hint_text: "Кнопка включения прибора"});
  area.push({shape: "circle", key: "vertical", coords: "380, 145, 15", tooltip: "Регулировка по высоте", hint_text: ""});
  area.push({shape: "rect", key: "inversion", coords: "355,90,390,120", tooltip: "Кнопка инвертирования", hint_text: "Кнопка инвертирования"});
  area.push({shape: "rect", key: "earthA", coords: "360,222,375,242", tooltip: "Кнопка земли", hint_text: "Кнопка земли"});
//FIXME координаты 3-х кнопок не верные. земля, закрыть, открыть
  area.push({shape: "rect", key: "closedA", coords: "375, 222, 390, 242",
            tooltip: "", hint_text: "Закрыть канал А"});
  area.push({shape: "rect", key: "openA", coords: "345, 222, 360, 242",
            tooltip: "", hint_text: "Открыть канал А"});
  area.push({shape: "circle", key: "closeAIndicator", coords: "390, 232, 3", tooltip: "Индикатор закрытого канала А", hint_text: "Канал А закрыт"});
  area.push({shape: "circle", key: "earthAIndicator", coords: "370, 242, 3", tooltip: "Индикатор закрытого канала А", hint_text: "Канал А закрыт"});
  area.push({shape: "circle", key: "openAIndicator", coords: "350, 232, 3", tooltip: "Индикатор закрытого канала А", hint_text: "Канал А закрыт"});
  return area;
}

DeviceS125.prototype.definitionControl = function () {
	var c = []
	c.push({key: 'closeAIndicator', cls: IndicatorDiode, param: S125.getStateIndicator});
	c.push({key: 'earthAIndicator', cls: IndicatorDiode, param: S125.getStateIndicator});
	c.push({key: 'openAIndicator', cls: IndicatorDiode, param: S125.getStateIndicator});

	c.push({key: 'power', cls: Button, param: 'd.power = !s.power; d.mode=0;'});
  c.push({key: 'vertical', cls: Reostat, param: {action: 'd.vertical_offset=val', options: {minAngle: 0, maxAngle: 360, angleOffset: -90, minValue: -10, maxValue: 10}, ropt: {cont: {opacity: 0}, ind: {
         fill: 'red'}, indr: 3, inddr: -11}}});
  c.push({key: 'inversion', cls: Button, param: 'd.inversion = !d.inversion; '});
  c.push({key: 'earthA', cls: Button, param: 'd.earthA = 1; d.closedA = 0; d.openA = 0;'});
	c.push({key: 'closedA', cls: Button, param: 'd.closedA = 1; d.earthA = 0; d.openA = 0;'});
	c.push({key: 'openA', cls: Button, param: 'd.openA = 1; d.closedA = 0; d.earthA = 0;'});

	c.push({key: 'menu', cls: Menu, param: null});
  c.push({key: 'graph', cls: GraphVisio, param: null});
  c.push({key: 'generator', cls: S125.Generator, param: null});

  return c;
}

var S125 = {};

S125.getStateIndicator = function(t, name) {
	if (!t.power) return false;
	m = {};
  //вот так делаюцца ебаные индикаторы
	// m['indShiftDown'] = t.power && !t.shiftUp;
  m['closeAIndicator'] = t.power && t.closedA
  m['earthAIndicator'] = t.power && t.earthA
  m['openAIndicator'] = t.power && t.openA

	return m[name];
}
