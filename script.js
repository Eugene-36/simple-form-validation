const form = document.querySelector('[data-form]');
const secondForm = document.querySelector('[data-second-from]');
const allInputs = Array.from(document.getElementsByTagName('input'));

const userName = document.querySelector('[data-name]');
const email = document.querySelector('[data-email]');
const password = document.querySelector('[data-password]');
const confirmPassword = document.querySelector('[data-confirm-password]');
const errorMessage = document.querySelector('[data-errorMsg]');

const button = document.querySelector('[data-btn]');
// По умолчанию  кнопку отправки делаем disabled
// button.disabled = true;
// console.log('second-form', secondForm);

// Генерирует ошибки для валидации
const generateError = function (text) {
  let errors = form.querySelectorAll('.errorMsg');

  for (var i = 0; i < errors.length; i++) {
    errors[i].remove();
  }

  const error = document.createElement('div');
  error.className = 'errorMsg';
  error.style.color = 'red';
  error.innerHTML = text;
  return error;
};
//Удаление кастомных ошибок
const removeValidation = function (params) {
  const errors = form.querySelectorAll('.errorMsg');
  // errors.length = 1;
  for (let i = 0; i < errors.length; i++) {
    // console.log('errors[i]', errors[i]);
    errors[i].remove();
  }
};

//Базовая валидация полей
function checkingFields(userName, email, password, confirmPassword) {
  let validName = /^[a-zA-Z]+$/;
  let validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,12})$/;

  userName.onblur = function () {
    if (validName.test(this.value)) {
      removeValidation();
      this.classList.add('valid');
      this.classList.remove('invalid');

      //Если инпут  валидный тогда удаляем disabled на кнопку send
      button.disabled = false;
    } else {
      const error = generateError('Only english letters are required');
      userName.parentNode.insertBefore(error, userName.nextSibling);

      this.classList.add('invalid');
      this.classList.remove('valid');

      //Если инпут не валидный тогда добавля disabled на кнопку send
      button.disabled = true;
    }
  };

  email.onblur = function () {
    // console.log('check', validEmail.test('somethingELSE'));

    if (validEmail.test(this.value)) {
      removeValidation();

      this.classList.add('valid');
      this.classList.remove('invalid');

      //Если инпут  валидный тогда удаляем disabled на кнопку send
      button.disabled = false;
      // email.focus();
    } else {
      const error = generateError(
        'Email must be as follow example: exampel@s.com'
      );
      email.parentNode.insertBefore(error, email.nextSibling);

      this.classList.add('invalid');
      this.classList.remove('valid');

      //Если инпут не валидный тогда добавля disabled на кнопку send
      button.disabled = true;
    }
  };

  password.onblur = function () {
    console.log('check', this.value);

    removeValidation();

    if (validPassword.test(this.value)) {
      this.classList.add('valid');
      this.classList.remove('invalid');

      //Если инпут  валидный тогда удаляем disabled на кнопку send
      button.disabled = false;
      // email.focus();
    } else {
      const error = generateError(
        'Password has to be between 8-12 digits. <br/> There should be one uppercase and lowercase letter'
      );
      password.parentNode.insertBefore(error, password.nextSibling);

      this.classList.add('invalid');
      this.classList.remove('valid');
      //Если инпут не валидный тогда добавля disabled на кнопку send
      button.disabled = true;
    }
  };

  confirmPassword.onblur = function () {
    console.log('check', this.value);

    if (validPassword.test(this.value) && this.value === password.value) {
      removeValidation();

      this.classList.add('valid');
      this.classList.remove('invalid');

      //Если инпут  валидный тогда удаляем disabled на кнопку send
      button.disabled = false;
      // email.focus();
    } else {
      const error = generateError('Passwords should match');
      confirmPassword.parentNode.insertBefore(
        error,
        confirmPassword.nextSibling
      );

      this.classList.add('invalid');
      this.classList.remove('valid');

      //Если инпут не валидный тогда добавля disabled на кнопку send
      button.disabled = true;
    }
  };
}
checkingFields(userName, email, password, confirmPassword);

// console.log('allInputs', allInputs);

function finalCheck(e) {
  e.preventDefault();

  allInputs.forEach((item) => {
    if (!item.classList.contains('invalid') && form.checkValidity()) {
      button.classList.remove('shead-btn');
      form.classList.add('moving-first-form');
      secondForm.classList.add('second');
      console.log('УРА, вся валидация прошла');
    } else {
      console.log('зашёл в этот блок');
      button.setAttribute('disabled', 'disabled');
    }
  });
}

button.addEventListener('click', finalCheck);
