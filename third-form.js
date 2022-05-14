import { removeValidation, generateError } from './removeValidation.js';

const phoneElement = document.querySelector('[data-number]');
const btnSend = document.querySelector('[data-btn-third]');
const form = document.querySelector('[data-third-form]');

console.log('third-form', form);

const phoneNumberVal = /^(\+7|8)(\(\d{3}\)|\d{3})\d{7}$/;
// Valid phone number - 89271238123

phoneElement.onblur = function () {
  console.log('check', this.value);

  if (phoneNumberVal.test(this.value)) {
    removeValidation(form);

    this.classList.add('valid');
    this.classList.remove('invalid');

    //Если инпут  валидный тогда удаляем disabled на кнопку send
    btnSend.disabled = false;
    // email.focus();
  } else {
    const error = generateError('Phone should be valid', form);
    phoneElement.parentNode.insertBefore(error, phoneElement.nextSibling);

    this.classList.add('invalid');
    this.classList.remove('valid');

    //Если инпут не валидный тогда добавля disabled на кнопку send
    btnSend.disabled = true;
  }
};
