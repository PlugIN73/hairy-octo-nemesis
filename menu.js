function Menu(name, param) {
	Menu.superclass.constructor.call(this, name);

	this.additional_menu_items_count = 0;

	Add_CSS("menu/menu.css");
}

extend(Menu, Logic)

Menu.prototype.setMap = function (map) {
	Menu.superclass.setMap.call(this, map);
	map.addListener('state_change', this, function() {
		var state = map.state;
		//console.log(state);
	})
	
	map.addListener('control_action', this, function(source, params) {
		if (params.control.render.attr.hint_text === "" || params.control.render.attr.hint_text === undefined)
			this.ShowControlHelp(params.control.name);
		else
			this.ShowControlHelp(params.control.render.attr.hint_text);

		// var control = params.control;
		// console.log(control.name, control.box());
	})
}

Menu.prototype.initMenuUI = function() {
	$('div#menu').accordion({ heightStyle: "content", collapsible: true, icons: false });
}

Menu.prototype.ShowMode = function() {
	var s = "";
	switch(this.map.mode)
	{
		case deviceMode.EMULATOR:
			s = "Режим тренажера: Режим эмулятора";
		break;
		case deviceMode.HELP:
			s = "Режим тренажера: Режим справки";
		break;
		case deviceMode.TRAINING:
			s = "Режим тренажера: Режим обучения";
		break;
		case deviceMode.CONTROL:
			s = "Режим тренажера: Режим контроля";
		break;
	}
	$('div#menu h3#mode_header').html(s);
}

Menu.prototype.AddAdditionalMenuItem = function(id, header, content) {
	$('div#menu').append("<h3 id=" + id + ">" + header + "</h3>");
	$('div#menu').append("<div id=" + id + ">" + content + "</div>");
	this.additional_menu_items_count++;
	$('div#menu').accordion("refresh");
}

 Menu.prototype.RemoveAdditionalMenuItems = function() {
	var i = 0;
	for (;i < this.additional_menu_items_count; i++) {
		$('div#menu h3:last').remove();
		$('div#menu div:last').remove();
	}
	this.additional_menu_items_count = 0;
}

Menu.prototype.FocusOnMenuItem = function(num) {
	$('div#menu').accordion("option", "active", num);
}

Menu.prototype.FocusOnAdditionalMenuItem = function(num) {
	var _num = $('div#menu div').length - this.additional_menu_items_count - 1 + num;
	this.FocusOnMenuItem(_num);
}

Menu.prototype.NoFocusInMenu = function() {
	$('div#menu').accordion("option", "active", "false");
}

Menu.prototype.ChangeMenuItemContent = function(id, value) {
	$('div#menu div#' + id).html(value);
}

Menu.prototype.ShowControlHelp = function(text) {
	this.ChangeMenuItemContent("help_menu_control", text);
}

Menu.prototype.initTooltips = function() {
	$( document ).tooltip({ position: { at: "left top", my: "right bottom"}});
	$( document ).tooltip("disable");
}

// function loadHTML(sURL)
//  {
//    var request=null;

//    // пытаемся создать объект для MSXML 2 и старше
//    if(!request) try {
//      request=new ActiveXObject('Msxml2.XMLHTTP');
//    } catch (e){}

//    // не вышло... попробуем для MSXML 1
//    if(!request) try {
//      request=new ActiveXObject('Microsoft.XMLHTTP');
//    } catch (e){}

//    // не вышло... попробуем для Mozilla
//    if(!request) try {
//      request=new XMLHttpRequest();
//    } catch (e){}

//    if(!request)
//      // ничего не получилось...
//      return "";
  
//    // делаем запрос
//    request.open('GET', sURL, false);
//    request.send(null);

//    // возвращаем текст
//    return request.responseText;
//  }

Menu.prototype.LockMenuItems = function() {
	$('div#menu').accordion("option", "disabled", true);
	$('div#menu').css("opacity", "0.75");
}

Menu.prototype.UnlockMenuItems = function() {
	$('div#menu').css("opacity", "1");
	$('div#menu').accordion("option", "disabled", false);
}

Menu.prototype.ModeChanged = function(mode) {
	switch(mode)
	{	
		case deviceMode.EMULATOR:
			this.RemoveAdditionalMenuItems();
			this.NoFocusInMenu();
		break;
		case deviceMode.HELP:
			this.RemoveAdditionalMenuItems();
			this.AddAdditionalMenuItem("help_menu_control", "Органы управления и индикаторы", "Кликните по органу управления чтобы получить справку");
			this.AddAdditionalMenuItem("help_menu_device", "Назначение, технические данные, методы эксплуатации", "");
			$('div#help_menu_device').html($('div#device_description').html());
			$('div#help_menu_device').css('max-height', '320px');
			$('div#help_menu_device').css('overflow-y', 'auto'); 
			$('div#help_menu_device img').addClass('scaled_image');
			this.FocusOnAdditionalMenuItem(2);
			$( document ).tooltip("enable");
		break; 
		case deviceMode.TRAINING:
		case deviceMode.CONTROL:
			var bar = this.map.GetControlByName('tutor');
			bar.unloadExercise();
			var foo = this.map.GetExList();
			var qux = this.map;
			this.RemoveAdditionalMenuItems();
			var html_s = "";
			for (var i = 0; i < foo.length; i++) {
				html_s += "<li><a href=\"#\" id=\"ex" + i + "\">" + foo[i] + "</a></li>"
			}
			this.AddAdditionalMenuItem("exercise_list", "Задания", "<ul>" + html_s + "</ul>");
			$('div#menu div:last a').each(function(index){ $(this).click(function(){bar.loadExercise(qux.GetEx(index))}) });
			this.FocusOnAdditionalMenuItem(1);
		break;
	}
	this.ShowMode();
}