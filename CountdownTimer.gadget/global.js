function getTimeSuffix(seconds)
{
  return seconds > 3600 ? "HR" : seconds > 60 ? "MIN" : "SEC";
}
