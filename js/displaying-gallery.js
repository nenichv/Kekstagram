const COMMENT_VISIBLE = 5;
const bodyElement = document.querySelector('body');
const fullSizePictureElement = document.querySelector('.big-picture');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentCount = fullSizePictureElement.querySelector('.comments-count');
const commentList = fullSizePictureElement.querySelector('.social__comments');
const cancelButton = fullSizePictureElement.querySelector('.big-picture__cancel');
const commentLoaderButton = fullSizePictureElement.querySelector('.comments-loader');
const commentDisplayCount = fullSizePictureElement.querySelector('.comments-show');

let commentsDisplay = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsDisplay += COMMENT_VISIBLE;

  if (commentsDisplay >= comments.length) {
    commentLoaderButton.classList.add('hidden');
    commentsDisplay = comments.length;
  }
  else {
    commentLoaderButton.classList.remove('hidden');
  }

  const activeSection = document.createDocumentFragment();
  for (let i = 0; i < commentsDisplay; i++) {
    const comment = createComment(comments[i]);
    activeSection.append(comment);
  };

  commentList.innerHTML = '';
  commentList.append(activeSection);
  commentDisplayCount.textContent = commentsDisplay;
  commentCount.textContent = comments.length;
};

const renderPictureDetails = ({ url, likes, description }) => {
  fullSizePictureElement.querySelector('.big-picture__img img').src = url;
  fullSizePictureElement.querySelector('.big-picture__img img').alt = description;
  fullSizePictureElement.querySelector('.social__caption').textContent = description;
  fullSizePictureElement.querySelector('.likes-count').textContent = likes;
};

const showFullsizePicture = (data) => {
  fullSizePictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentLoaderButton.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

const hideFullsizePicture = () => {
  fullSizePictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsDisplay = 0;
};

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideFullsizePicture();
  }
}

const onCancelButtonClick = () => {
  hideFullsizePicture();
};

const onCommentLoader = () => {
  renderComments();
};

cancelButton.addEventListener('click', onCancelButtonClick);
commentLoaderButton.addEventListener('click', onCommentLoader);

export { showFullsizePicture };
