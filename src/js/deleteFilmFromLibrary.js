import ls from './storage';

export const deleteFilmFromMarkup = event => {
  const watchedBtn = document.querySelector('button[data-watched]');
  const queueBtn = document.querySelector('button[data-queue]');
  if (
    watchedBtn.dataset.action === 'active' &&
    event.currentTarget.querySelector('.js-watch').dataset.action === 'watched'
  ) {
    const idForDelete = event.target.dataset.id;
    const filmForDelete = document.querySelector(
      `li[data-id = '${idForDelete}']`
    );
    filmForDelete.remove();
    const allFilms = document.querySelectorAll('li[data-action]');
    const arrayWatch = ls.load('toWatch');
    if (allFilms.length === 0 && arrayWatch.length === 0) {
      document.querySelector('.library_alert').innerHTML =
        "You don't have watched films in your library";
      document.querySelector('.pagination').style.display = 'none';
    }
    return;
  }
  if (
    queueBtn.dataset.action === 'active' &&
    event.currentTarget.querySelector('.js-queue').dataset.action === 'queue'
  ) {
    const idForDelete = event.target.dataset.id;
    const filmForDelete = document.querySelector(
      `li[data-id = '${idForDelete}']`
    );
    filmForDelete.remove();
    const allFilms = document.querySelectorAll('li[data-action]');
    const arrayQueue = ls.load('queue');
    if (allFilms.length === 0 && arrayQueue.length === 0) {
      document.querySelector('.library_alert').innerHTML =
        "You don't have films in queue in your library";
      document.querySelector('.pagination').style.display = 'none';
    }
    return;
  }
};
