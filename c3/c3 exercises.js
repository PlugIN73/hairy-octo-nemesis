DeviceC3.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Измерить частоту, период (с точность до 7 знака после запятой) и длительность фронта входного импульсного сигнала U=1В, F=1МГц",
			nodes: [
				{ hash: "5de67ed3d3e5ac00b2d015c8012d5798", goal: "Включение напряжения сети", button_hint: "Переключить тумблер СЕТЬ в состояние ВКЛ <img class='button_img' id='power' src='c3/button_img/power.png'>" },
				{ hash: "e9ea9a504e049de435cb94c12db2b6bb", goal: "Выбор вида измерения по входу А", button_hint: "Нажать кнопку fA <img class='button_img' id='fA' src='c3/button_img/fA.png'>" },
				{ hash: "200a173c11e694fecf1f0778bd23fb6e", goal: "Установка показателя сепени выбранного времени счета", button_hint: "Нажать кнопку 6 <img class='button_img' id='6' src='c3/button_img/6.png'>" },
				{ hash: "768b9de96f0ee2ac43eaa2797d4ebb8d", goal: "Ограничение полосы пропускания входного усилителя (0-10МГц)", button_hint: "Нажать кнопку ^a <img class='button_img' id='^a' src='c3/button_img/^a.png'>" },
				{ hash: "a26d3a39a89c0c0c157a2cb2b9f737ed", goal: "Выбор фронта входного сигнала по входу А", button_hint: "Переключить тумблер фронта по входу А на положительный <img class='button_img' id='afront' src='c3/button_img/afront.png'>" },
				{ hash: "69db3f680efeafd219e2a007cd843ca1", goal: "Выбор связи между источником сигнала и входными усилителями канала А", button_hint: "Переключить тумблер связи А в положение ~ <img class='button_img' id='aToque' src='c3/button_img/aToque.png'>" },
				{ hash: "266a1b97b827e0541d09374a2a85f8e7", goal: "Подключить штекер провода ко входу А", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='inputA' src='c3/button_img/inputA.png'>" },
				{ hash: "2f24197594c6bc67c29e8efdf8d06df8", goal: "Выбор вида измерения по входу А, 1/ fA  – для измерения периода сигнала", button_hint: "Нажать кнопку 1/fA <img class='button_img' id='fA^-1' src='c3/button_img/fA^-1.png'>" },
				{ hash: "9fd2ec631c68f6465851b414c836383b", goal: "Выбор вида измерения по входу А, tA – для измерения длительности сигнала", button_hint: "Нажать кнопку tA <img class='button_img' id='ta' src='c3/button_img/ta.png'>" }
			],
			code: "setParamSignal(false, 1000, 1000000, 1, 0);"
		},
		{
			name: "Измерить частоту, период (с точность до 5 знака после запятой) и длительность фронта входного синусоидального сигнала U=5В, F=100МГц.",
			nodes: [
				{ hash: "5de67ed3d3e5ac00b2d015c8012d5798", goal: "Включение напряжения сети", button_hint: "Переключить тумблер СЕТЬ в состояние ВКЛ <img class='button_img' id='power' src='c3/button_img/power.png'>" },
				{ hash: "e9ea9a504e049de435cb94c12db2b6bb", goal: "Выбор вида измерения по входу А, fA – для измерения частоты сигнала", button_hint: "Нажать кнопку fA <img class='button_img' id='fA' src='c3/button_img/fA.png'>" },
				{ hash: "d38bc21e3d03ea58d0d7edeb36e2ca85", goal: "Установка показателя сепени выбранного времени счета", button_hint: "Нажать кнопку 4 <img class='button_img' id='4' src='c3/button_img/4.png'>" },
				{ hash: "90f53505621f569279a965ab37898af4", goal: "Выбор предела входного сигнала по входу А", button_hint: "Преключатель «x1/x10»А установить в положение «x10» <img class='button_img' id='ax1x10' src='c3/button_img/ax1x10.png'>" },
				{ hash: "69739d97fcb628319a33ec4ee591b997", goal: "Выбор фронта входного сигнала по входу А", button_hint: "Переключить тумблер фронта по входу А на положительный <img class='button_img' id='afront' src='c3/button_img/afront.png'>" },
				{ hash: "423f0b5d0dae35f82550c3229f193433", goal: "Выбор связи между источником сигнала и входными усилителями канала А", button_hint: "Переключить тумблер связи А в положение ~ <img class='button_img' id='aToque' src='c3/button_img/aToque.png'>" },
				{ hash: "2b4018dab8c92de35410e2f8fc6fbe55", goal: "Подключить штекер провода ко входу А", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='inputA' src='c3/button_img/inputA.png'>" },
				{ hash: "3a4de818e07dfe36ede1b0d92ada21e7", goal: "Выбор вида измерения по входу А, 1/ fA  – для измерения периода сигнала", button_hint: "Нажать кнопку 1/fA <img class='button_img' id='fA^-1' src='c3/button_img/fA^-1.png'>" },
				{ hash: "65f7475fe5e69c0b6f3b9a03c36867d9", goal: "Выбор вида измерения по входу А, tA – для измерения длительности сигнала", button_hint: "Нажать кнопку tA <img class='button_img' id='ta' src='c3/button_img/ta.png'>" }
			],
			code: "setParamSignal(true, 5000, 100000000, 1, 0)"
		},
		{
			name: "Измерить частоту (с точность до 3 знака после запятой) входного синусоидального сигнала U=0,5В, F=510 МГц.",
			nodes: [
				{ hash: "5de67ed3d3e5ac00b2d015c8012d5798", goal: "Включение напряжения сети", button_hint: "Переключить тумблер СЕТЬ в состояние ВКЛ <img class='button_img' id='power' src='c3/button_img/power.png'>" },
				{ hash: "852a1ba42f889946729bc4ed1990a8ea", goal: "Подключить штекер провода ко входу B", button_hint: "Кликнуть на изображение входа B <img class='button_img' id='inputB' src='c3/button_img/inputB.png'>" },
				{ hash: "c53503ae01bf748d5f592c219e0c485c", goal: "Выбор вида измерения по входу В, fВ – для измерения высокочастотного сигнала", button_hint: "Нажать кнопку fB <img class='button_img' id='fB' src='c3/button_img/fB.png'>" },
				{ hash: "ea56c8b2897445d335d11450d848fe91", goal: "Установка показателя сепени выбранного времени счета", button_hint: "Нажать кнопку 2 <img class='button_img' id='2' src='c3/button_img/2.png'>" }
			],
			code: "setParamSignal(true, 500, 510000000, 1, 0)"
		},

	]
}