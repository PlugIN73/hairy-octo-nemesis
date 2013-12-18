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
			name: "Получение фигуры Лиссажу(Начальные значения: Сигнал канала А: 5*sin(x), Сигнал канала Б: 5*cos(1.5*x)",
			nodes: [
				{ hash: "08f64994f9e876b5f33b0c2a921bdcf2", goal: "Включить прибор (нажать кнопку СЕТЬ)", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='power' src='s125/images/power.png'>" },
				{ hash: "3a6de4a02b117743f3dbc9bec8524635", goal: "Подключить канал А", button_hint: "Нажать кнопку <img class='button_img' id='ng' src='s125/images/channel.png'>" },
				{ hash: "7b811ebbcacd80343ce20fd2edc66b81", goal: "Подключить канал Б", button_hint: "Нажать кнопку → <img class='button_img' id='right' src='s125/images/channel.png'>" },
				{ hash: "5b99c60230597a499b6dc648bdfbc15a", goal: "Включить отображение сигнала с канала А (перевести переключатель в крайнее левое положение)", button_hint: "<img class='button_img' id='' src='s125/images/zemlya.png'>" },
				{ hash: "d8242d5336f15dce7959cc560182f341", goal: "Включить отображение сигнала с канала Б (перевести переключатель в крайнее левое положение)", button_hint: "<img class='button_img' id='ng' src='s125/images/zemlya.png'>" },
				{ hash: "424e99acc3538190a7fc5634584122a2", goal: "Перевести переключатель отображения в положение X-Y", button_hint: "<img class='button_img' id='ngi1' src='s125/images/xy.png'>" },
			],
			code: "s125.state.power=1; s125.state.up=1; s125.state.mode_on=s125.state.def.symbolControl; s125.state.number_add=5; s125.state.metric=0; s125.state.signal_mode=s125.state.def.sin; s125.state.hand=0; s125.draw();"
		}

	];
}
