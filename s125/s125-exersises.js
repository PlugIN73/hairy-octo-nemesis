DeviceS125.prototype.InitEx = function() {
	this.exercises = [
		{
			name: "Измерить частотно модулированный входной НГ сигнал",
			nodes: [
				{ hash: "3d0ceabbcc7556981c3ed8f813f68299", goal: "Подключить штекер провода ко входу прибора", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='input3' src='yaz/button_img/input3.png'>" },
				{ hash: "f35e1eccc81666f8bfe606d96aef889d", goal: "Включить режим измерения синусоидального сигнала", button_hint: "Нажать кнопку НГ <img class='button_img' id='ng' src='yaz/button_img/ng.png'>" },
				{ hash: "e7f01f412caeec67bafad2f9c9200f60", goal: "Задать режим автоматического измерения частоты НГ сигнала с частотной модуляцией", button_hint: "Нажать кнопку F/# <img class='button_img' id='F' src='yaz/button_img/F.png'>" }
			],
			code: "yaz.state.power=1; yaz.state.up=1; yaz.state.mode_on=yaz.state.def.symbolControl; yaz.state.number_add=5; yaz.state.metric=0; yaz.state.signal_mode=yaz.state.def.impuls; yaz.state.hand=0; yaz.draw(); setParamSignal('sinf', 3.6);"
		},
		{
			name: "Измерить несущую частоту ИМ сигнала в автоматическом режиме",
			nodes: [
				{ hash: "cfaa0d4d1ae562181d9d79d22f631604", goal: "Подключить штекер провода ко входу прибора", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='input3' src='yaz/button_img/input3.png'>" },
				{ hash: "7559827cd3d08725293cfbc8af33ddc0", goal: "Включить режим измерения ИМ сигнала", button_hint: "Нажать кнопку НГ <img class='button_img' id='ng' src='yaz/button_img/ng.png'>" }
			],
			code: "yaz.state.power=1; yaz.state.up=1; yaz.state.mode_on=yaz.state.def.symbolControl; yaz.state.number_add=5; yaz.state.metric=0; yaz.state.signal_mode=yaz.state.def.sin; yaz.state.hand=0; yaz.draw(); setParamSignal('imp', 6.2);"
		},
		{
			name: "Измерить несущую частоту ИМ сигнала в ручном режиме",
			nodes: [
				{ hash: "08f64994f9e876b5f33b0c2a921bdcf2", goal: "Подключить штекер провода ко входу прибора", button_hint: "Кликнуть на изображение входа А <img class='button_img' id='input3' src='yaz/button_img/input3.png'>" },
				{ hash: "3a6de4a02b117743f3dbc9bec8524635", goal: "Включить режим измерения ИМ сигнала", button_hint: "Нажать кнопку НГ <img class='button_img' id='ng' src='yaz/button_img/ng.png'>" },
				{ hash: "7b811ebbcacd80343ce20fd2edc66b81", goal: "Включить в ручной режим", button_hint: "Нажать кнопку → <img class='button_img' id='right' src='yaz/button_img/right.png'>" },
				{ hash: "5b99c60230597a499b6dc648bdfbc15a", goal: "", button_hint: "" },
				{ hash: "d8242d5336f15dce7959cc560182f341", goal: "", button_hint: "" },
				{ hash: "424e99acc3538190a7fc5634584122a2", goal: "", button_hint: "" },
				{ hash: "7b5c47ea606f26667947ff5901d71dfe", goal: "", button_hint: "" },
				{ hash: "42725a49cc9f007bc63646f9717b4086", goal: "", button_hint: "" },
				{ hash: "8efab3f3983e84bc934320bcdb1fd2fd", goal: "", button_hint: "" },
				{ hash: "2f3ca440284af6e99ef95f0e20d9df34", goal: "", button_hint: "" },
				{ hash: "3d45c37fd99c11216d8b541321779747", goal: "С помощью кнопки → установить значение 2.3", button_hint: "Нажать кнопку → <img class='button_img' id='right' src='yaz/button_img/right.png'>" },
				{ hash: "0a3ddaa449da09802a064ce41f6d44a4", goal: "Задать режим автоматического измерения частоты", button_hint: "Нажать кнопку F/# <img class='button_img' id='F' src='yaz/button_img/F.png'>" }
			],
			code: "yaz.state.power=1; yaz.state.up=1; yaz.state.mode_on=yaz.state.def.symbolControl; yaz.state.number_add=5; yaz.state.metric=0; yaz.state.signal_mode=yaz.state.def.sin; yaz.state.hand=0; yaz.draw(); setParamSignal('imp', 2.300567457);"
		}
	];
}

