import { generateError } from './removeValidation.js';
import { isRequired, showError, showSuccess, debounce } from './script.js';

//removeValidation
const phoneElement = document.querySelector('[data-number]');
const btnSend = document.querySelector('[data-btn-third]');
const form = document.querySelector('[data-third-form]');

const allForms = document.querySelectorAll(
  '[data-all-values] > div > ul > li > input'
);
console.log('allForms', allForms[0]);
//? TextArea
const texteArea = form.querySelector('.comment-section');

//?Selects
const skills = document.querySelector('.skills').value;
const hero = document.querySelector('.hero').value;

//? Валидация
// const phoneNumberVal = /^(\+7|8)(\(\d{3}\)|\d{3})\d{7}$/;
let regex =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
// Valid phone number - 89271238123

const isPhoneNumber = (phonenumber) => {
  const re = new RegExp(regex);
  console.log('phonenumber', phonenumber);

  return re.test(phonenumber);
};

const checkPhoneNumber = () => {
  let valid = false;

  const phone = phoneElement.value.trim();

  if (!isRequired(phone)) {
    showError(phoneElement, 'Phone Number cannot be blank');
  } else if (!isPhoneNumber(phone)) {
    showError(phoneElement, 'Phone should be as follow example: 89271238123');
  } else {
    showSuccess(phoneElement);
    valid = true;
  }
  return true;
};

//Тут получаю value: name , email, password
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = allForms[0]?.value;
  let email = allForms[1]?.value;
  let password = allForms[3]?.value;
  let phoneNumber = allForms[4]?.value;
  let text = texteArea.value;
  let dataObj = { name, email, password, skills, hero, phoneNumber, text };

  let isPhoneValid = checkPhoneNumber();

  if (isPhoneValid) {
    console.log('dataObj', dataObj);
  }
});

form.addEventListener(
  'input',
  debounce((e) => {
    switch (e.target.id) {
      case 'phone-number':
        checkPhoneNumber();
        break;
    }
  })
);
