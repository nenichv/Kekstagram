import { getPictures } from './data.js';
import { renderGallery } from './rendering-full-size-image.js';
import { formValidation } from './validation.js';

renderGallery(getPictures());
formValidation();

