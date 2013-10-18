function ActionManager(map) {
	this.map = map;
}

ActionManager.prototype.click = function (control) {
	if (!control.haveArea()) return;
	switch(this.map.mode)
	{
		case deviceMode.EMULATOR:
			control.action();
		break;
		case deviceMode.HELP:
			this.map.action(this, 'control_action', {control: control});
		break;
		case deviceMode.TRAINING:
		case deviceMode.CONTROL:
			control.action();
			var t = this.map.GetControlByName('tutor');
			if (t.checkEx())
				t.checkStateChanges();
		break;
	}
}

ActionManager.prototype.mouseover = function (control, node) {
	if (!control.haveArea()) return;
	if (this.map.mode != deviceMode.HELP) return;
	control.renderControl.highlightControl();
	//$(node).attr({fill: 'cyan', opacity: '0.6', stroke: 'green'});
}

ActionManager.prototype.mouseout = function (control, node) {
	if (!control.haveArea()) return;
	if (this.map.mode != deviceMode.HELP) return;
	control.renderControl.highlightControlOff();
	//$(node).attr({fill: 'blue', opacity: '0.3', stroke: 'red'});
}