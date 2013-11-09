function GraphVisio(name, param){
	GraphVisio.superclass.constructor.call(this, name, param);
	this.data = []
}
extend(GraphVisio, Logic);

GraphVisio.prototype.setMap = function (map) {
	GraphVisio.superclass.setMap.call(this, map);
	this.container = $("#placeholder");
	this.max = 10;
	var series = [{data: [], lines: {fill: true	}}];
	this.plot = $.plot(this.container, series, {
		grid: {	borderWidth: 1,	minBorderMargin: 20,labelMargin: 10,
			backgroundColor: { 	colors: ["#E6E6FA", "#E6E6FA"]	},
			margin: { top: 8, bottom: 20, left: 20},
			markings: function(axes) {
				var markings = [];
				var xaxis = axes.xaxis;
				for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
					markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
				}
				return markings;
			}
		},
		xaxis: {
			min: 0,
			max: this.max, 
			axisLabel: 'Наносекунды', 
			tickFormatter: function (val, axis) {return val;},
		},
		yaxis: {
			min: -10,
			max: 10,
			axisLabel: 'Вольты'
		},
		legend: {
			show: true
		}
	});

	
	map.addListener('signal', this, function(source, series) {
			// if (this.data.length >= this.max) {
		// 	this.data = this.data.slice(1);
		// }		
		// this.data.push(signal);
		
		// var res = [];
		// var last = 0;
		// for (var i = 0; i < this.data.length; ++i) {
		// 	var d = this.data[i];
			/*
			if (last != 0 && d == 0 && i > 0) 
				res.push([i, last]);
			if (last == 0 && d > 0 && i > 0) */
			
		// 	res.push([i, last]);
		// 	res.push([i, d])
		// 	last = this.data[i];
		// }
    if (source.fill_lines == void 0){
      source.fill_lines = true;
    }
		this.plot.setData(series);
		this.plot.draw();
	});
}
