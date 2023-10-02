const checkStringLength = function(input, maxLength) { return input.length <= maxLength };
console.log(checkStringLength('winx', 4));

const checkStringPalindrome = function(input) {
  const normalizeString = input.toLowerCase().replaceAll(' ', '');
  const reverseString = normalizeString.split('').reverse().join('');
  return normalizeString === reverseString;
};
console.log(checkStringPalindrome('Лёша на полке клопа нашёл'));
console.log(checkStringPalindrome('winx club'));

const extractNumbers = function(input) {
  const workString = input.toString();
  let resultString = '';

  for (let element = 0; element < workString.length; element++) {
    const charElement = workString.at(element);
    const isNotNumber = isNaN(parseInt(charElement, 10));
    if (!isNotNumber) resultString += charElement;
  }
  return resultString ? +resultString : NaN;
};
console.log(extractNumbers('jh ds35kj5 .90'));
console.log(extractNumbers('empty string'));
console.log(extractNumbers(12345));
