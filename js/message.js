const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success');
const errorMessage = body.querySelector('#error').content.querySelector('.error');

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const hideMessage = () => {
  const message = body.querySelector('.success') || body.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

const showMessage = (message, closeBtnClass) => {
  body.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  message.querySelector(closeBtnClass).addEventListener('click', hideMessage);
};

export const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

export const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick (evt) {
  evt.preventDefault();
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}
