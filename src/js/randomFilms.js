import { GalleryApi } from './galleryApi';
import { createAlertFailure } from './alert';
import {
  changeIdOfGenreToName,
  changeDateInArrayOfResults,
  createArrayOfGenres,
} from './datesForMarkup';
import { changePerPageOfQuery } from './perPageMediaRule';
import { onPosterClick } from './modal';
import { updateDataForLocalStorage } from './localStorage';
import createFilmCards from '../templates/filmCards.hbs';
import { onFormSubmit } from './inputFilms';

const formEl = document.querySelector('#search-form');
export const containerEl = document.querySelector('.cards-film_list');

export const galleryApi = new GalleryApi();
createArrayOfGenres();
updateDataForLocalStorage();

export const createRandomMarkup = () => {
  galleryApi
    .fetchTrendingMovies()
    .then(data => {
      changePerPageOfQuery();

      changeIdOfGenreToName(data.results);
      changeDateInArrayOfResults(data.results);
      containerEl.innerHTML = createFilmCards(data.results);
      containerEl.addEventListener('click', onPosterClick);
      formEl.addEventListener('submit', onFormSubmit);
    })
    .catch(error => console.log(error));
};

createRandomMarkup();
