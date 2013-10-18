DeviceG5.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Сгенерировать сигнал в режиме внутреннего запуска с амплитудой 0.8455В используя аттенюатор (Задать период 300нс, длительность 100нс)",
			nodes: [
				{ hash: "cac90fed631bff953e39b5de52511849", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='g5/button_img/power.png'>" },
				{ hash: "0b5e2df7c90c3690ce738f88e5e93424", goal: "Переключить на нижнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "8d0f04d17e135501a87f44a823802814", goal: "Включить режима ввода значения периода сигнала", button_hint: "Нажать кнопку T <img class='button_img' id='T' src='g5/button_img/T.png'>" },
				{ hash: "d62c64eaa4156eb5b23f3fb1fe2e9cba", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "974149f01a78d6fc61066cda92db9b28", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "07b754a020c42929f9315fec65a36d9d", goal: "Ввести 00.3", button_hint: "Нажать кнопку 3 <img class='button_img' id='3' src='g5/button_img/3.png'>" },
				{ hash: "bb5345d4f5889aff2c6495119d03309d", goal: "Включить режима ввода значения длительности импульса сигнала", button_hint: "Нажать кнопку τ <img class='button_img' id='R' src='g5/button_img/R.png'>" },
				{ hash: "0405a9f57bf0d1e75d90eaf60e610eb7", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "d689e9c9c9880a61f396be013c2a7f68", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "6068da04f56da24d73f581ef1d954979", goal: "Ввести 00.1", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" },
				{ hash: "6ad2110cc8f1344bf32b22ddb37082cc", goal: "Включить режима ввода значения амплитуды сигнала", button_hint: "Нажать кнопку U <img class='button_img' id='U' src='g5/button_img/U.png'>" },
				{ hash: "ed62caf07709e6e37eeeea880ce7c2a7", goal: "", button_hint: "Нажать кнопку 8 <img class='button_img' id='8' src='g5/button_img/8.png'>" },
				{ hash: "f37690a3c715b53c4fcf40159868018c", goal: "", button_hint: "Нажать кнопку 4 <img class='button_img' id='4' src='g5/button_img/4.png'>" },
				{ hash: "598f945e73db2fb5f7bb80d785ab8766", goal: "", button_hint: "Нажать кнопку 5 <img class='button_img' id='5' src='g5/button_img/5.png'>" },
				{ hash: "5a2b86fb67c15e1f88ec1e4090a1ac5c", goal: "8.455", button_hint: "Нажать кнопку 5 <img class='button_img' id='5' src='g5/button_img/5.png'>" },
				{ hash: "cef9ef64b97879f46af5c694956760eb", goal: "Переключить на верхнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "f3d8f5f4079fca709c322cb730f1d02f", goal: "Подключить к выходу аттенюатор АТ1", button_hint: "Нажать кнопку AT1 <img class='button_img' id='T' src='g5/button_img/T.png'>" },
				{ hash: "cbe6b8793a7429adfd54c5e73e8aa9a3", goal: "Включить режим внутреннего запуска", button_hint: "Нажать кнопку ◌ <img class='button_img' id='0' src='g5/button_img/0.png'>" }
			]
		},
		{
			name: "Настроить прибор на импульсный выходной сигнал в режиме разового механического запуска с амплитудой равной 2.011В",
			nodes: [
				//{ hash: "ff8fd1cd7ab4d01acd447f092604acbc", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='g5/button_img/power.png'>" },
				{ hash: "22b215ecd9a7f63129da395640ec8da1", goal: "Переключить на нижнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "ba04b30d3c903658b103870616057325", goal: "Включить режима ввода значения амплитуды сигнала", button_hint: "Нажать кнопку U <img class='button_img' id='U' src='g5/button_img/U.png'>" },
				{ hash: "8efba49dd30b406b3958951be2ec5c4c", goal: "", button_hint: "Нажать кнопку 2 <img class='button_img' id='2' src='g5/button_img/2.png'>" },
				{ hash: "308eb0595215947cd0a850f3095dc9dd", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "83d96822223f3362078aff36c0b9c768", goal: "", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" },
				{ hash: "4f9247316fa4342cc38378b4255762cf", goal: "Ввести значение 2.011", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" },
				{ hash: "3317359600a7f6be0050f7c997c8bb46", goal: "Переключить на верхнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "1f48f2616976620b596cc9ec92a5a886", goal: "Включить режим разового механического запуска", button_hint: "Нажать кнопку ✋ <img class='button_img' id='3' src='g5/button_img/3.png'>" }
			],
			code: "g5.state.power=true; g5.state.shiftUp=1; g5.state.mode=0; g5.state.at=0; g5.state.outerPulse=g5.state.def.outerPulsePos; g5.state.calibration=0;g5.state.T=3;g5.state.D=0;g5.state.R=1;g5.state.K=0;g5.state.U=1234;g5.state.calibration=0;g5.state.set=0;g5.state.param=0;g5.state.set=0;g5.state.tact=0;g5.state.up=1;g5.draw()"
		},
		{
			name: "Настроить прибор на импульсный сигнал в режиме внутреннего запуска с периодом 1мкс, длительностью 300нс и амплитудой 3В. Затем установить коэффсициент масштаба равным 1",
			nodes: [
				//{ hash: "ff8fd1cd7ab4d01acd447f092604acbc", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='g5/button_img/power.png'>" },
				{ hash: "22b215ecd9a7f63129da395640ec8da1", goal: "Переключить на нижнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "c80703b5b839166c03cad40e5a9fd337", goal: "Включить режима ввода значения периода сигнала", button_hint: "Нажать кнопку T <img class='button_img' id='T' src='g5/button_img/T.png'>" },
				{ hash: "1c696f9a90fd5f3a2d8484cefab0bb32", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "89519ce3fe87a530e46159ff8e817cd2", goal: "", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" },
				{ hash: "7dd85713380e27ca04c971fee3f747be", goal: "Ввести значение 01.0", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "6880999abdfb4a954d0da54f7a975167", goal: "Включить режима ввода значения длительности импульсов сигнала", button_hint: "Нажать кнопку τ <img class='button_img' id='R' src='g5/button_img/R.png'>" },
				{ hash: "c71010893e5572b4a94478f6bc03a89a", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "5d8756c2d750d186bbda7b0248160196", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "79f899ee1caf7f2cdf87139fff8df81e", goal: "Ввести значение 00.3", button_hint: "Нажать кнопку 3 <img class='button_img' id='3' src='g5/button_img/3.png'>" },
				{ hash: "75bf0c94243c8d2f42b73e6ba5393b6b", goal: "Включить режима ввода значения амплитуды сигнала", button_hint: "Нажать кнопку U <img class='button_img' id='U' src='g5/button_img/U.png'>" },
				{ hash: "80b58c841c777bb5070aa9bd65a28dbd", goal: "", button_hint: "Нажать кнопку 3 <img class='button_img' id='3' src='g5/button_img/3.png'>" },
				{ hash: "e1e250926c3fa660b476d401ba28ef46", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "b69b2ff38e32faa17804350229abe3a5", goal: "", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "ef7a84f4008f22316789c79073622dd0", goal: "Ввести значение 3.000", button_hint: "Нажать кнопку 0 <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "cb83b8a3a95e8e72fde7fff0228079c8", goal: "Переключить на верхнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "bd1488d39b91b808005ff76956de5614", goal: "Включить режим внутреннего запуска", button_hint: "Нажать кнопку ◌ <img class='button_img' id='0' src='g5/button_img/0.png'>" },
				{ hash: "819b882b953b080aa28530581725e8a5", goal: "Переключить на нижнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "8eaa560a73eaef2f404e4b6a670a877b", goal: "Включить режима ввода значения коэффициента масштаба", button_hint: "Нажать кнопку K <img class='button_img' id='K' src='g5/button_img/K.png'>" },
				{ hash: "5b8a0ab49bfc70497ac91ae6c69d53ad", goal: "Ввести значение 1", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" }
			],
			code: "g5.state.power=true; g5.state.shiftUp=1; g5.state.mode=0; g5.state.at=0; g5.state.outerPulse=g5.state.def.outerPulsePos; g5.state.calibration=0;g5.state.T=3;g5.state.D=0;g5.state.R=1;g5.state.K=0;g5.state.U=1234;g5.state.calibration=0;g5.state.set=0;g5.state.param=0;g5.state.set=0;g5.state.tact=0;g5.state.up=1;g5.draw()"
		},
		{
			name: "Настроить прибор на режим постоянного тока U = ‒1.643В",
			nodes: [
				//{ hash: "ff8fd1cd7ab4d01acd447f092604acbc", goal: "Включить прибор", button_hint: "Нажать кнопку СЕТЬ <img class='button_img' id='power' src='g5/button_img/power.png'>" },
				{ hash: "22b215ecd9a7f63129da395640ec8da1", goal: "Переключить на нижнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "ba04b30d3c903658b103870616057325", goal: "Включить режима ввода значения амплитуды сигнала", button_hint: "Нажать кнопку U <img class='button_img' id='U' src='g5/button_img/U.png'>" },
				{ hash: "b7ee07ba318e00de690bc96287d65e4f", goal: "", button_hint: "Нажать кнопку 1 <img class='button_img' id='1' src='g5/button_img/1.png'>" },
				{ hash: "e963c60abe7a37417a516ffdc5daf7dd", goal: "", button_hint: "Нажать кнопку 6 <img class='button_img' id='6' src='g5/button_img/6.png'>" },
				{ hash: "f4b1fc3f89743cefd7912d4f8c3df992", goal: "", button_hint: "Нажать кнопку 4 <img class='button_img' id='4' src='g5/button_img/4.png'>" },
				{ hash: "1e0fc5e3f562e79ca2dd939d0b769c4a", goal: "Ввести значение 1.643", button_hint: "Нажать кнопку 3 <img class='button_img' id='3' src='g5/button_img/3.png'>" },
				{ hash: "2eb1ff197495c293b3ec373c8149f173", goal: "Переключить на верхнее поле ввода", button_hint: "Нажать кнопку ПОЛЕ <img class='button_img' id='shift' src='g5/button_img/shift.png'>" },
				{ hash: "30090e9eacfc18e0cb59cd011549f6ec", goal: "Задать отрицательную полярность выходного сигнала", button_hint: "Нажать кнопку ‒U <img class='button_img' id='K' src='g5/button_img/K.png'>" },
				{ hash: "ae624be3ba87b714056e0e23e4084ffd", goal: "Включить режим постоянного тока", button_hint: "Нажать кнопку ⥫ <img class='button_img' id='4' src='g5/button_img/4.png'>" }
			],
			code: "g5.state.power=true; g5.state.shiftUp=1; g5.state.mode=0; g5.state.at=0; g5.state.outerPulse=g5.state.def.outerPulsePos; g5.state.calibration=0;g5.state.T=3;g5.state.D=0;g5.state.R=1;g5.state.K=0;g5.state.U=1234;g5.state.calibration=0;g5.state.set=0;g5.state.param=0;g5.state.set=0;g5.state.tact=0;g5.state.up=1;g5.draw()"
		}
	]
}