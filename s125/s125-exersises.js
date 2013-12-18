DeviceS125.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Получение графика входного сигнала с высокой частотой",
			nodes: [
				{ hash: "66d57ea9763c68590d997421a6772b59", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "25748f0a8095fb20d1fdb629e610658e", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img class='images' id='connectedSignalA' src='s125/images/channel.png'>" },
				{ hash: "b5622748176cf375131c7b09df6bec8d", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель канала А в крайнее левое положение <img class='images' id='openA' src='s125/images/zemlya.png'>" },
				{ hash: "f4fed1dd579ba8689fe910fed3bc86d9", goal: "Увеличить масштаб по оси времени в 5 раз", button_hint: "Включить режим Х*5 <img class='images' id='signalX5' src='s125/images/xy.png'>" }
			],
			code: "s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; window.stateA.frequence = 10; window.formulas.sin; s125.draw(); "
		},
		{
			name: "Получение алгебраической суммы сигналов",
			nodes: [
				{ hash: "4cb3326d756e7d1e0245ef9a019a9ee4", goal: "Включить прибор", button_hint: "Нажать на кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "452613b5b2bd0a6ebaebb21b31ef6361", goal: "Подключить канал А", button_hint: "Вставить штекер в канал А <img id='connectedSignalA' class='images' src='s125/images/channel.png'>" },
				{ hash: "8f64b6f7ae1ce87d951f7359c3bb8b38", goal: "Подключить канал Б", button_hint: "Вставить штекер в канал Б <img id='connectedSignalB' class='images' src='s125/images/channel.png'>" },
				{ hash: "268aa04f497326790edd218f8211d6d8", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель в крайнее левое положение <img id='openA' class='images' src='s125/images/zemlya.png'>" },
				{ hash: "3e77b174b90d73f8fb35b937815e9d16", goal: "Включить отображение сигнала с канала Б", button_hint: "Перевести переключатель в крайнее левое положение <img id='openB' class='images' src='s125/images/zemlya.png'>" },
				{ hash: "c2872821694955e9f5484d9e83c6c8b1", goal: "Перевести переключатель в режим отображения данных с канала А и Б", button_hint: "Включить режим A и Б <img id='showSignalAB' class='images' src='s125/images/ab.png'>" },
				{ hash: "00e819eb88d2cd454d88917578068f15", goal: "Перевести переключатель режим алгебраической суммы каналов А и Б", button_hint: "Включить режим А+Б <img id='showSignalComboAwithB' class='images' src='s125/images/sum.png'>" },
			],
			code: "window.stateA.func=window.formulas.sin; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.state.closedB=0; s125.state.earthB=1; s125.state.openB=0; s125.draw();"
		},
		{
			name: "Получение фигуры Лиссажу",
			nodes: [
				{ hash: "4cb3326d756e7d1e0245ef9a019a9ee4", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='images' id='power' src='s125/images/power.png'>" },
				{ hash: "452613b5b2bd0a6ebaebb21b31ef6361", goal: "Подключить канал А", button_hint: "Нажать кнопку <img class='images' id='ng' src='s125/images/channel.png'>" },
				{ hash: "8f64b6f7ae1ce87d951f7359c3bb8b38", goal: "Подключить канал Б", button_hint: "Нажать кнопку <img class='images' id='right' src='s125/images/channel.png'>" },
				{ hash: "268aa04f497326790edd218f8211d6d8", goal: "Включить отображение сигнала с канала А", button_hint: "Перевести переключатель в крайнее левое положение <img class='images' id='' src='s125/images/zemlya.png'>" },
				{ hash: "3e77b174b90d73f8fb35b937815e9d16", goal: "Включить отображение сигнала с канала Б", button_hint: "Перевести переключатель в крайнее левое положение <img class='images' id='ng' src='s125/images/zemlya.png'>" },
				{ hash: "781417369f39ef449e3d2c32daf2a0c1", goal: "Перевести переключатель отображения в положение X-Y", button_hint: "Включить режим X-Y <img class='images' id='ngi1' src='s125/images/xy.png'>" },
			],
			code: "window.stateA.amplitude=5; window.stateA.func=window.formulas.sin; window.stateB.amplitude=5; window.stateB.frequence=1.5; window.stateA.func=window.formulas.cos; s125.state.power=0; s125.state.closedA=0; s125.state.earthA=1; s125.state.openA=0; s125.state.closedB=0; s125.state.earthB=1; s125.state.openB=0; s125.draw();"
		}

	];
}
