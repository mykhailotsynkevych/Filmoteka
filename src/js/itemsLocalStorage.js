import ls from './localStorage';
import { galleryApi } from './fetchTrendingFilms';
import { changeColorBtnHomeClick } from './colorButton';

export const onModalClick = event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  const btnWatchModalEl = event.currentTarget.querySelector('.js-watch');
  const btnQueueModalEl = event.currentTarget.querySelector('.js-queue');
  const filmID = event.target.dataset.id;

  switch (event.target.dataset.action) {
    case 'watched':
      galleryApi.watchArr.push(filmID);
      ls.save(`toWatch`, galleryApi.watchArr);
      event.target.dataset.action = 'remove watched';
      event.target.textContent = 'remove from watched';
      changeColorBtnHomeClick(event, btnQueueModalEl);
      break;

    case 'queue':
      galleryApi.queueArr.push(filmID);
      ls.save('queue', galleryApi.queueArr);
      event.target.dataset.action = 'remove queue';
      event.target.textContent = 'remove from queue';
      changeColorBtnHomeClick(event, btnWatchModalEl);
      break;

    case 'remove watched':
      const indexWatched = galleryApi.watchArr.indexOf(filmID);
      galleryApi.watchArr.splice(indexWatched, 1);
      ls.save(`toWatch`, galleryApi.watchArr);
      event.target.dataset.action = 'watched';
      event.target.textContent = 'add to watched';
      changeColorBtnHomeClick(event, btnQueueModalEl);
      break;

    case 'remove queue':
      const indexQueue = galleryApi.queueArr.indexOf(filmID);
      galleryApi.queueArr.splice(indexQueue, 1);
      ls.save('queue', galleryApi.queueArr);
      event.target.dataset.action = 'queue';
      event.target.textContent = 'add to queue';
      changeColorBtnHomeClick(event, btnWatchModalEl);
      break;

    case 'close':
      event.currentTarget.closest('.backdrop').classList.add('is-hidden');
      event.currentTarget.removeEventListener('click', onModalClick);
      break;

    default:
      console.log('Error in value of button');
  }
};

export const updateDataForLocalStorage = () => {
  if (galleryApi.watchArr.length === 0 && ls.load(`toWatch`)) {
    ls.load(`toWatch`).forEach(el => {
      galleryApi.watchArr.push(el);
    });
  }
  if (galleryApi.queueArr.length === 0 && ls.load(`queue`)) {
    ls.load('queue').forEach(el => {
      galleryApi.queueArr.push(el);
    });
  }
};
