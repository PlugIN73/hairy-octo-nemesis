DeviceS125.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Получение графика входного сигнала с высокой частотой (Начальные значения: Сигнал канала А: sin(10*x))",
			nodes: [
				{ hash: "176490ede404554c57a53ccd9e5ea20d", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='s125/button_img/input3.png'>" },
				{ hash: "b5622748176cf375131c7b09df6bec8d", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img class='button_img' id='power' src='s125/button_img/input3.png'>" },
				{ hash: "176490ede404554c57a53ccd9e5ea20d", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель канала А в крайнее левое положение <img class='button_img' id='power' src='s125/button_img/input3.png'>" },
				{ hash: "", goal: "Разместить график по центру", button_hint: "Вращать вертушек смещения канала А до появления графика в центре <img class='button_img' id='power' src='s125/button_img/input3.png'>" },
				{ hash: "e7b3ebbbc5fcd97cee246f96af4c5dcb", goal: "Увеличить масштаб по оси времени в 5 раз", button_hint: "Включить режим Х*5 <img class='button_img' id='power' src='s125/button_img/input3.png'>" }
			],
			code: "s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.draw();"
		}

	];
}
