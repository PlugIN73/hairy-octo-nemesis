function Oscilloscope(name, param){
	GraphVisio.superclass.constructor.call(this, name, param);
	this.data = []
}
extend(Oscilloscope, Logic);

Oscilloscope.prototype.signal = function(signal) {
	if (this.data.length >= this.max) {
		this.data = this.data.slice(1);
	}		
	this.data.push(signal);
	
	var res = [];
	var last = 0;
	for (var i = 0; i < this.data.length; ++i) {
		if (last > 0 && this.data[i] == 0 && i > 0) 
			res.push([i, last]);
		if (last == 0 && this.data[i] > 0 && i > 0) 
			res.push([i, last]);
		res.push([i, this.data[i]])
		last = this.data[i];
	}
	
	var series = [{data: res, lines: {fill: true}, color: "#33CC66"}];
	this.plot.setData(series);
	this.plot.draw();
}

Oscilloscope.prototype.setMap = function (map) {
	Oscilloscope.superclass.setMap.call(this, map);
	this.container = this.param.container;
	this.max = 30;
	var series = [{data: [], lines: {fill: true}, color: "black"}];
	
	var g = this;
	var opt = {
		grid: {	borderWidth: 1,	minBorderMargin: 20,labelMargin: 10,
			backgroundColor: { 	colors: ["#E6E6FA", "#E6E6FA"]	},
			margin: { top: 8, bottom: 20, left: 20}
			/*,
			markings: function(axes) {
				var markings = [];
				var xaxis = axes.xaxis;
				for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
					markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
				}
				return markings;
			}*/
		},
		xaxis: {
			min: 0,
			max: this.max, 
			tickFormatter: function (val, axis) {return g.param.scale * val;},
		},
		yaxis: {
			min: 0,
			max: 10000
		},
		legend: {
			show: true
		}
	}
	
	//, xaxes: [{}]
	opt = $.extend(true, opt, this.param.options);
	
	
	this.plot = $.plot(this.container, series, opt);
}