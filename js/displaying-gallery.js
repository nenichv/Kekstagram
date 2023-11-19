const bodyElement = document.querySelector('body');
const fullSizePictureElement = document.querySelector('.big-picture');
const commentElement = document.querySelector('#comment').content.querySelector('.');
const commentCount = fullSizePictureElement.querySelector('social__comment-count');
const commentList = fullSizePictureElement.querySelector('.social__comments');
const cancelButton = fullSizePictureElement.querySelector('.big-picture__cancel');

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture'.alt = name);
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  const activeSection = document.createDocumentFragment();

  comments.forEach( (item) => {
    const comment = createComment(item);
    activeSection.append(comment);
  });

  commentList.append(activeSection);
};

const renderPictureDetails = ({ url, likes, description }) => {
  fullSizePictureElement.querySelector('.big-picture__img img').src = url;
  fullSizePictureElement.querySelector('.big-picture__img img').alt = description;
  fullSizePictureElement.querySelector('.social__caption').textContent = description;
  fullSizePictureElement.querySelector('.likes-count').textContent = likes;
};

const showFullsizePicture = (data) => {
  fullSizePictureElement.classList.remove('hidden');
  commentCount.classList.add('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onKeydown);

  renderPictureDetails(data);
  renderComments(data.comments)
};

const hideFullsizePicture = () => {
  fullSizePictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onKeydown);
};

function onKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideFullsizePicture();
  }
};

const onCancelButtonClick = () => {
  hideFullsizePicture();
};

cancelButton.addEventListener('click', onCancelButtonClick);
export { showFullsizePicture };
