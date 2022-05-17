import { isRequired, showError, showSuccess, debounce } from './script.js';
import { openModal } from './modal.js';

// console.log('openmodal', openModal());
//removeValidation
const phoneElement = document.querySelector('[data-number]');
const btnSend = document.querySelector('[data-btn-third]');
const form = document.querySelector('[data-third-form]');

const allForms = document.querySelectorAll(
  '[data-all-values] > div > ul > li > input'
);
//? TextArea
const texteArea = form.querySelector('.comment-section');
//?Selects
const superPower = document.querySelector('.skills');
const bestHero = document.querySelector('.hero');
//? Modal data
const modal = document.querySelector('#modal-1');
const modalButtonsClose = document.querySelectorAll('[data-modal-close]');
const allModals = document.querySelectorAll('[data-modal]');

let skills = '';
let hero = '';

//Вешаем оброботчик, чтобы взять option
superPower.addEventListener('change', function () {
  const getValue = this.value;
  skills += getValue;
});
bestHero.addEventListener('change', function () {
  const getValue = this.value;
  hero += getValue;
});
//? Валидация

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
  return valid;
};

//Тут получаю value: name , email, password
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = allForms[0].value;
  let email = allForms[1].value;
  let password = allForms[3].value;
  let phoneNumber = allForms[4].value;
  let text = texteArea.value;
  let dataObj = { name, email, password, skills, hero, phoneNumber, text };

  let isPhoneValid = checkPhoneNumber();

  if (isPhoneValid) {
    fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          form.reset();
          openModal(modal, modalButtonsClose, allModals);

          console.log('Success:', data);
          console.log('data.status === 200:', data.status === 200);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
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
