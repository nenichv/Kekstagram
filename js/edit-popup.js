import { initScale, destroyScale } from './scale.js';
import { initEffect, destroyEffect } from './effect.js';
import { isValidTypeFile } from './type-photo.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_COUNT_HASHTAG = 5;
const PATTERN_VALID = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const closeBtn = form.querySelector('.img-upload__cancel');
const overlay = form.querySelector('.img-upload__overlay');
const fileChooser = form.querySelector('.img-upload__preview img');
const fileInput = form.querySelector('.img-upload__start input[type=file]');
const comment = form.querySelector('.text__description');
const hashtag = form.querySelector('.text__hashtags');
const submitBtn = body.querySelector('.img-upload__submit');
const effectPreview = form.querySelectorAll('.effects__preview');

const submitBtnText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const Error = {
  PATTERN_INVALID: 'Неверный хэштег!',
  UNORIGINALITY: 'Хэштеги не могут быть одинаковыми!',
  COUNT_INVALID: `Максимум может быть ${MAX_COUNT_HASHTAG} хэштегов!`,
};

const рristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload-error',
}, false);

const disableSubmitBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = submitBtnText.SENDING;
};

const allowSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = submitBtnText.IDLE;
};

const standardizeTag = (tag) => tag.trim().split(' ');

const isValidPatternTag = (value) => {
  for (const normTag of standardizeTag(value).map((tag) => PATTERN_VALID.test(tag))) {
    if (!normTag) {
      return false;
    }
  }
  return true;
};

const isValidCountTag = (value) => standardizeTag(value).length <= MAX_COUNT_HASHTAG;

const isOriginalTag = (value) => {
  const lowerCaseTags = standardizeTag(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const initValidate = () => {
  рristine.addValidator(hashtag, isValidPatternTag, Error.PATTERN_INVALID, 3, true);
  рristine.addValidator(hashtag, isValidCountTag, Error.COUNT_INVALID, 2, true);
  рristine.addValidator(hashtag, isOriginalTag, Error.UNORIGINALITY, 1, true);
};

const openEditPopup = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownClosing);
  closeBtn.addEventListener('click', onCloseBtnClick);
  comment.addEventListener('keydown', onDocumentKeydownIgnore);
  hashtag.addEventListener('keydown', onDocumentKeydownIgnore);
  form.addEventListener('submit', onFormSubmit);
};

const onFileInputChange = () => {
  const file = fileInput.files[0];

  if (isValidTypeFile(file)) {
    const newPicture = URL.createObjectURL(file);
    fileChooser.src = newPicture;
    effectPreview.forEach((element) => {
      element.style.backgroundImage = `url(${newPicture})`;
    });
    openEditPopup();
    initValidate();
    initScale();
    initEffect();
  }
};

const closeEditPopup = () => {
  form.reset();
  рristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownClosing);
  closeBtn.removeEventListener('click', onCloseBtnClick);
  comment.removeEventListener('keydown', onDocumentKeydownIgnore);
  hashtag.removeEventListener('keydown', onDocumentKeydownIgnore);
  form.removeEventListener('submit', onFormSubmit);
  destroyScale();
  destroyEffect();
};

function onCloseBtnClick() {
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

function onFormSubmit(evt) {
  evt.preventDefault();
  const isValid = рristine.validate();
  if (isValid) {
    disableSubmitBtn();
    sendData(new FormData(evt.target))
      .then(closeEditPopup())
      .then(showSuccessMessage)
      .catch(() => {
        closeEditPopup();
        showErrorMessage();
      })
      .finally(allowSubmitBtn);
  }
}

export const initEditPopup = () => {
  fileInput.addEventListener('change', onFileInputChange);
};
