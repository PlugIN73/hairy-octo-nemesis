$(document).ready(function() {
  $('#tabs').tabs({ heightStyle: "fill" });

  s125 = new DeviceS125($('#map'), 800, 521);
  s125.renderAreaControl();

  s125_menu = s125.GetControlByName('menu');
  s125.draw();
  s125_menu.initTooltips();
  s125_menu.initMenuUI();
  s125.start();

  function InputPulseState(opts) {
    this.field = opts.field;
    this.frontX = 0; this.amplitude = 4; this.state = 'zero'; this.lengthOne = 5; this.lengthZero = 3;
  }

  InputPulseState.prototype.switchState = function(state, x) {
    this.state = state;
    this.frontX = x;
  };

  InputPulseState.prototype.getAmplitude = function() {
    return this.state == 'one' ? this.amplitude : 0;
  }

  InputPulseState.prototype.getFunction = function() {
    var self = this;
    if (this.funcName == 'sin' || this.funcName == 'cos') {
      return function(x) { return self.amplitude * self.func(x * self.frequence + self.phase); }
    }

    if (this.funcName == 'rect') {
      return function(x) { return self.func(x); }
    }
  };

  window.stateA = new InputPulseState({ field: 'formulaSignalA' });
  window.stateB = new InputPulseState({ field: 'formulaSignalB' });

  $('.signal_radio_block input').change(function() {
    var field = $(this).data('state');
    var func = $(this).data('function');

    window[field].funcName = func;
    window[field].func = window.formulas[func];
  });

  $('.signal_state input').change(function() {
    var state = $(this).data('state');
    var field = $(this).data('field');
    var val = parseFloat($(this).val());
    if (isNaN(val)) {
      val = 1;
      $(this).val(val);
    }
    window[state][field] = val;
  });

  $('.apply-signal-btn').on('click', function(e) {
    var state = window[$(this).data('state')];
    window[state.field] = state.getFunction();

    e.preventDefault();
  });

  window.formulas = {
    sin: function(x) { return Math.sin(x); },
    cos: function(x) { return Math.cos(x); },
    rect: function(x) {
      if (x <= -10) { this.frontX = 0; }

      if (this.state == 'zero' && Math.abs(x - this.frontX) >= this.lengthZero) {
        this.switchState('one', x);
      } if (this.state == 'one' && Math.abs(x - this.frontX) >= this.lengthOne) {
        this.switchState('zero', x);
      }

      return this.getAmplitude();
    }
  }
  // $('.signal_radio_block input:eq(0)').click();
  // $('.signal_radio_block input:eq(3)').click();
  $('#tab-0 .signal_radio_block input:eq(0)').click();
  $('#tab-1 .signal_radio_block input:eq(2)').click();
  $('.signal_state input').change();
  $('.apply-signal-btn').click();
});

function setMode2(map, mode) {
  map.setMode(mode);
  map.draw();

  switch(mode)
  {
    case deviceMode.EMULATOR:
      map.start();
    break;
    case deviceMode.HELP:
      map.stop();
    break;
  }
}

function setMode(map, mode)	{
  setMode2(s125, mode);

  s125_menu.ModeChanged(mode);
}

function startstopmap() {
  if (s125.startstate) {
    $('#startstop').attr('src', 'img/play.png');
    s125.stop();
  } else {
    $('#startstop').attr('src', 'img/stop.png');
    s125.start();
  }

  return false;
}
