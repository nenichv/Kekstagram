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

const getTimeInMinutes = (stringTime) => {
  return stringTime.split(':')[0] * 60 + Number(stringTime.split(':')[1]);
}

const checkStatusMeeting = (startWorkDay, endWorkDay, startMeeting, durationMeeting) => {
    return (getTimeInMinutes(startWorkDay) <= getTimeInMinutes(startMeeting)) && (getTimeInMinutes(endWorkDay) >= (getTimeInMinutes(startMeeting) + durationMeeting));
  };

  checkStatusMeeting('12:00', '20:00', '10:00', 60);
