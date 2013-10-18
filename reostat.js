function RenderReostat() {
	this.container = null;
	this.indicator = null;
	this.contp = null;
	this.rad2 = null;
	this.attr = {};
	this.nodes = [];
}

RenderReostat.prototype.setfunction = function(e) {
	var g = this;
	e.width = function () {return e.getBBox().width};
	e.height = function () {return e.getBBox().height};
	e.position = function () {
		return e.j.offset();
	};
	
	e.setposition = function (p) {
		var b = g.container.getBBox();
		var c = e.getBBox();
		p.left = p.left + b.x + c.width / 2;
		p.top = p.top + b.y  + c.height / 2;
		e.attr({cx: p.left, cy: p.top});
	};
	
	e.bind = function(name, f) {
		if (name == 'mousemove') {
			e.mousemove(function(h) {
				return f(h);
			});
		}
		
		if (name == 'mousedown') {
			e.mousedown(function(h) {
				console.log('down');
				return f(h);
			});
		}
	}
}

RenderReostat.prototype.setParam =  function(x, y, radius, radius2) {
	this.contp = {x: x, y: y, radius: radius};
	this.rad2 = radius2;
}

RenderReostat.prototype.createContainer = function(map, opt) {
	var p = this.contp;
	this.container = map.paper.circle(p.x, p.y, p.radius);
	this.container.j = $(this.container.node);
	this.setfunction(this.container);
	this.container.attr(opt);
	this.nodes.push(this.container);
	
	var c = this.container;
	var cnt = this.control;
	this.container.mouseover(function() {
		map.actionManager.mouseover(cnt, c);
	});
	this.container.mouseout(function() {
		map.actionManager.mouseout(cnt, c);
	});
}

RenderReostat.prototype.createIndicator = function(map, opt) {
	var p = this.contp;
	this.indicator = map.paper.circle(p.x, p.y, this.rad2).attr(opt);
	this.indicator.j = $(this.indicator.node);
	this.setfunction(this.indicator);
	this.nodes.push(this.indicator);
}

RenderReostat.prototype.create = function(map, param) {
	if (this.container == null) this.createContainer(map, param.cont);
	if (this.indicator == null) this.createIndicator(map, param.ind);
}

RenderReostat.prototype.render = function(map) {
	this.create(map);
	$.each(this.nodes, function(index, value) {
		//value.attr({fill: '#000', opacity: '0'});
	});
	//this.container.attr({fill: '#000', opacity: '0'});
}

RenderReostat.prototype.hide = function(map) {
	$.each(this.nodes, function(index, value) {
		value.hide();
	});
}
	
RenderReostat.prototype.show = function(map) {
	$.each(this.nodes, function(index, value) {
		value.show();
	});
}

RenderReostat.prototype.highlightControl = function() {
	this.container.attr({fill: 'cyan', 'fill-opacity': '0.6', opacity: '0.6', stroke: 'green'});
}

RenderReostat.prototype.highlightControlOff = function() {
	this.container.attr({fill: 'blue', 'fill-opacity': '0.0', opacity: '0.0', stroke: 'red'});
}

function Reostat(name, param) {
	Reostat.superclass.constructor.call(this, name, param);
	this.param = param;
	//
	
}
extend(Reostat, Control);

Reostat.prototype.setRender = function(render) {
	Reostat.superclass.setRender.call(this, render);
	
	this.tooltip = render.attr.tooltip;
	this.hint_text = render.attr.hint_text;
			
	this.render = new RenderReostat();
	this.render.control = this;
}

Reostat.prototype.setMap = function (map) {
	Reostat.superclass.setMap.call(this, map);
	
	var b = this.box();
	
	var ropt = {cont: {fill: '#000', 'fill-opacity': '0'}, ind: {fill: 'red'}, indr: 5, inddr: 0};
	this.param.ropt = $.extend(true, ropt, this.param.ropt);
	
	this.render.setParam(Math.floor(b.x + b.width / 2), Math.floor(b.y + b.height / 2), Math.floor(b.width/2), this.param.ropt.indr);
		
	this.render.create(map, this.param.ropt);
	this.param.options.radius = b.width/2 + this.param.ropt.inddr;
	this.reostat = new Rheostat(this.render.container, this.render.indicator, this.param.options);
	var g = this;
	this.render.container.j.attr('title', this.tooltip);
	this.render.container.j.attr('hint_text', this.hint_text);
	this.render.attr.title = this.tooltip;
	this.render.attr.hint_text = this.hint_text;
	this.reostat.setUpdate(function(val) {g.update(val)});
}

Reostat.prototype.update = function(val) {
	var s = this.map.state
	var d = jQuery.extend(true, {}, s);
	eval(this.param.action);
	this.map.state = d;
	
	this.map.action(this, 'state_change');
}