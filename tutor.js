Tutor = function (name, param) {
	Tutor.superclass.constructor.call(this, name, param);

	this.ex = {};
	this.next_goal_state = -1;
	this.prev_state = {};
	//this.hash_pool = [];
	this.new_state = {};
	this.fail_count = 0;

	this.user_firstName = "";
	this.user_secondName = "";

	Add_CSS("tutor/tutor.css");
}

extend(Tutor, Logic);

Tutor.prototype.setMap = function (map) {
	Tutor.superclass.setMap(this, map);
	this.map = map;
	// map.addListener('state_change', this, function(control) {
	// 	this.hash_pool.push(this.state_hash());
	// });
	map.addListener('button_post', this, function(control) {
		this.new_state = this.state_hash();
	});
 	this.showTutorDialog();
}

Tutor.prototype.showTutorDialog = function() {
	if ($('#tutorDialog').length == 0)
		this.createDialog();
	var foo = this;
    $( "#tutorDialog" ).dialog({
      draggable: false,
      closeOnEscape: false,
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "ОК": function() {
        	foo.user_firstName = $('#firstName').val();
        	foo.user_secondName = $('#secondName').val();
            $( this ).dialog( "close" );
        }
      },
      close: function() {
      }
    });
	$( "#tutorDialog" ).dialog( "open" );
}

Tutor.prototype.createDialog = function() {
	$('body').append( "<div id='tutorDialog' title='Запрос системы'>" +
					  "  <p class='validateTips'>Введите свои данные</p>" +
					  "  <form>" +
					  "    <table>" +
					  "      <tr><td><label for='firstName'>Фамилия</label></td>" +
					  "      <td><input type='text' name='firstName' id='firstName' class='ui-widget-content ui-corner-all' /></td></tr>" +
					  "      <tr><td><label for='secondName'>Имя</label></td>" +
					  "      <td><input type='text' name='secondName' id='secondName' class='ui-widget-content ui-corner-all' /></td></tr>" +
					  "    </table>" +
					  "  </form>" +
					  "</div>");
}

Tutor.prototype.state_hash = function() {
	var foo = this.map.state_time_variables;
	console.log(hex_md5(print_object(this.map.state, function(arg) { return $.inArray(arg, foo) != -1 } )));
	return hex_md5(print_object(this.map.state, function(arg) { return $.inArray(arg, foo) != -1 } ));
}

Tutor.prototype.enableExerciseEditor = function() {
	if ($('div#exrciseEditor').size() == 0)
		this.createExerciseEditor();
	$('div#exrciseEditor').css('display', 'block');
	//this.map.addListener('state_change', this, function(control) {
	this.map.addListener('button_post', this, function(control) {
		var foo = "";
		if (!(control.haveArea === undefined) && control.haveArea())
			foo = "Нажать кнопку " + control.name + " <img class='button_img' id='" + control.name + "' src='" + this.map.name + "/button_img/" + control.name + ".png'>"
		$('div#exrciseEditor table').append("<tr><td><input disabled type=\"text\" style= \"width: 228px\" value=\"" + this.state_hash() + "\"/></td><td><input type=\"text\" style= \"width: 204px\"></td><td><input type=\"text\" style= \"width: 204px\" value=\"" + foo + "\"></td></tr>");
	});
}

Tutor.prototype.createExerciseEditor = function() {
	$('body').append("<div id=\"exrciseEditor\" style=\"overflow-y: scroll; display: none; border: 2px solid black; position: fixed; right: 0; bottom: 0; padding: 4px; width: 682px; height: 258px; background-color: white\"><label>Имя: </label><input type=\"text\" style=\"margin-left: 8px; width: 402px\"><br/><table></table><button id=\"go\">ГОТОВО</button><button id=\"clear\">ОЧИСТИТЬ</button><button id=\"bshowstate\">STATE</button></div>");
	var foo = this.exerciseEditorPrint;
	var bar = this.map;
	$('div#exrciseEditor button#go').click(function() { foo() });
	$('div#exrciseEditor button#clear').click(function() { $('div#exrciseEditor table tr').remove(); });
	$('div#exrciseEditor button#bshowstate').click(function() {
		$('body').append("<div id=\"showstate\" style=\"overflow-y: scroll; border: 2px solid black; position: fixed; right: 0; top: 0; padding: 4px; width: 280px; height: 350px; background-color: white\">");
		var timer = setInterval(function() {
			$('div#showstate').html(print_object(bar.state));
		}, 500)
	});
}

