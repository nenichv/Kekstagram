const formElement = document.querySelector('.img-upload__form');
const imageLoading = formElement.querySelector('.img-upload__input ');

export const isValidTypeFile = () => {
  const file = imageLoading.files[0];
  
  if (file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
    return true;
  } else {
    return false;
  }
};
