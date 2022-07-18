import Notiflix from 'notiflix';

const OPTIONS = { timeout: 1000 };

export const createAlertFailure = message => {
  return Notiflix.Notify.failure(message, OPTIONS);
};
