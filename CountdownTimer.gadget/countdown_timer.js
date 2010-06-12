/*
 - Countdown Timer Gadget
 -  by Nate Vogel June 2010
 -
 - http://funtothinkabout.com
*/
System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = onSettingsClosed;

FTTA.countdownTimer.main.seconds = 0;
FTTA.countdownTimer.main.countdown_timer = null;
FTTA.countdownTimer.main.alarm_timer = null;

FTTA.countdownTimer.main.countdown = {
  reset: function() {
    this.pause();
    FTTA.countdownTimer.main.seconds = 60 * FTTA.countdownTimer.global.countdown_min;
    document.getElementById('countdown_block').innerHTML = FTTA.countdownTimer.main.seconds / 60 + " MIN";
    FTTA.countdownTimer.ui.updateProgressBar();
  },
  start: function() {
    this.run();  
    FTTA.countdownTimer.ui.showPause();
  },
  pause: function(obj) {
    clearTimeout(FTTA.countdownTimer.main.countdown_timer);
    clearTimeout(FTTA.countdownTimer.main.alarm_timer);
    FTTA.countdownTimer.ui.showPlay();
  },
  run: function () {
    if (FTTA.countdownTimer.main.seconds > 0) {
      FTTA.countdownTimer.main.seconds -= 1;
      var time_statement = FTTA.countdownTimer.main.seconds > 60 ? (Math.floor(FTTA.countdownTimer.main.seconds / 60) + " MIN") : (FTTA.countdownTimer.main.seconds + " SEC");
      document.getElementById('countdown_block').innerHTML = time_statement;
      document.getElementById('countdown_block').title = FTTA.countdownTimer.main.seconds + " seconds";
      FTTA.countdownTimer.ui.updateProgressBar();
      FTTA.countdownTimer.main.countdown_timer = setTimeout('FTTA.countdownTimer.main.countdown.run()', 1000);
    } else {
      FTTA.countdownTimer.ui.timesUp(0);
    }
  }
}

FTTA.countdownTimer.ui = {
  updateProgressBar: function() {
    var width = Math.round(FTTA.countdownTimer.main.seconds / (60*FTTA.countdownTimer.global.countdown_min) * 100);
    document.getElementById('progress_bar').style.width = width + "%";
    
    var tick = document.getElementById('countdown_tick');
  
    if (tick.style.color == '#666') {
      tick.style.color = '#ccc';
    } else {
      tick.style.color = '#666';
    } 
  },
  timesUp: function(i) {
    if (i++ < FTTA.countdownTimer.global.num_audible_alarm) {
      System.Sound.playSound("sound/alarm.wav");
      FTTA.countdownTimer.main.alarm_timer = setTimeout("FTTA.countdownTimer.ui.timesUp("+i+");", 4000);  
    } else {
      this.showPlay();
    }
    document.getElementById('countdown_block').innerHTML = "<marquee>TIME'S UP</marquee>";
  },
  showPlay: function() {
    if (document.getElementById('pause')) {
      var pause_btn = document.getElementById('pause');
      pause_btn.onclick = function() { FTTA.countdownTimer.main.countdown.start(); }
      pause_btn.src = "images/play.png";
      pause_btn.id  = "play";
    }
  },
  showPause: function() {
    if (document.getElementById('play')) {
      var play_btn = document.getElementById('play');
      play_btn.onclick = function() { FTTA.countdownTimer.main.countdown.pause(); }
      play_btn.src = "images/pause.png";
      play_btn.id  = "pause";  
    }
  }
}


FTTA.countdownTimer.main.init = function()
{
  FTTA.countdownTimer.main.getSettings();
}

FTTA.countdownTimer.main.getSettings = function()
{
  FTTA.countdownTimer.global.getSettings();

  // override global countdown if custom is set
  var custom_countdown = System.Gadget.Settings.readString("custom_countdown_min");
  if (custom_countdown > 0) {
    FTTA.countdownTimer.global.countdown_min = custom_countdown;
  }
  
  FTTA.countdownTimer.main.countdown.reset();
}

function onSettingsClosed(event)
{
  // User hits OK on the settings page.
  if (event.closeAction == event.Action.commit)
  {
    FTTA.countdownTimer.main.getSettings();
  }
}
