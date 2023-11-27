const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zф-яё0-9]{1,19}$/i;
const Errors = {
  PATTERN_INVALID: 'Неверный хэштег!',
  UNORIGINALITY: 'Хэштеги не могут быть одинаковыми!',
  COUNT_INVALID: `Максимум может быть ${MAX_COUNT_HASHTAG} хэштегов`,
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const cancelButton = formElement.querySelector('.img-upload__cancel');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInput = formElement.querySelector('.img-upload__input');
const hashtag = formElement.querySelector('.text__hashtags');
const comment = formElement.querySelector('.text__description');

const showWindow = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideWindow = () => {
  formElement.reset();
  errorPristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isValidPatternTag = (value) => {
  standardizeTag(value)
    .every( (tag) =>
    PATTERN_VALID.test(tag)
  );
}

const isValidCountTag = (value) => {
  standardizeTag(value).length <= MAX_COUNT_HASHTAG; //CHECK
}

const isOriginalTag = (value) => {
  const lowerCaseTags = standardizeTag(value).map((tag) => tag.lowerCaseTags());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const standardizeTag = (tag) => {
  let tagWithoutSpace = tag.trim();
  tagWithoutSpace.split(' ').filter( (tag) => Boolean(tag.length));
};

function onDocumentKeydown(event) {
  if (event.key == 'Escape') {
    event.preventDefault();
    hideWindow();
  }
};

function onCancelKeydown() {
    hideWindow();
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
  errorPristine.validate();
};

const onFileInputChange = () => {
  showWindow();
};

const errorPristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});

errorPristine.addValidator(
  hashtag,
  isValidCountTag,
  Errors.COUNT_INVALID,
  3,
  true
);

errorPristine.addValidator(
  hashtag,
  isValidCountTag,
  Errors.PATTERN_INVALID,
  2,
  true
);

errorPristine.addValidator(
  hashtag,
  isOriginalTag,
  Errors.UNORIGINALITY,
  1,
  true
);

fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelKeydown);
formElement.addEventListener('submit', onFormSubmit);

