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
const MAX_PICTURE_COUNT = 25;
const COUNT_AVATARS = 6;
const LIKES_COUNT = {
  MIN: 15,
  MAX: 200,
};
const COMMENTS_COUNT = {
  MIN: 0,
  MAX: 30,
};

const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (items) =>
  items[getRandomInt(0, items.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

const createIdComment = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInt(1, 2) },
  () => getRandomArrayElement(MESSAGES),
).join(' ');

const createComment = () => ({
  id: createIdComment(),
  avatar: `img/avatar-${getRandomInt(1, COUNT_AVATARS)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
  comments: Array.from(
    { length: getRandomInt(COMMENTS_COUNT.MIN, COMMENTS_COUNT.MAX) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: MAX_PICTURE_COUNT },
  (_item, pictureIndex) => createPicture(pictureIndex + 1),
);

getPictures();
