import { heroes, languages } from './db.js';

const form = document.querySelector('[data-second-from]');
const thirdForm = document.querySelector('[data-third-form]');
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
  let singleElemtn = `<option value=${item}>${item}</option>`;
  getSecondSelect.insertAdjacentHTML('beforeEnd', singleElemtn);
});

// Добавление имён для второго селекта
heroes.map((item) => {
  let getSecondSelect = makeChoose[1];
  let singleElemtn = `<option value=${item}>${item}</option>`;
  getSecondSelect.insertAdjacentHTML('beforeEnd', singleElemtn);
});

//По клику на кнопку переходим на следующую форму
nextStepBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const getDataSetBtnCondition = e.target.dataset.btnSecond === '2';

  if (getDataSetBtnCondition) {
    form.classList.remove('second');
    nextStepBtn.classList.remove('shead-btn');
    form.classList.add('moving-second-form');
    thirdForm.classList.add('third');
  }
});
