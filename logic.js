	function Logic(name, param) {
		this.name = name;
		this.param = param;
		this.map = null;
	}
	
	Logic.prototype.haveArea = function () {
		return false;
	}
	
	Logic.prototype.setMap = function (map) {
		this.map = map;
	}