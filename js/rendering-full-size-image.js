import { renderThumbnails } from './displaying-thumbnails.js';
import { showFullsizePicture } from './displaying-gallery.js';

const pictureContainer = document.querySelector('.pictures');
let pictures = [];

const onPictireContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const picture = pictures.find( (item) =>
      item.id === parseInt(thumbnail.dataset.thumbnailId, 10)
    );
    showFullsizePicture(picture);
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures);
  pictureContainer.addEventListener('click', onPictireContainerClick);
};

export { renderGallery };
