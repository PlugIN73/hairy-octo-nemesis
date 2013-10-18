	function Button(name, param) {
		Button.superclass.constructor.call(this, name, param);
		this.stateChange = param;
	}
	extend(Button, Control);
	
	Button.prototype.setMap = function(map) {
		Button.superclass.setMap.call(this, map);
	}
	
	Button.prototype.stateChangePerform = function (state, new_state, action) {
		var b = this;
		var map = this.map;
		
		var s = state;
		var d = new_state;
		if (typeof(action) === 'string') {
			eval(action);
		} 
		else if (action instanceof Array) {
			for(var i = 0; i < action.length; i++) {
				this.stateChangePerform(s, d, action[i]);
			}
		}
		else {
			var cond = 1;
			if (action.cond != undefined) {
				cond = eval(action.cond);
			}
			if (cond) eval(action.act);
		}
	}
	
	
	Button.prototype.action = function () {
		this.render.animateClick(this.map);
		this.map.action(this, 'button_click');
		var s = this.map.state
		var d = jQuery.extend(true, {}, s);
		this.stateChangePerform(s, d, this.stateChange);
		this.map.state_save();
		this.map.state = d;
		
		this.map.action(this, 'button_post');
		
		this.map.action(this, 'state_change');
	}