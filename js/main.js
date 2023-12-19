import { initEditPopup } from './edit-popup.js';
import { getData } from './api.js';
import { showAlert } from './message.js';
import { showFilteredPhotos } from './filter-dashboard.js';

getData()
  .then((thumbnails) => {
    showFilteredPhotos(thumbnails);
  })
  .catch(
    () => {
      showAlert('Проблемы с сервером: не удалось загрузить данные. Попробуйте обновить страницу!');
    }
  );

initEditPopup();
