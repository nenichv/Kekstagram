import './validation.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const cancelButton = formElement.querySelector('.img-upload__cancel');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const fileInput = formElement.querySelector('.img-upload__input');


const showWindow = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => showWindow();

const hideWindow = () => {
  formElement.reset();
  рristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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

fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelKeydown);

