'use strict';
import ls from './localStorage';

const cneckBoxEl = document.querySelector('[name="ligthswitcher"]');
const bodyEl = document.querySelector('body');

const switherMode = ls.load('light');
if (switherMode === 'off') {
  cneckBoxEl.checked = true;
  bodyEl.classList.add('night');
}

cneckBoxEl.addEventListener('change', nigthlight);

function nigthlight() {
  if (cneckBoxEl.checked) {
    ls.save('light', 'off');
    bodyEl.classList.add('night');
  } else {
    bodyEl.classList.remove('night');
    ls.save('light', 'on');
  }
}
