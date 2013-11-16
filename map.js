function Map(node, width, height) {
	this.controls = [];
	this.node = node;
	this.paper = Raphael(node.get(0), width, height);
	this.listener = {};
	this.last_state = null;
	this.send_to_state = null;
	
	this.addListener('state_change', this, this.stateChange);
	this.addListener('fatal', this, this.stateChangeFail);
	//this.addListener('warning', this, this.stateChangeWarning);
	this.mode = deviceMode.EMULATOR;
	this.actionManager = new ActionManager(this);
	this.action_depth = 0;
	this.exercises = [];
	this.startstate = false;
	
	this.addListener('control_action', this, function(source, params) {
		var control = params.control;
	})
}



Map.prototype.setMode = function (mode) {
	this.mode = mode;
	
	try {
	if (mode == deviceMode.HELP)		// включение подсказок в режиме справки. Троицкий
		$( document ).tooltip("enable");
	else
		$( document ).tooltip("disable");
	}catch(e) {}
	this.draw();
}

Map.prototype.start = function () {
	this.startstate = true;
	this.action(this, 'start');
}

Map.prototype.stop = function () {
	this.startstate = false;
	this.action(this, 'stop');
}

Map.prototype.restart = function () {
	this.stop();
	this.state = jQuery.extend(true, {}, this.start_state);
	this.start();
	this.draw();
}

Map.prototype.add = function (c) {
	this.controls.push(c);
	c.setMap(this);
}

Map.prototype.stateChange = function () {
}

Map.prototype.stateChangeFail = function (control, param) {
	alert('Прибор сломался: ' + param);
	this.rollback();
}

Map.prototype.stateChangeWarning = function (control, param) {
	alert(param);
}

Map.prototype.trystateback = function () {
	if (this.action_depth == 0 && this.send_to_state != null) {
		this.state = this.send_to_state;
		this.send_to_state = null;
		this.action(this, "state_change");
	}
}

Map.prototype.rollback = function() {
	this.send_to_state = this.last_state;
	this.trystateback();
}

Map.prototype.rollbackTo = function(preview_state) { 				// Откат к укзанному состоянию. Троицкий
	this.send_to_state = preview_state;
	this.trystateback();
}

Map.prototype.control = function (name) {
	var map = this;
	for(var i = 0; i < this.controls.length; i++ ) {
		var value = this.controls[i];
		if (value.name == name)
			return value;
	}
	return null;
}

Map.prototype.draw = function (c) {
	var map = this;
	$.each(this.controls, function(index, value) {
		if (value.haveArea())
		{
			if (map.mode == deviceMode.HELP/* || map.mode == deviceMode.TRAINING*/)		//Заменил. Стало много режимов. Отрисовывать синие квадраты надо только в режиме HELP (бывший CONTROLS). Троицкий
				value.drawControl();
			else
				value.draw();
			// switch(map.mode)
			// {
			// 	case deviceMode.EMULATOR:
			// 		value.draw();
			// 	break;
			// 	case deviceMode.HELP:
			// 		value.drawControl();
			// 	break;
			// 	case deviceMode.TRAINING:
			// 		value.draw();
			// 	break;
			// }
		}
	});
	this.action(this, "state_change");
}

Map.prototype.action = function (control, name, params) {
	var m = this.listener[name];
	if (m === undefined) {
		return;
	}
	this.action_depth ++;
	for(var i = 0; i < m.length; i++) {
		d = m[i];
		d.func.call(d.obj, control, params);
	}
	this.action_depth --;
	
	if (this.action_depth == 0 && name == 'state_change') {
		this.last_state = this.state;
	}
	this.trystateback();
}

Map.prototype.addListener = function(name, object, func) {
	var m = this.listener[name];
	if (m === undefined) {
		m = [];
		this.listener[name] = m;
	}
	m.push({func : func, obj: object});
}

Map.prototype.state_save = function() {
	this.last_state = this.state;
}

Map.prototype.renderAreaControl = function() {
	var a = this.getArea();
	var c = this.definitionControl();
	
	m_a = {}
	for(var i = 0; i < a.length; i++) {
		var area = a[i];
		m_a[area.key] = area;
	}
	
	for(var i = 0; i < c.length; i++) {
		var controldef = c[i];
		var control = new controldef.cls(controldef.key, controldef.param);
		if (control.haveArea()) {
			var area = m_a[controldef.key];
			if (area === undefined){
				throw new Error("not found area: " + controldef.key);
			}
			var render = new Render(area, control);
			control.setRender(render);
		}
		this.add(control);
	}
}

Map.prototype.logControl = function() {
	var a = this.getArea();
	
	m_a = {}
	for(var i = 0; i < a.length; i++) {
		var area = a[i];
		m_a[area.key] = area;
	}
	
	var s = ""
	for(var i = 0; i < this.controls.length; i++) {
		var control = this.controls[i];
		var t = "";
		if (m_a[control.name] != undefined)
			t = m_a[control.name].tooltip;
		s += control.name + "\t" + control.constructor.name + "\t" + t + "\n";
	}
}

Map.prototype.GetControlByName = function(name) {		// функция для получения доступа к компонентам map. Троицкий
	var i = 0;
	for (; i < this.controls.length; i++) {
		if (this.controls[i].name == name)
			return this.controls[i];
	}
}

Map.prototype.GetExList = function() {				// получить список упражнений для данного map. Троицкий
	var foo = [];
	for (var i = 0; i < this.exercises.length; i++) {
		foo.push(this.exercises[i].name);
	}
	return foo;
}

 Map.prototype.GetEx = function(num) {				// получить упражнение по номеру. Троицкий
 	return this.exercises[num];
 }