Tutor.prototype.exerciseEditorPrint = function() {
	var s = '';
	s += "{\n\tname: \"" + $('div#exrciseEditor input').val() + "\",\n\tnodes: [\n";
	$('div#exrciseEditor table tr').each(function(index) {
		s += "\t\t{ hash: \"" + $(this).children(":eq(0)").children().val() + "\", goal: \"" + $(this).children(":eq(1)").children().val() + "\", button_hint: \"" +  $(this).children(":eq(2)").children().val() + "\" },\n";
	});
	s = s.substr(0, s.length - 2);
	s += "\n\t]\n}";
	alert(s);
}

Tutor.prototype.loadExercise = function(ex) {
	if (this.map.mode == deviceMode.CONTROL)
		this.map.GetControlByName('menu').LockMenuItems();
	this.ex = ex;
	this.next_goal_state = 0;
	this.fail_count = 0;
	this.map.restart();
	this.prev_state = this.map.state;
	//this.hash_pool = [];
	this.new_state = {};

	if (ex.code != undefined) {
		eval(ex.code);
	}

	this.makeMenuItem();
	this.showCurrentGoal();
}

Tutor.prototype.makeMenuItem = function() {
	switch(this.map.mode){
		case deviceMode.TRAINING:
			var map_menu = this.map.GetControlByName('menu');
			map_menu.RemoveAdditionalMenuItems();
			var s_html = "";
			var j = 1;
			var foo_list = [];
			for(var i = 0; i < this.ex.nodes.length; i++) {
				if (this.ex.nodes[i].goal === "" && this.ex.nodes[i].button_hint === "" )
					continue;
				if (this.ex.nodes[i].goal === "") {
					foo_list.push({ o: this.ex.nodes[i], ind: i });
					continue;
				}
				if (foo_list.length > 0) {
					s_html += "<li class=\"" + this.ex.nodes[i].hash + "\">" + j + ". " + this.ex.nodes[i].goal + "<ul class=\"button_hint\">";
					while (foo_list.length > 0) {
						var bar = foo_list.shift();
						s_html += "<li class=\"" + bar.o.hash + "\">" + bar.o.button_hint + "</li>";
					}
					s_html += "<li class=\"" + this.ex.nodes[i].hash + "\">" + this.ex.nodes[i].button_hint + "</li></ul></li>"
				} else {
					s_html += "<li class=\"" + this.ex.nodes[i].hash + "\">" + j + ". " + this.ex.nodes[i].goal + "<br/><span class=\"button_hint\">" + this.ex.nodes[i].button_hint + "</span>" + "</li>";
				}
				j++;
			}
			map_menu.AddAdditionalMenuItem("tutor_ex_menu", this.ex.name, "<ul>" + s_html + "</ul>");
			map_menu.FocusOnAdditionalMenuItem(1);
			var foo = this.map;
			$('img.button_img').mouseover(function() {
					// $(foo.GetControlByName($(this).attr("id")).render.node.node).attr({fill: 'cyan', opacity: '0.6', stroke: 'green'});
					// $(foo.GetControlByName($(this).attr("id")).render.node.node).css('opacity', '0.5');
					foo.GetControlByName($(this).attr("id")).draw();
					foo.GetControlByName($(this).attr("id")).drawControl();
					foo.GetControlByName($(this).attr("id")).renderControl.highlightControl();
			})
			$('img.button_img').mouseout(function() {
					foo.GetControlByName($(this).attr("id")).renderControl.highlightControlOff();
					foo.GetControlByName($(this).attr("id")).draw();
					foo.action(foo, "state_change");
					//foo.draw();
			})
			break;
		case deviceMode.CONTROL:
			var map_menu = this.map.GetControlByName('menu');
			map_menu.RemoveAdditionalMenuItems();
			map_menu.AddAdditionalMenuItem("tutor_ex_menu", "Контроль <span class=\"user_name\">" + this.user_firstName + " " + this.user_secondName + "</span>", this.ex.name);
			map_menu.FocusOnAdditionalMenuItem(1);
			break;
		break;
	}

}

Tutor.prototype.showCurrentGoal = function() {
	switch(this.map.mode){
		case deviceMode.TRAINING:
			$('div#tutor_ex_menu ul li').removeClass("selected");
			var foo = this.next_goal_state;
			while(this.ex.nodes[foo].goal === "")
				foo++;
			$('div#tutor_ex_menu li.' + this.ex.nodes[foo].hash).addClass("selected");
			$('div#tutor_ex_menu ul li ul li').removeClass("selected");
			foo = this.next_goal_state;
			while(this.ex.nodes[foo].goal === "" && this.ex.nodes[foo].button_hint === "")
				foo++;
			$('div#tutor_ex_menu ul li ul li.' + this.ex.nodes[foo].hash).addClass("selected");
			break;
		case deviceMode.CONTROL:
			//$('span#fail').html(this.fail_count);
			console.log("error count = " + this.fail_count);
			break;
	}
}

