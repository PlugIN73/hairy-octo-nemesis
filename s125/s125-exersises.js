DeviceS125.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Получение графика входного сигнала с высокой частотой",
			nodes: [
				{ hash: "", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='s125/button_img/'>" },
				{ hash: "", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img class='button_img' id='connectedSignalA' src='s125/button_img/'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель канала А в крайнее левое положение <img class='button_img' id='openA' src='s125/button_img/'>" },
				{ hash: "", goal: "Увеличить масштаб по оси времени в 5 раз", button_hint: "Включить режим Х*5 <img class='button_img' id='signalX5' src='s125/button_img/'>" }
			],
			code: "s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; window.stateA.frequence = 10; window.formulas.sin; s125.draw(); "
		},
		{
			name: "Получение алгебраической суммы сигналов",
			nodes: [
				{ hash: "3d0ceabbcc7556981c3ed8f813f68299", goal: "Включить прибор", button_hint: "Нажать на кнопку СЕТЬ <img class='button_img' id='power' src='s125/button_img/input3.png'>" },
				{ hash: "f35e1eccc81666f8bfe606d96aef889d", goal: "Подключить канал А", button_hint: "<img id='connectedSignalA' class='button_img' src='s125/button_img/ng.png'>" },
				{ hash: "f35e1eccc81666f8bfe606d96aef889d", goal: "Подключить канал Б", button_hint: "<img id='connectedSignalB' class='button_img' src='s125/button_img/ng.png'>" },
				{ hash: "e7f01f412caeec67bafad2f9c9200f60", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель в крайнее левое положение <img id='openA' class='button_img' src='s125/button_img/F.png'>" },
				{ hash: "e7f01f412caeec67bafad2f9c9200f60", goal: "Включить отображение сигнала с канала Б", button_hint: "Перевести переключатель в крайнее левое положение <img id='openB' class='button_img' src='s125/button_img/F.png'>" },
				{ hash: "e7f01f412caeec67bafad2f9c9200f60", goal: "Перевести переключатель в режим отображения данных с канала А и Б", button_hint: "Включить режим A и Б <img id='showSignalAB' class='button_img' src='s125/button_img/F.png'>" },
				{ hash: "e7f01f412caeec67bafad2f9c9200f60", goal: "Перевести переключатель режим алгебраической суммы каналов А и Б", button_hint: "Включить режим А+Б <img id='showSignalComboAwithB' class='button_img' src='s125/button_img/F.png'>" },
			],
			code: "window.stateA.func=window.formulas.sin; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.draw();"
		},
		{
			name: "Получение фигуры Лиссажу(Начальные значения: Сигнал канала А: 5*sin(x), Сигнал канала Б: 5*cos(1.5*x)",
			nodes: [
				{ hash: "08f64994f9e876b5f33b0c2a921bdcf2", goal: "Включить прибор (нажать кнопку СЕТЬ)", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='power' src='s125/images/power.png'>" },
				{ hash: "3a6de4a02b117743f3dbc9bec8524635", goal: "Подключить канал А", button_hint: "Нажать кнопку <img class='button_img' id='ng' src='s125/images/channel.png'>" },
				{ hash: "7b811ebbcacd80343ce20fd2edc66b81", goal: "Подключить канал Б", button_hint: "Нажать кнопку → <img class='button_img' id='right' src='s125/images/channel.png'>" },
				{ hash: "5b99c60230597a499b6dc648bdfbc15a", goal: "Включить отображение сигнала с канала А (перевести переключатель в крайнее левое положение)", button_hint: "<img class='button_img' id='' src='s125/images/zemlya.png'>" },
				{ hash: "d8242d5336f15dce7959cc560182f341", goal: "Включить отображение сигнала с канала Б (перевести переключатель в крайнее левое положение)", button_hint: "<img class='button_img' id='ng' src='s125/images/zemlya.png'>" },
				{ hash: "424e99acc3538190a7fc5634584122a2", goal: "Перевести переключатель отображения в положение X-Y", button_hint: "<img class='button_img' id='ngi1' src='s125/images/xy.png'>" },
			],
			code: "window.stateA.amplitude=5; window.stateA.func=window.formulas.sin; window.stateB.amplitude=5; window.stateB.frequence=1.5; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.draw();"
		}

	];
}
