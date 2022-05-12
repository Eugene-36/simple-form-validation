import { heroes, languages } from './db.js';

const checkbox = document.getElementById('checkbox');
const makeChoose = Array.from(document.querySelectorAll('[data-make-choose]'));
const nextStepBtn = document.querySelector('[ data-btn-second]');

//По дефолту делаем кнопку не активной
nextStepBtn.setAttribute('disabled', 'disabled');

// И только если свитчер в полежении true тогда, активируем кнопку
checkbox.addEventListener('change', (e) => {
  makeChoose.map((el) => {
    if (!checkbox.checked) {
      el.setAttribute('disabled', 'disabled');
      nextStepBtn.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
      nextStepBtn.removeAttribute('disabled');
    }
  });
});

//Добавление имён для первого силекта
languages.map((item) => {
  let getSecondSelect = makeChoose[0];
  let singleElemtn = `<option>${item}</option>`;
  getSecondSelect.insertAdjacentHTML('beforeEnd', singleElemtn);
});

// Добавление имён для второго селекта
heroes.map((item) => {
  let getSecondSelect = makeChoose[1];
  let singleElemtn = `<option>${item}</option>`;
  getSecondSelect.insertAdjacentHTML('beforeEnd', singleElemtn);
});

//По клику на кнопку переходим на следующую форму 