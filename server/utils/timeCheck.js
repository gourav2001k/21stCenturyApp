const validTime = () => {
  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  var hoursIST = ISTTime.getHours();
  if (hoursIST >= 10 && hoursIST < 17) return true;
  return false;
};

module.exports = validTime;
