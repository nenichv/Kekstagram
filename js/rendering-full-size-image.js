import { renderThumbnails } from "./displaying-thumbnails.js";
import { showFullsizePicture } from "./displaying-gallery.js";

const pictureContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  pictureContainer.addEventListener('click', (event) => {
    const thumbnail = event.target.closest('[data-thumbnail-id');
    const thumbnailId = parseInt(thumbnail.dataset.thumbnailId);

    if (!thumbnail) { return; }
    event.preventDefault();

    const picture = pictures.find( (item) =>
      item.id === thumbnailId
    );
    
    showFullsizePicture(picture);
  });

  renderThumbnails(pictures, pictureContainer);
};

export { renderGallery };
