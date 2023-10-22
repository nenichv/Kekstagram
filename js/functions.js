const checkStringLength = (input, maxLength) => input.length <= maxLength;

const isPalindrome = function(input) {
  const normalizeString = input.toLowerCase().replaceAll(' ', '');
  const reverseString = normalizeString.split('').reverse().join('');

  return normalizeString === reverseString;
};

const extractNumbers = function(input) {
  const workString = input.toString();
  let resultString = '';

  for (let element = 0; element < workString.length; element++) {
    const charElement = workString.at(element);
    const isNumber = !(Number.isNaN(parseInt(charElement, 10)));

    if (isNumber) {
      resultString += charElement;
    }
  }

  return resultString ? +resultString : NaN;
};

checkStringLength('winx', 4);
isPalindrome('Лёша на полке клопа нашёл');
isPalindrome('winx club');
extractNumbers('jh ds35kj5 .90');
extractNumbers('empty string');
extractNumbers(12345);

function getTimeInMinutes(stringTime) {
  const [hours, minutes] = stringTime.split(':');

  return hours * 60 + Number(minutes);
}

function checkStatusMeeting(startWorkDay, endWorkDay, startMeeting, durationMeeting) {
  const startWorkDayMinutes = getTimeInMinutes(startWorkDay);
  const endWorkDayDayMinutes = getTimeInMinutes(endWorkDay);
  const startMeetingMinutes = getTimeInMinutes(startMeeting);

  return (
    (startWorkDayMinutes <= startMeetingMinutes) && (endWorkDayDayMinutes >= (startMeetingMinutes + durationMeeting))
  );
}

checkStatusMeeting('12:00', '20:00', '10:00', 60);
