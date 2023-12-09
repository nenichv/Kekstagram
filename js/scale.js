const DEFAULT_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview'); //+img
const valueScale = modalElement.querySelector('.scale__control--value');
const smallerButton = modalElement.querySelector('.scale__control--smaller');
const biggerButton = modalElement.querySelector('.scale__control--bigger');

const imageScale = (value) => {
  imageElement.style.transform = `scale(${value/100})`;
  valueScale.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentScale = parseInt(valueScale.value, 10);
  const newScale = currentScale - STEP_SCALE;
  const rightValueScale = Math.max(newScale, MIN_SCALE);
  imageScale(rightValueScale);
};

const onBiggerButtonClick = () => {
  const currentScale = parseInt(valueScale.value, 10);
  const newScale = currentScale + STEP_SCALE;
  const rightValueScale = Math.min(newScale, MAX_SCALE);
  imageScale(rightValueScale);
};

export const destroyScale = () => {
  imageScale(DEFAULT_SCALE);
  smallerButton.removeEventListener('click', onSmallerButtonClick);
  biggerButton.removeEventListener('click', onBiggerButtonClick);
};

export const initScale = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
};
