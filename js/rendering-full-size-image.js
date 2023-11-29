import { renderThumbnails } from './displaying-thumbnails.js';
import { showFullsizePicture } from './displaying-gallery.js';

const pictureContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
  pictureContainer.addEventListener('click', (event) => {
    const thumbnail = event.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    event.preventDefault();
    const thumbnailId = parseInt(thumbnail.dataset.thumbnailId, 10);
    const picture = pictures.find( (item) =>
      item.id === parseInt(thumbnail.dataset.thumbnailId, 10)
    );
    showFullsizePicture(picture);
  });

  renderThumbnails(pictures);
};

export { renderGallery };
