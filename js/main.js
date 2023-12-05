import { getPictures } from './data.js';
import { renderGallery } from './rendering-full-size-image.js';
import { initEditPopup } from './edit-popup.js';

renderGallery(getPictures());
initEditPopup();

