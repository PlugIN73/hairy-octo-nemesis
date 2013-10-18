function extend(Child, Parent) {
	var F = function() { }
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype
}

// вспомогательная функция. распечатка в стиле print_r. Троицкий
function print_object(obj, condition) {
	var s = "";
	var foo = "";
	for (prop in obj) {
   		if (typeof obj[prop] == "function")
			continue;
		if (!(condition === undefined))
			if (condition(prop))
				continue;
		if (typeof obj[prop] == "object")
			foo = print_object(obj[prop]);
		else
			foo = obj[prop];
   	    s += prop + ": " + foo + ";\n";
	}
	return s;
}

function Add_CSS(css_file) {
	$("head").append("<link>");
	css = $("head").children(":last");
	css.attr({
		rel:  "stylesheet",
		type: "text/css",
		href: css_file
	});
}

// Новый режим Обучение и контроль. Троицкий
var deviceMode = {EMULATOR: 0, HELP: 1, TRAINING: 2, CONTROL: 3}

var mainserver = "http://localhost:9000/moodle/";

function teststat(device) {
	var column_name = ["id", "name", "soname", "testname", "updated", "value"];
	var column_title = ["№", 'Имя', 'Фамилия', 'Тест', 'Дата', "Балл"];
	var d = [];
	var name = device.constructor.name;
	var container = $(document.createElement("div"));
	container.attr('title', 'Статистика для прибора: ' + device.title);
	container.css('width', '100%');
	var table = $(document.createElement("div"));
	table.css("font-size", "14px");
	container.append(table);
	$.getJSON(mainserver + "report/deviceinfo/?callback=?", {type: 'select', device: name}, function( data ) {
		$(data).each(function(index, element){
			var e = [];
			$(column_name).each(function(index, h){
				var l = element[h];
				if (h == "updated") {
					var dt = moment.unix(parseInt(element[h]));
					moment.lang('ru');
					l = dt.format('DD MMM YYYY, h:mm:ss');
				}
				e.push(l);
			});
			d.push(e);
		});
					
		table.empty();
		table.TidyTable({
				columnTitles : column_title,
				columnValues : []
			});
		table.TidyTable({
				columnTitles : column_title,
				columnValues : d
			});
		container.dialog({
			width:'90%',
			modal: true,
			dialogClass: 'withclose'
		});
	});
}

function cp(o) {
	return jQuery.extend(true, {}, o);
}

function log10(val) {
  return Math.log(val) / Math.LN10;
}