$(document).ready(function() {
  $('#tabs').tabs({ heightStyle: "fill" });

  s125 = new DeviceS125($('#map'), 800, 521);
  s125.renderAreaControl();

  s125_menu = s125.GetControlByName('menu');
  s125.draw();
  s125_menu.initTooltips();
  s125_menu.initMenuUI();
  s125.start();

  $('.signal_radio_block input').change(function() {
    var target = $(this).data('target');
    var title = $(this).val();
    var func = $(this).data('function');
    $('#' + target).val(title).data('function', func).attr('disabled', 1);
  });

  $('.apply-signal-btn').on('click', function(e) {
    var $source = $( $(this).data('source') );
    var field = $(this).data('field');

    var fName = $source.data('function');

    var disabledAttr = $source.attr('disabled');
    if (typeof disabledAttr !== 'undefined' && disabledAttr !== false) {
      window[field] = window.formulas[fName];
    } else {
      window[field] = function() {
        var sin = Math.sin, cos = Math.cos;
        return eval(fName);
      }
    }

    e.preventDefault();
  });

  $('.clear-signal-btn').on('click', function(e) {
    var $source = $( $(this).data('source') );
    var field = $(this).data('field');

    window[field] = null;
    $source.val('').removeAttr('disabled');
    e.preventDefault();
  });

  var rectState = {
    frontX: 0, amplitude: 4, state: 'zero', lengthOne: 5, lengthZero: 3,
    switchState: function(state, x) {
      this.state = state;
      this.frontX = x;
    },

    getAmplitude: function() {
      return this.state == 'one' ? this.amplitude : 0;
    }
  };

  window.formulas = {
    sin: function(x) { return Math.sin(x); },
    cos: function(x) { return Math.cos(x); },
    rect: function(x) {
      if (x <= -10) { rectState.frontX = 0; }
      // Грязный хак
      x += 10;
      if (rectState.state == 'zero' && x - rectState.frontX >= rectState.lengthZero) {
        rectState.switchState('one', x);
      } if (rectState.state == 'one' && x - rectState.frontX >= rectState.lengthOne) {
        rectState.switchState('zero', x);
      }

      return rectState.getAmplitude();
    }
  }
});

function isOdd(x) { return x % 2 == 1; }
function isEven(x) { return !isOdd(x); }

function setMode2(map, mode)	{
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
