import { getPictures } from './data.js';
import { renderThumbnails } from './displaying-thumbnails.js';
import { renderGallery } from './rendering-full-size-image.js';

renderThumbnails(getPictures());
renderGallery(getPictures());

