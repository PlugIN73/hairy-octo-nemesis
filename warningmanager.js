WarningManager = function (name, param) {
	WarningManager.superclass.constructor.call(this, name, param);
}

extend(WarningManager, Logic);

WarningManager.prototype.setMap = function (map) {
	WarningManager.superclass.setMap.call(this, map);
	
	var g = this;
	map.addListener('warning', this, function (control, param) {
		g.param.text(param);
	});
	
	map.addListener('ok', this, function (control, param) {
		g.param.text('');
	});

}
