const checkStringLength = function(input, maxLength) { return input.length <= maxLength; };

const checkStringPalindrome = function(input) {
  const normalizeString = input.toLowerCase().replaceAll(' ', '');
  const reverseString = normalizeString.split('').reverse().join('');
  return normalizeString === reverseString;
};

const extractNumbers = function(input) {
  const workString = input.toString();
  let resultString = '';

  for (let element = 0; element < workString.length; element++) {
    const charElement = workString.at(element);
    const isNotNumber = isNaN(parseInt(charElement, 10));
    if (!isNotNumber) { resultString += charElement };
  }
  return resultString ? +resultString : NaN;
};
