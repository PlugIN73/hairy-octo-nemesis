function ButtonBoxImage(name, param) {
	ButtonBox.superclass.constructor.call(this, name, param);
	this.param = param;
}
extend(ButtonBoxImage, Button);

ButtonBoxImage.prototype.setRender = function(render) {
	ButtonBoxImage.superclass.setRender.call(this, render);
}

ButtonBoxImage.prototype.setMap = function (map) {
	ButtonBoxImage.superclass.setMap.call(this, map);
	
	var b = this.box();
	
	if (this.param.image_on != null)
	{
		var a = this.param.image_on.split(';');
		this.param.pon = {src: a[0], w: a[1], h: a[2]};
	}
	
	if (this.param.image_off != null)
	{
		var a = this.param.image_off.split(';');
		this.param.poff = {src: a[0], w: a[1], h: a[2]};
	}
	
	var area = {shape: "image", coords: b.x + "," + b.y + "," + b.width + "," + b.height};
	area.tooltip = this.render.attr.tooltip;
	area.hint_text = this.render.attr.hint_text;
	if (this.param.top) {
		area.coords = (b.x + b.width/2)  + "," + b.y + ",5";
	}
	//this.render.remove();
	this.render = new Render(area, this);
	//this.render.getNode(map);
	map.addListener('state_change', this, function() {
		var t = map.state;
		m = eval(this.param.on);
		this.setLight(m);
	})
}

ButtonBoxImage.prototype.setLight = function (on) {
	this.light = on;
	if(on)
	{
		if (this.param.image_on != null)
		{
			var p = this.param.pon;
			this.render.setImage(p.src, p.w, p.h);
			this.render.opacity(1);
		}
		else
			this.render.opacity(0);
	}
	else
	{
		if (this.param.image_off != null)
		{
			var p = this.param.poff;
			this.render.setImage(p.src, p.w, p.h);
			this.render.opacity(1);
		}
		else
		{
			var b = this.box();
			this.render.node.attr({width:b.width, height: b.height});
			this.render.opacity(0);
		}
	}
}