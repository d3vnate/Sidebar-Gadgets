/*
 - Countdown Timer Gadget
 -  by Nate Vogel June 2010
 -
 - http://funtothinkabout.com
*/
System.Gadget.onSettingsClosing = FTTA.countdownTimer.settings.SettingsClosing;

function FTTA.countdownTimer.settings.SettingsClosing(event)
{
  if (event.closeAction == event.Action.commit)
  {
    System.Gadget.Settings.write("countdown_first_run", false); 

    var preset_list = document.getElementById('preset_list');
    System.Gadget.Settings.writeString(
      "countdown_minutes", preset_list.options[preset_list.selectedIndex].value);
    
    System.Gadget.Settings.writeString("countdown_alarm_notifies", 
      document.getElementById("num_audible_alarm").value);
    
    var presets_list_values = '';
    var presets_list = document.getElementById('preset_list');
    for (j=0; j < presets_list.length; j++) {
      presets_list_values += presets_list.options[j].text;
      if (j+1 < presets_list.length) {
        presets_list_values += "||";
      }
    }
    System.Gadget.Settings.writeString("countdown_presets", presets_list_values); 
    
    var custom_countdown = document.getElementById('custom_countdown_min').value;
    if (custom_countdown == '') {
      custom_countdown = 0;
    }
    System.Gadget.Settings.writeString("custom_countdown_min", custom_countdown);

  }
  // Allow the Settings dialog to close.
  event.cancel = false;
}

FTTA.countdownTimer.settings.getSettings = function()
{  
  FTTA.countdownTimer.global.getSettings();
  
  var presets_list = document.getElementById('preset_list');
  presets_list_values = FTTA.countdownTimer.global.presets_list_values.split("||");
  
  // populate countdown minute presets
  for (i = 0; i < presets_list_values.length; i++) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(presets_list_values[i]));
    option.setAttribute("value", presets_list_values[i]);
    if (FTTA.countdownTimer.global.countdown_min == presets_list_values[i]) {
      option.setAttribute("selected", "selected");
    }
    presets_list.appendChild(option);
  }
  
  // populate number of alarm sounds
  document.getElementById("num_audible_alarm").value = FTTA.countdownTimer.global.num_audible_alarm;
  
  return;
}
