const formElement = document.querySelector('.img-upload__form');
const imageLoading = formElement.querySelector('.img-upload__input ');

export const isValidTypeFile = (file) => {
  if (file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
    return true;
  } else {
    return false;
  }
};
