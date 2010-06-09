/*
 - Countdown Timer Gadget
 -  by Nate Vogel June 2010
 -
 - http://funtothinkabout.com
*/
function getTimeSuffix(seconds)
{
  return seconds > 3600 ? "HR" : seconds > 60 ? "MIN" : "SEC";
}
