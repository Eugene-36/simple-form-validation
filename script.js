const form = document.querySelector('[data-form]');

const secondForm = document.querySelector('[data-second-from]');

//! Все поля и кнопка
const userName = document.querySelector('[data-name]');
const email = document.querySelector('[data-email]');
const password = document.querySelector('[data-password]');
const confirmPassword = document.querySelector('[data-confirm-password]');

const button = document.querySelector('[data-btn]');

//! Новая версия валидации формы

//? Функции хэлперы

let userData = {
  name: '',
  email: '',
};

export const isRequired = (value) => (value === '' ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(password);
};

//? Функция для показа ошибок и перекраска бордера
export const showError = (input, message) => {
  // Получаем поле
  const formField = input;
  // добавляем класс ошибки
  formField.classList.remove('valid');
  formField.classList.add('invalid');

  // показываем ошибку
  const error = formField.parentNode.querySelector('small');
  error.textContent = message;
  error.classList.add('errorMsgStyle');
};

//? Показывает успех
export const showSuccess = (input) => {
  // get the form-field element
  const formField = input;

  // remove the error class
  formField.classList.remove('invalid');
  formField.classList.add('valid');

  // hide the error message
  const error = formField.parentNode.querySelector('small');
  error.textContent = '';
};

//? Валидируем юзера
const checkUserName = () => {
  let valid = false;
  const min = 3,
    max = 25;

  const username = userName.value.trim();

  if (!isRequired(username)) {
    showError(userName, 'Username cannot be blank.');
  } else if (!isBetween(username.length, min, max)) {
    showError(
      userName,
      `Username must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(userName);
    valid = true;
    userData.name = username;
  }

  return valid;
};

//? Валидируем мэйл
const checkEmail = () => {
  let valid = false;
  const emailEl = email.value.trim();

  if (!isRequired(emailEl)) {
    showError(email, 'Email cannot be blank');
  } else if (!isEmailValid(emailEl)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
    valid = true;
    userData.email = emailEl;
  }

  return valid;
};

//? Валидируем пароль

const checkPassword = () => {
  let valid = false;

  const passwordEL = password.value.trim();

  if (!isRequired(passwordEL)) {
    showError(password, 'Email cannot be blank');
  } else if (!isPasswordSecure(passwordEL)) {
    showError(
      password,
      'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)'
    );
  } else {
    showSuccess(password);
    valid = true;
  }

  return valid;
};

//? Валидируем поддтверждение пароля
const checkConfirmPassword = () => {
  let valid = false;

  const confirmPasswordUser = confirmPassword.value.trim();
  const passwordEL = password.value.trim();

  if (!isRequired(confirmPasswordUser)) {
    showError(confirmPassword, 'Please enter the password again');
  } else if (passwordEL !== confirmPasswordUser) {
    showError(confirmPassword, 'Confirm password does not match');
  } else {
    showSuccess(confirmPassword);
    valid = true;
  }

  return valid;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // validate form
  let isUsernameValid = checkUserName(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  //submit to the server is the form valid
  if (form.classList.contains('show-initial-form')) {
    form.classList.remove('show-initial-form');
  }
  if (isFormValid) {
    button.classList.remove('shead-btn');
    form.classList.add('moving-first-form');
    secondForm.classList.add('second');
  }
});

export const debounce = (fn, delay = 500) => {
  let timeoutId;

  return (...args) => {
    //Удаляем предыдущий таймер

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    //создаём новый таймер
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  'input',
  debounce((e) => {
    switch (e.target.id) {
      case 'username':
        checkUserName();
        break;

      case 'email':
        checkEmail();
        break;

      case 'password':
        checkPassword();
        break;

      case 'confirm-password':
        checkConfirmPassword();
        break;
    }
  })
);
