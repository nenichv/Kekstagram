const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zа-яё0-9]{1,19}$/i;
const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const closeBtn = formElement.querySelector('.img-upload__cancel');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInput = formElement.querySelector('.img-upload__input');
const comment = formElement.querySelector('.text__description');
const hashtag = formElement.querySelector('.text__hashtags');

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

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  рristine.validate();
}

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

function initValidate() {
  рristine.addValidator(hashtag, isValidCountTag, Error.COUNT_INVALID, 3, true);
  рristine.addValidator(hashtag, isValidPatternTag, Error.PATTERN_INVALID, 2, true);
  рristine.addValidator(hashtag, isOriginalTag, Error.UNORIGINALITY, 1, true);
}

const openEditPopup = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownClosing);
  formElement.addEventListener('submit', onFormElementSubmit);
  closeBtn.addEventListener('click', onCloseBtnClick);
  comment.addEventListener('keydown', onDocumentKeydownIgnore);
  hashtag.addEventListener('keydown', onDocumentKeydownIgnore);
};

function onFileInputChange () {
  openEditPopup();
  initValidate();
}

const closeEditPopup = () => {
  formElement.reset();
  рristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownClosing);
  formElement.removeEventListener('submit', onFormElementSubmit);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  comment.removeEventListener('keydown', onDocumentKeydownIgnore);
  hashtag.removeEventListener('keydown', onDocumentKeydownIgnore);
};

function onCloseBtnClick () {
  closeEditPopup();
}

function onDocumentKeydownClosing(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPopup();
  }
}

function onDocumentKeydownIgnore(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

export const initEditPopup = () => {
  fileInput.addEventListener('change', onFileInputChange);
};

