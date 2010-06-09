/*
 - Countdown Timer Gadget
 -  by Nate Vogel June 2010
 -
 - http://funtothinkabout.com
*/
System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = onSettingsClosed;

var seconds = 0;
var countdown_timer = null;
var debug_mode = 1;

var countdown_min = 30;
var max_alarm_notifies = 2;

function init()
{
  loadSettings();
}

function resetCountdown()
{
  pauseCountdown();
  
  seconds = 60 * countdown_min;
  document.getElementById('countdown_block').innerHTML = seconds / 60;
}

function startCountdown()
{
  countdown();  
  showPauseButton();
}
function pauseCountdown(obj)
{
  clearTimeout(countdown_timer);
  showPlayButton();
}
function countdown()
{
  if (seconds > 0) {
    seconds -= 1;
    document.getElementById('countdown_block').innerHTML = seconds > 60 ? (Math.floor(seconds / 60) + " MIN") : (seconds + " SEC");
    updateProgressBar();
    countdown_timer = setTimeout('countdown()', 1000);
  } else {
    timesUp(0);
  }
}
function updateProgressBar()
{
  var width = Math.round(seconds / (60*countdown_min) * 100);
  document.getElementById('progress_bar').style.width = width + "%";
  
  var tick = document.getElementById('countdown_tick');
  /*
  if (tick.style.visibility == '' || tick.style.visibility == 'visible') {
    tick.style.visibility = 'hidden';
  } else {
    tick.style.visibility = 'visible';
  }
  */

  if (tick.style.color == '#666') {
    tick.style.color = '#ccc';
  } else {
    tick.style.color = '#666';
  } 
}
function timesUp(i)
{
  if (i++ < max_alarm_notifies) {
    System.Sound.playSound("sound/alarm.wav");
    document.getElementById('countdown_block').innerHTML = "<marquee>TIMES UP</marquee>";
    
    setTimeout("timesUp("+i+");", 4000);
  } else {
    showPlayButton();
  }
}
function showPlayButton()
{
  if (document.getElementById('pause')) {
    var pause_btn = document.getElementById('pause');
    pause_btn.onclick = function() { startCountdown(); }
    pause_btn.src = "images/play.png";
    pause_btn.id  = "play";
  }
}
function showPauseButton()
{
  if (document.getElementById('play')) {
    var play_btn = document.getElementById('play');
    play_btn.onclick = function() { pauseCountdown(); }
    play_btn.src = "images/pause.png";
    play_btn.id  = "pause";  
  }
}

function debug(msg)
{
  if (debug_mode) {
    //System.Debug.outputString(msg);
    window.prompt(msg);
  }
}

function loadSettings()
{
  var setting_min = 0;
  var custom_countdown = System.Gadget.Settings.readString("custom_countdown_min");
  if (custom_countdown > 0) {
    setting_min = custom_countdown;
  } else {
    setting_min = System.Gadget.Settings.readString("countdown_minutes");
  }
  
  var setting_alarm_notifs = System.Gadget.Settings.read("countdown_alarm_notifies");
  
  max_alarm_notifies = setting_alarm_notifs == '' ? 2 : setting_alarm_notifs;
  countdown_min = setting_min == '' ? 30 : setting_min;
  
  resetCountdown();
}

function onSettingsClosed(event)
{
  // User hits OK on the settings page.
  if (event.closeAction == event.Action.commit)
  {
    loadSettings();
  }
  // User hits Cancel on the settings page.
  //else if (event.closeAction == event.Action.cancel)
  //{
  //  SetContentText("Cancelled");
  //}
}
