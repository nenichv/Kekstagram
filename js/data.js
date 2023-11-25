import { getRandomInt, getRandomArrayElement, createIdGenerator } from './util.js';

const NAMES = ['Alexander', 'Dmitry', 'Ivan', 'Alina', 'Nikita', 'Alyona', 'Krokozyabra', 'Rostic'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Holiday with family! I love my home and cake by mom',
  'Hot summer #sea #relax #cool #shark',
  'My cat Marsik #meow #brazilia',
  'This week - HARD WORK! #team #XET_Development #project',
  'The best friends!',
];
const PICTURE_COUNT = 25;
const AvatarId = {
  MIN: 1,
  MAX: 6,
};
const LikeCount = {
  MIN: 15,
  MAX: 200,
};
const CommentCount = {
  MIN: 0,
  MAX: 30,
};
const StringCount = {
  MIN: 1,
  MAX: 2,
};

const createIdComment = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInt(StringCount.MIN, StringCount.MAX) },
  () => getRandomArrayElement(MESSAGES),
).join(' ');

const createComment = () => ({
  id: createIdComment(),
  avatar: `img/avatar-${getRandomInt(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(LikeCount.MIN, LikeCount.MAX),
  comments: Array.from(
    { length: getRandomInt(CommentCount.MIN, CommentCount.MAX) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export { getPictures };

