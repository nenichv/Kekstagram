const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const formElement = document.querySelector('.img-upload__form');
const hashtag = formElement.querySelector('.text__hashtags');
const comment = formElement.querySelector('.text__description');
const Errors = {
  PATTERN_INVALID: 'Неверный хэштег!',
  UNORIGINALITY: 'Хэштеги не могут быть одинаковыми!',
  COUNT_INVALID: `Максимум может быть ${MAX_COUNT_HASHTAG} хэштегов`,
};

const рristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload-error',
});

const standardizeTag = (tag) => {
  return tag.trim().split(' ');
};

const isValidPatternTag = (value) => {
standardizeTag(value).map((tag) => PATTERN_VALID.test(tag));
for (let i of standardizeTag(value).map((tag) => PATTERN_VALID.test(tag))) {
  if (!i) {
    return false;
  }
}
return true;
};



const isValidCountTag = (value) => {
  return standardizeTag(value).length <= MAX_COUNT_HASHTAG;
};

const isOriginalTag = (value) => {
  const lowerCaseTags = standardizeTag(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

comment.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

hashtag.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
});

const onFormSubmit = (event) => {
  event.preventDefault();
  рristine.validate();
};

рristine.addValidator(hashtag, isValidCountTag, Errors.COUNT_INVALID, 3, true);
рristine.addValidator(hashtag, isValidPatternTag, Errors.PATTERN_INVALID, 2, true);
рristine.addValidator(hashtag, isOriginalTag, Errors.UNORIGINALITY, 1, true);
formElement.addEventListener('submit', onFormSubmit);

