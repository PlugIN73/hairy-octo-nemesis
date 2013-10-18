Recomend = function (name, param) {
	Recomend.superclass.constructor.call(this, name, param);
	this.timer = null;
	this.p = param;
	this.last_state = null;
	this.path = [];
	
	
	var target = [];
	target.push({way: 'Power_on->T_17->Mode_inner', target: 'Power_on|T_17|Mode_inner', name: 'Установка периода 17 и внутреннего запуска'});
	target.push({way: 'Power_on->Mode_inner->T_17', target: 'Power_on|T_17|Mode_inner', name: 'Установка периода 17 и внутреннего запуска'});
	
	this.setTargetText(target);
}

extend(Recomend, Logic);

Recomend.prototype.setTargetText = function (target) {
	this.target = [];
	this.goal = {};
	
	
	for(var i = 0; i < target.length; i++) {
		var item = target[i];
		var t = {};
		t.way = item.way.split('->');
		t.target = item.target.split('|');
		t.name = item.name;
		this.target.push(t);
		
		var key = t.target.sort().join('|');
		if (key in this.goal) {
			var v = this.goal[key];
			v.push(t);
		}
		else {
			var v = [];
			v.push(t);
			this.goal[key] = v;
		}
	}
}

Recomend.prototype.goalTarget = function () {

	var goals = [];
	var s = {};
	var is = this.important_state;
	for (var key in is) {
		var val = this.map.state[key];
		s[this.getStateSymbol(key, val)] = 1;
	}
	
	for(var i = 0; i < this.target.length; i++) {
		var item = this.target[i];
		var goal = true;
		for(var n = 0; n < item.target.length; n++) {
			var t = item.target[n];
			if (!(t in s)) {
				goal = false;
				break;
			}
		}
		if (goal)
			goals.push(item);
	}
	return goals;
}

Recomend.prototype.setMap = function (map) {
	G5.Generator.superclass.setMap.call(this, map);
	var g = this;
	this.last_state = map.state;
	
	this.important_state = {power: 0, mode: 0, T: 0, D: 0, R: 0, K: 0, U: 0};
	this.reduce_param = {T: 0, D: 0, R: 0, K: 0, U: 0};
	
	map.addListener('state_change', this, function() {
		var s = g.getState(g.map.state, g.last_state);
		g.last_state = g.map.state;
		g.path = g.path.concat(s);
		
		var rw = g.reduceWay(g.path);
		var p = "";
		var pt = "";
		var rwt = "";
		var wt_code = "";
		for(var i = 0; i < g.path.length; i++) {
			p += "->" + g.path[i] + '\n';
			pt += "->" + g.getStateName(g.path[i]) + '\n';
		}
		
		for(var i = 0; i < rw.length; i++) {
			rwt += "->" + g.getStateName(rw[i]) + '\n';
			wt_code += "->" + rw[i] + '\n';
		}
		
		var goals = g.goalTarget();
		if (goals.length > 0) {
			rwt += '==== Цель достигнута \n'
			for(var t in goals)
				rwt += '->' + goals[t].name + '\n';
			g.analyze(goals);
		}
		
		$('#path').val(p);
		$('#path_t').val(pt);
		$('#path_min').val(wt_code);
		$('#path_min_t').val(rwt);
	});
}

Recomend.prototype.analyze_goal = function(goal, way) {
	var s = [];
	var n = 0;
	var count_fail = 0;
	for(var i = 0; i < goal.length; i++) {
		var g = goal[i];
		do {
			if (n >= way.length)	return {count_fail: 10000};
			var p = way[n];
			n++;
			if (p == g) {
				s.push({action: p, res: true});
				break;
			}
			else {
				s.push({action: p, res: false});
				count_fail++;
			}
		} while(g != p);
	}
	return {way: s, count_fail: count_fail};
}

Recomend.prototype.analyze = function(goals) {
	var way = this.reduceWay(this.path);
	var res = null;
	for(var i = 0; i < goals.length; i++) {
		var g = goals[i];
		var s = this.analyze_goal(g.way, way);
		if (res == null)
			res = s;
		else if (res.count_fail > s.count_fail) {
			res = s;
		}
	}
	
	var rec = "";
	for(var i = 0; i < res.way.length; i++) {
		var g = res.way[i];
		rec +=  this.getStateName(g.action) + "-> (" + (g.res ? 'Правильный шаг' : 'Лишний') + ')\n';
	}
	rec += "Ошибок: " + res.count_fail;
	$('#recomend').val(rec);
}


Recomend.prototype.getStateSymbol = function (param, value) {
	var def = this.map.statedef;
	switch (param)
	{
		case 'power':
		return 'Power_' + (value ? 'on' : 'off');
		break;
		case 'mode':
			if (value == def.innerWork) return 'Mode_inner';
			if (value == def.externalPulsePos) return 'Mode_ePos';
			if (value == def.externalPulseNeg) return 'Mode_eNeg';
			if (value == def.hand) return 'Mode_hand';
			if (value == def.direct) return 'Mode_direct';
			else return 'Mode_off';
		break;
		default:
		return  param + '_' + value;
		break;
	}
}

Recomend.prototype.reduceWay = function (way) {
	
	var s = [];
	var last_pos = null;
	var last_param = null;
	for(var i = 0; i < way.length; i++) {
		var pos = way[i];
		var p = pos.split('_');
		var param = p[0];
		
		if (last_pos != null && last_param != param) {
			s.push(last_pos);
			last_pos = null;
			last_param = null;
		}
		
		if (param in this.reduce_param) {
			last_pos = pos;
			last_param = param;
		}
		else
			s.push(pos);
	}
	
	if (last_pos != null)
		s.push(last_pos);
	
	return s;
}

Recomend.prototype.getStateName = function (p) {
	p = p.split('_');
	var param = p[0];
	var value = p[1];
	var pname = {T: 'Период', D: 'Смещение', R: 'Длительность', K: 'Множитель', U: 'Амплитуда'};
	var def = this.map.statedef;
	switch (param)	{
		case 'Power':
			return value=='on' ? 'Включен' : 'Выключен';
		break;
		case 'Mode':
			if (value == 'inner') return 'Включен режим внутреннего запуска';
			if (value == 'ePos') return 'Включен режим внешний положительный';
			if (value == 'eNeg') return 'Включен режим внутренний положительный';
			if (value == 'hand') return 'Включен режим ручного запуска';
			if (value == 'direct') return 'Включен режим прямого запуска';
			else return 'Режим выключен';
		break;
		default:
			return  pname[param] + ' установлен на ' + value;
		break;
	}
}

Recomend.prototype.getState = function (new_state, last_state) {
	var s = [];
	var is = this.important_state;
	for (var key in is) {
		var val_new = new_state[key];
		var val = last_state[key];
		if (val != val_new)
			s.push(this.getStateSymbol(key, val_new));
	}
	return s;
}