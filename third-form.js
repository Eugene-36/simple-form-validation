import { isRequired, showError, showSuccess, debounce } from './script.js';

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

  console.log('hero', getValue);
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
  return true;
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

  console.log('dataObj', dataObj);

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
        form.reset();
        console.log('Success:', data);
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
