const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success');
const errorMessage = body.querySelector('#error').content.querySelector('.error');
const successBtn = successMessage.querySelector('.success__button');
const errorBtn = errorMessage.querySelector('.error__button');

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

export const showSuccessMessage = () => {
  document.body.append(successMessage);
  successBtn.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessKeydown);
  successMessage.addEventListener('click', onSuccessClick);
};

const closeSuccessMessage = () => {
  successMessage.remove();
  successBtn.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onSuccessKeydown);
  successMessage.removeEventListener('click', onSuccessClick);
};

export const showErrorMessage = () => {
  document.body.append(errorMessage);
  errorBtn.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorKeydown);
  errorMessage.addEventListener('click', onErrorClick);
};

const closeErrorMessage = () => {
  errorMessage.remove();
  errorBtn.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorKeydown);
  errorMessage.removeEventListener('click', onErrorClick);
  showOverlay();
};

function onSuccessClick(evt) {
  if (evt.target !== successMessage.querySelector('.success__inner') &&
    evt.target !== successMessage.querySelector('.success__title')) {
    closeSuccessMessage();
  }
}

function onErrorClick(evt) {
  if (evt.target !== errorMessage.querySelector('.error__inner') &&
    evt.target !== errorMessage.querySelector('.error__title')) {
    closeErrorMessage();
  }
}

function onSuccessButtonClick() {
  closeSuccessMessage();
}

function onErrorButtonClick() {
  closeErrorMessage();
}

function onSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    closeSuccessMessage();
  }
}

function onErrorKeydown(evt) {
  if (evt.key === 'Escape') {
    closeErrorMessage();
  }
}
