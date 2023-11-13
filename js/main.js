import { getPictures } from './data.js';
const pictures = getPictures();
import { renderThumbnails } from './displaying-thumbnails.js';
renderThumbnails(pictures);
