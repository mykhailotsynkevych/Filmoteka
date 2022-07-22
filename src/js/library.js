import './lightSwitch';
import './teamLightbox';
import ls from './storage';
import Pagination from 'tui-pagination';
import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { updateDataForLocalStorage } from './localStorage';
import { changeColorBtnLibraryClick } from './colorButton';

const containerLibraryElement = document.querySelector('.library-film_list');
const buttonWatchEl = document.querySelector('button[data-watched]');
const buttonQueueEl = document.querySelector('button[data-queue]');
containerLibraryElement.addEventListener('click', onPosterClick);
const alertInfo = document.querySelector('.library_alert');
buttonWatchEl.addEventListener('click', onButtonWatchEl);
buttonQueueEl.addEventListener('click', onButtonQueueEl);

const cardsQuantity = 6;

const containerPagination = document.querySelector('.pagination');
const paginationLibraryWatch = new Pagination(containerPagination, {
  itemsPerPage: cardsQuantity,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

const paginationLibraryQueue = new Pagination(containerPagination, {
  itemsPerPage: cardsQuantity,
  visiblePages: 5,
  centerAlign: true,
  firstItemClassName: 1,
  template: {
    currentPage: '<a class="page-btn is-selected">{{page}}</a>',
    page: '<a class="page-btn">{{page}}</a>',
    moveButton: `<button class="move-btn move-btn-{{type}}"></button>`,
    disabledMoveButton:
      '<button class="move-btn move-btn-{{type}} disabled" disabled></button>',
    moreButton: '<a class="page-btn next-is-ellip last-child">...</a>',
  },
});

document.onload = updateDataForLocalStorage();
document.onload = createMarkupWatchLocalStorage();

function onButtonWatchEl(event) {
  changeColorBtnLibraryClick(event, buttonQueueEl);
  createMarkupWatchLocalStorage();
}

function onButtonQueueEl(event) {
  changeColorBtnLibraryClick(event, buttonWatchEl);
  createMarkupQueueLocalStorage();
}

function createMarkupWatchLocalStorage() {
  createMarkupFromLocalStorage(
    'toWatch',
    "You don't have watched films in your library"
  );
}

function createMarkupQueueLocalStorage() {
  createMarkupFromLocalStorage(
    'queue',
    "You don't have films in queue in your library"
  );
}

paginationLibraryWatch.on('afterMove', event => {
  renderMarkupForPaginationMove(event, 'toWatch');
});

paginationLibraryQueue.on('afterMove', event => {
  renderMarkupForPaginationMove(event, 'queue');
});

function renderLibraryMarkup(array) {
  let markup = '';
  array.forEach(el => {
    galleryApi
      .fetchMovieById(el)
      .then(data => {
        data.release_date = data.release_date.split('-')[0];
        data.vote_average = data.vote_average.toFixed(1);
        markup += createLibraryCards(data);
        return markup;
      })
      .then(data => (containerLibraryElement.innerHTML = data))
      .catch(error => console.log(error));
  });
}

function createMarkupFromLocalStorage(key, message) {
  containerPagination.style.display = 'flex';
  containerLibraryElement.innerHTML = '';
  alertInfo.innerHTML = '';

  const arrayDataLocalStorage = ls.load(key);

  if (!arrayDataLocalStorage || arrayDataLocalStorage.length === 0) {
    alertInfo.innerHTML = message;
    containerPagination.style.display = 'none';
    return;
  }

  const arrayForRenderFirstPage = arrayDataLocalStorage.slice(0, cardsQuantity);
  renderLibraryMarkup(arrayForRenderFirstPage);

  if (key === 'toWatch') {
    paginationLibraryWatch.reset(arrayDataLocalStorage.length);
  } else {
    paginationLibraryQueue.reset(arrayDataLocalStorage.length);
  }
}

function renderMarkupForPaginationMove(event, key) {
  const currentPage = event.page;
  alertInfo.innerHTML = '';
  const arrayDataLocalStorage = ls.load(key);
  const arrayForRenderCurrentPage = arrayDataLocalStorage.slice(
    (currentPage - 1) * cardsQuantity,
    currentPage * cardsQuantity
  );
  renderLibraryMarkup(arrayForRenderCurrentPage);
}