Tutor.prototype.unloadExercise = function(ex) {
	delete this.ex;
	this.next_goal_state = -1;
	delete this.prev_state;
	//this.hash_pool = [];
	this.new_state = {};
	this.fail_count = 0;
}

// Tutor.prototype.revertMapState = function() {
// 	this.map.state = this.prev_state;
// 	this.next_goal_state = this.prev_goal_num
// 	this.map.draw();
// }

Tutor.prototype.revertMapState = function() {
	this.map.rollbackTo(this.prev_state);
	this.next_goal_state = this.prev_goal_num;
	//this.map.draw();
}

Tutor.prototype.checkStateChanges = function() {
	var prev_goal_num = this.next_goal_state;
	var _prev_state = this.map.state;
	if (this.ex === undefined || this.next_goal_state == -1)
		return;
	if (this.next_goal_state < this.ex.nodes.length /* && this.new_state == this.ex.nodes[this.next_goal_state].hash */)
	{
		this.setNextGoal();
	} else {
		switch(this.map.mode) {
			case deviceMode.TRAINING:
				alert("Ошибка!");
				this.revertMapState();
				this.next_goal_state = prev_goal_num;
				// this.hash_pool = [];
				this.new_state = {};
				return;
			case deviceMode.CONTROL:
				this.fail_count++;
				this.showCurrentGoal();
				// this.hash_pool = [];
				this.new_state = {};
				if (this.fail_count >= 6)
					this.Abort();
				return;
		}
	}
	// while (this.hash_pool.length > 0) {
	// 	if (this.next_goal_state < this.ex.nodes.length && this.hash_pool[0] == this.ex.nodes[this.next_goal_state].hash) {
	// 		this.hash_pool.shift();
	// 		this.setNextGoal();
	// 	}
	// 	else {
	// 		switch(this.map.mode) {
	// 			case deviceMode.TRAINING:
	// 				alert("Ошибка!");
	// 				this.revertMapState();
	// 				this.next_goal_state = prev_goal_num;
	// 				this.hash_pool = [];
	// 				return;
	// 			case deviceMode.CONTROL:
	// 				this.fail_count++;
	// 				this.showCurrentGoal();
	// 				this.hash_pool = [];
	// 				if (this.fail_count >= 5)
	// 					this.Abort();
	// 				return;
	// 		}
	// 	}
	// }
	this.prev_state = _prev_state;
}

Tutor.prototype.setNextGoal = function() {
	this.next_goal_state += 1;
	if (this.next_goal_state >= this.ex.nodes.length) {
		this.Finish();
		return;
	}
	this.showCurrentGoal();
}

Tutor.prototype.Finish = function() {
	alert("Задание выполнено!");
	var value = 70 + (5 - this.fail_count) * 6;
	this.ControlReport(this.user_firstName, this.user_secondName, value);
	this.ShowExListInMenu();
}

Tutor.prototype.ControlReport = function (firstname, secondname, value) {
	var device = this.map.constructor.name;
	var ex = this.ex;
	$.getJSON(
		mainserver + "report/deviceinfo/?callback=?",
		{type : 'ins', name : firstname, soname: secondname, device: device, value: value, testname: ex.name},
		function() {}
	);
	//
}

Tutor.prototype.Abort = function() {
	alert("Задание не выполнено! Допущено слишком много ошибок.");
	this.ShowExListInMenu();
}

Tutor.prototype.checkEx = function() {
	if (this.ex === undefined || this.next_goal_state == -1)
		return false;
	return true;
}

Tutor.prototype.ShowExListInMenu = function() {
	var map_menu = this.map.GetControlByName('menu');
	var bar = this;
	this.unloadExercise();
	var foo = this.map.GetExList();
	var qux = this.map;

	if (this.map.mode == deviceMode.CONTROL)
		this.map.GetControlByName('menu').UnlockMenuItems();

	map_menu.RemoveAdditionalMenuItems();
	var html_s = "";
	for (var i = 0; i < foo.length; i++) {
		html_s += "<li><a href=\"#\" id=\"ex" + i + "\">" + foo[i] + "</a></li>"
	}
	map_menu.AddAdditionalMenuItem("exercise_list", "Задания", "<ul>" + html_s + "</ul>");
	$('div#menu div:last a').each(function(index){ $(this).click(function(){bar.loadExercise(qux.GetEx(index))}) });
	map_menu.FocusOnAdditionalMenuItem(1);
}
