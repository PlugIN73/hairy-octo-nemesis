DeviceS125.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Получение графика входного сигнала с высокой частотой",
			nodes: [
				{ hash: "", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img class='images' id='connectedSignalA' src='s125/images/channel.png'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель канала А в крайнее левое положение <img class='images' id='openA' src='s125/images/zemlya.png'>" },
				{ hash: "", goal: "Увеличить масштаб по оси времени в 5 раз", button_hint: "Включить режим Х*5 <img class='images' id='signalX5' src='s125/images/xy.png'>" }
			],
			code: "s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; window.stateA.frequence = 10; window.formulas.sin; s125.draw(); "
		},
		{
			name: "Получение алгебраической суммы сигналов",
			nodes: [
				{ hash: "", goal: "Включить прибор", button_hint: "Нажать на кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img id='connectedSignalA' class='images' src='s125/images/channel.png'>" },
				{ hash: "", goal: "Подключить канал Б", button_hint: "Вставить штекер в канал Б <img id='connectedSignalB' class='images' src='s125/images/channel.png'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель в крайнее левое положение <img id='openA' class='images' src='s125/images/zemlya.png'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала Б", button_hint: "Перевести переключатель в крайнее левое положение <img id='openB' class='images' src='s125/images/zemlya.png'>" },
				{ hash: "", goal: "Перевести переключатель в режим отображения данных с канала А и Б", button_hint: "Включить режим A и Б <img id='showSignalAB' class='images' src='s125/images/ab.png'>" },
				{ hash: "", goal: "Перевести переключатель режим алгебраической суммы каналов А и Б", button_hint: "Включить режим А+Б <img id='showSignalComboAwithB' class='images' src='s125/images/sum.png'>" },
			],
			code: "window.stateA.func=window.formulas.sin; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.draw();"
		},
		{
			name: "Получение фигуры Лиссажу",
			nodes: [
				{ hash: "", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "", goal: "Подключить канал А", button_hint: "Нажать кнопку <img class='images' id='ng' src='s125/images/channel.png'>" },
				{ hash: "", goal: "Подключить канал Б", button_hint: "Нажать кнопку <img class='images' id='right' src='s125/images/channel.png'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель в крайнее левое положение <img class='images' id='' src='s125/images/zemlya.png'>" },
				{ hash: "", goal: "Включить отображение сигнала с канала Б", button_hint: "Перевести переключатель в крайнее левое положение <img class='images' id='ng' src='s125/images/zemlya.png'>" },
				{ hash: "", goal: "Перевести переключатель отображения в положение X-Y", button_hint: "Включить режим X-Y <img class='images' id='ngi1' src='s125/images/xy.png'>" },
			],
			code: "window.stateA.amplitude=5; window.stateA.func=window.formulas.sin; window.stateB.amplitude=5; window.stateB.frequence=1.5; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.draw();"
		}

	];
}
