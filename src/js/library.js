import { galleryApi } from './randomFilms';
import { onPosterClick } from './modal';
import createLibraryCards from '../templates/libraryCards.hbs';
import { createAlertFailure } from './alert';
import { updateDataForLocalStorage } from './localStorage';
import { changeColorBtnLibraryClick } from './colorButton';

const containerLibraryElement = document.querySelector('.library-film_list');
const buttonWatchEl = document.querySelector('button[data-watched]');
const buttonQueueEl = document.querySelector('button[data-queue]');
containerLibraryElement.addEventListener('click', onPosterClick);
buttonWatchEl.addEventListener('click', onButtonWatchEl);
buttonQueueEl.addEventListener('click', onButtonQueueEl);

createMarkupWatchLocalStorage();

function onButtonWatchEl(event) {
  changeColorBtnLibraryClick(event, buttonQueueEl);
  createMarkupWatchLocalStorage();
}

function onButtonQueueEl(event) {
  changeColorBtnLibraryClick(event, buttonWatchEl);
  createMarkupQueueLocalStorage();
}

function createMarkupWatchLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  if (galleryApi.watchArr.length === 0) {
    createAlertFailure("You don't have watched films in your library");
    return;
  }
  for (let i of galleryApi.watchArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
      })
      .catch(error => console.log(error));
  }
}

function createMarkupQueueLocalStorage() {
  updateDataForLocalStorage();
  containerLibraryElement.innerHTML = '';

  if (galleryApi.queueArr.length === 0) {
    createAlertFailure("You don't have films in queue in your library");
    return;
  }
  for (let i of galleryApi.queueArr) {
    galleryApi
      .fetchMovieById(i)
      .then(data => {
        createMarkupForLibrary(data);
      })
      .catch(error => console.log(error));
  }
}

function createMarkupForLibrary(data) {
  data.release_date = data.release_date.split('-')[0];
  const markup = createLibraryCards(data);
  containerLibraryElement.insertAdjacentHTML('beforeend', markup);
}
