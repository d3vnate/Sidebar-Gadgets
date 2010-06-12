/*
 - Countdown Timer Gadget
 -  by Nate Vogel June 2010
 -
 - http://funtothinkabout.com
*/
FTTA = {
  countdownTimer: {
    global: {},
    main: {},
    settings: {}
  }
}
FTTA.countdownTimer.global.getSettings = function() 
{
  // override Defaults HERE:
  FTTA.countdownTimer.global.countdown_min = 30;
  FTTA.countdownTimer.global.num_audible_alarm = 2;
  FTTA.countdownTimer.global.presets_list_values = "1||5||15||30||60||240";

  // leave these alone.
  var first_run = System.Gadget.Settings.readString("countdown_first_run");
  if (System.Gadget.Settings.readString("countdown_first_run") != '') {
    FTTA.countdownTimer.global.countdown_min = System.Gadget.Settings.read("countdown_minutes");
    FTTA.countdownTimer.global.presets_list_values = System.Gadget.Settings.read("countdown_presets");
    FTTA.countdownTimer.global.num_audible_alarm = System.Gadget.Settings.read("countdown_alarm_notifies");
  }
  //+"\npresets:"+FTTA.countdownTimer.global.presets_list_values
  debug("countdown_min:"+FTTA.countdownTimer.global.countdown_min+"\nnum alarms:"+FTTA.countdownTimer.global.num_audible_alarm);
}

function getTimeSuffix(seconds)
{
  return seconds > 3600 ? "HR" : seconds > 60 ? "MIN" : "SEC";
}

FTTA.countdownTimer.global.debug_mode = 0;
function debug(msg)
{
  if (FTTA.countdownTimer.global.debug_mode) {
    //System.Debug.outputString(msg);
    window.prompt(msg);
  }
}
