const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const cancelButton = formElement.querySelector('.img-upload__cancel');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInput = formElement.querySelector('.img-upload__input');
const comment = formElement.querySelector('.text__description');
const hashtag = formElement.querySelector('.text__hashtags');
const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zа-яё0-9]{1,19}$/i;

const Error = {
  PATTERN_INVALID: 'Неверный хэштег!',
  UNORIGINALITY: 'Хэштеги не могут быть одинаковыми!',
  COUNT_INVALID: `Максимум может быть ${MAX_COUNT_HASHTAG} хэштегов!`,
};

const рristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload-error',
}, false);

function onFormSubmit (evt) {
  evt.preventDefault();
  рristine.validate();
};

const standardizeTag = (tag) => tag.trim().split(' ');

const isValidPatternTag = (value) => {
  for (const normTag of standardizeTag(value).map((tag) => PATTERN_VALID.test(tag))) {
    if (normTag) {
      return true;
    }
    return false;
  }
};

const isValidCountTag = (value) => standardizeTag(value).length <= MAX_COUNT_HASHTAG;

const isOriginalTag = (value) => {
  const lowerCaseTags = standardizeTag(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

рristine.addValidator(hashtag, isValidCountTag, Error.COUNT_INVALID, 3, true);
рristine.addValidator(hashtag, isValidPatternTag, Error.PATTERN_INVALID, 2, true);
рristine.addValidator(hashtag, isOriginalTag, Error.UNORIGINALITY, 1, true);

const showWindow = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onOpenModalWindow () {
  showWindow();
}

const hideWindow = () => {
  formElement.reset();
  рristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onCancelButtonClick () {
  hideWindow();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideWindow();
  }
}

comment.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

hashtag.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

export const formValidation = () => {
  formElement.addEventListener('submit', onFormSubmit);
  fileInput.addEventListener('change', onOpenModalWindow);
  cancelButton.addEventListener('click', onCancelButtonClick);
}

