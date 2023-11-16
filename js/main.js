import { getPictures } from './data.js';
import { renderThumbnails } from './displaying-thumbnails.js';
const pictures = getPictures();
renderThumbnails(pictures);
