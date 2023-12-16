import { renderGallery } from './rendering-full-size-image.js';
import { initEditPopup, setFormSubmit } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './message.js';

getData()
  .then((thumbnails) => {
    renderGallery(thumbnails);
  })
  .catch(
    () => {
      showAlert('Проблемы с сервером: не удалось загрузить данные. Попробуйте обновить страницу!');
    }
  );
setFormSubmit();
initEditPopup();
