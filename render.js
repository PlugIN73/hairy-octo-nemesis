function Render(attr, control) {
	this.node = null;
	this.attr = attr;
	this.control = control;
}

Render.prototype.animateClick = function(map) {
	var bb = this.node.getBBox();
	var flush = map.paper.circle(bb.x + bb.width / 2, bb.y + bb.height / 2, Math.min(bb.width, bb.height) / 2).attr("fill", "red");
	flush.animate({r: 0}, 300, function() {flush.remove()});
}

Render.prototype.remove = function() {
	var bb = this.node.remove();
}

Render.prototype.setImage = function(src, w, h) {
	this.node.attr({src: src, width: w, height: h});
}

Render.prototype.lightOn = function(map) {
	this.node.attr({fill: 'yellow', opacity: '100'});
}

Render.prototype.lightOnOpacity = function(n) {
	this.node.attr({fill: 'yellow', opacity: n});
}

Render.prototype.lightOff = function(map) {
	this.node.attr({fill: 'white', opacity: '0'});
}

Render.prototype.renderNumber = function(map, attr) {
	if (this.node == null) {
		c = this.attr.coords.split(',');
		x = parseInt(c[0]);
		y = parseInt(c[1]);
		x2 = parseInt(c[2]);
		y2 = parseInt(c[3]);
		x = Math.round((x + x2) / 2);
		y = Math.round((y + y2) / 2);
		this.node = map.paper.text(x, y);
	}
	this.hide();
	if (attr == null)
		attr = {fill: 'green', 'font-size': 38};
	this.node.attr(attr);
}

Render.prototype.number = function(n, int, fract) {
	this.node.attr('text', zeroFill(n, int, fract));
	this.node.show();
}

Render.prototype.renderText = function(map) {
	if (this.node == null) {
		c = this.attr.coords.split(',');
		x = parseInt(c[0]);
		y = parseInt(c[1]);
		x2 = parseInt(c[2]);
		y2 = parseInt(c[3]);
		x = Math.round((x + x2) / 2);
		y = Math.round((y + y2) / 2);
		this.node = map.paper.text(x, y);
	}
	this.hide();
	this.node.attr({fill: 'green', 'font-size': 38});
}

Render.prototype.text = function(text) {
	this.node.attr('text', text);
	this.node.show();
}

Render.prototype.getNode = function(map) {
	if (this.node != null) return this.node;
	switch (this.attr.shape)
	{
		case 'rect': 
			c = this.attr.coords.split(',');
			x = c[0];
			y = c[1];
			x2 = c[2];
			y2 = c[3];
			this.node = map.paper.rect(x, y, x2 - x, y2 - y);
			$(this.node.node).attr('title', this.attr.tooltip);		//Добавляю строку-подсказку к каждому svg-элементу. Троицкий
			$(this.node.node).attr('hint_text', this.attr.hint_text);		//Добавляю текст для режима справки к каждому svg-элементу. Троицкий
			//$(this.node.node).attr('class', 'control');
		break;
		case 'circle': 
			c = this.attr.coords.split(',');
			x = c[0];
			y = c[1];
			r = c[2];
			this.node = map.paper.circle(x, y, r).attr({fill: '#000', opacity: '0'});
			$(this.node.node).attr('title', this.attr.tooltip);		//Добавляю строку-подсказку к каждому svg-элементу. Троицкий
			$(this.node.node).attr('hint_text', this.attr.hint_text);		//Добавляю текст для режима справки к каждому svg-элементу. Троицкий
		break;
		
		case 'image': 
			c = this.attr.coords.split(',');
			x = c[0];
			y = c[1];
			w = c[2];
			h = c[3];
			this.node = map.paper.image('', x, y, w, h);
			$(this.node.node).attr('title', this.attr.tooltip);		//Добавляю строку-подсказку к каждому svg-элементу. Троицкий
			$(this.node.node).attr('hint_text', this.attr.hint_text);		//Добавляю текст для режима справки к каждому
		break;
	}
	var control = this.control;
	this.node.click(function() {
		map.actionManager.click(control);
	});
	this.node.mouseover(function() {			// добавил событие "мышка над элементом".Троицкий
		map.actionManager.mouseover(control, this.node);
	});
	this.node.mouseout(function() {			// добавил событие "мышка над элементом".Троицкий
		map.actionManager.mouseout(control, this.node);
	});
	return this.node;
}

Render.prototype.render = function(map) {
	this.getNode(map);
	this.node.attr({fill: '#000', opacity: '0'});
}

Render.prototype.renderControl = function(map) {
	this.getNode(map);
	this.node.attr({fill: 'blue', opacity: '0.3', stroke: 'red'});
}

Render.prototype.hide = function() {
	if (this.node != null) this.node.hide();
}

Render.prototype.show = function() {
	if (this.node != null) this.node.show();
}

Render.prototype.opacity = function(n) {
	this.node.attr({opacity: n});
}

Render.prototype.highlightControl = function() {
	this.node.attr({fill: 'cyan', opacity: '0.6', stroke: 'green'});
}

Render.prototype.highlightControlOff = function() {
	this.node.attr({fill: 'blue', opacity: '0.3', stroke: 'red'});
}