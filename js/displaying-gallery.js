const PART_SHOW_COMMNENT = 5;
const bodyElement = document.querySelector('body');
const fullSizePictureElement = document.querySelector('.big-picture');
const commentList = document.querySelector('.social__comments');
const commentElement = commentList.querySelector('.social__comment');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentFullCount = document.querySelector('.comments-count');
const commentsShownElement = document.querySelector('.show-comment');
const commentLoader = document.querySelector('.comments-loader');
let showComment = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  showComment += PART_SHOW_COMMNENT;

  if (showComment < comments.length) {
    commentLoader.classList.remove('hidden');
  } else {
    showComment = comments.length;
    commentLoader.classList.add('hidden');
  }

  commentList.innerHTML = '';

  for (let i = 0; i < showComment; i++) {
    const comment = createComment(comments[i]);
    commentList.appendChild(comment);
  }

  commentsShownElement.textContent = showComment;
  commentFullCount.textContent = comments.length;
};

function onLoaderButtonClick() {
  renderComments();
};

const renderPictureDetails = ({ url, likes, description }) => {
  fullSizePictureElement.querySelector('.big-picture__img img').src = url;
  fullSizePictureElement.querySelector('.big-picture__img').alt = description;
  fullSizePictureElement.querySelector('.social__caption').textContent = description;
  fullSizePictureElement.querySelector('.likes-count').textContent = likes;
};

const showFullsizePicture = (data) => {
  fullSizePictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentLoader.addEventListener('click', onLoaderButtonClick);

  renderPictureDetails(data);
  comments = data.comments.slice();
  renderComments();
};

const hideFullsizePicture = () => {
  fullSizePictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  commentLoader.removeEventListener('click', onLoaderButtonClick);
  showComment = 0;
};

function onCancelButtonClick() {
  hideFullsizePicture();
};

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideFullsizePicture();
  }
}

export { showFullsizePicture };
