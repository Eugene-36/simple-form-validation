const userName = document.querySelector('[data-name]');
const email = document.querySelector('[data-email]');
const password = document.querySelector('[data-password]');
const confirmPassword = document.querySelector('[data-confirm-password]');

const button = document.querySelector('button');
button.disabled = true;

function checkingFields(userName, email, password, confirmPassword) {
  let validName = /^[a-zA-Z]+$/;
  let validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,12})$/;
  let validConfirmPassword;

  userName.onblur = function () {
    console.log('check', validName.test('somethingELSE'));

    if (validName.test(this.value)) {
      this.classList.add('valid');
      this.classList.remove('invalid');
    } else {
      this.classList.add('invalid');
      this.classList.remove('valid');
    }
  };

  email.onblur = function () {
    // console.log('check', validEmail.test('somethingELSE'));

    if (validEmail.test(this.value)) {
      this.classList.add('valid');
      this.classList.remove('invalid');

      // email.focus();
    } else {
      this.classList.add('invalid');
      this.classList.remove('valid');
    }
  };

  password.onblur = function () {
    console.log('check', this.value);

    if (validPassword.test(this.value)) {
      this.classList.add('valid');
      this.classList.remove('invalid');

      // email.focus();
    } else {
      this.classList.add('invalid');
      this.classList.remove('valid');
    }
  };

  confirmPassword.onblur = function () {
    console.log('check', this.value);

    if (validPassword.test(this.value) && this.value === password.value) {
      this.classList.add('valid');
      this.classList.remove('invalid');

      // email.focus();
    } else {
      this.classList.add('invalid');
      this.classList.remove('valid');
    }
  };
}

checkingFields(userName, email, password, confirmPassword);

button.addEventListener('submit', (e) => {
  allElm.forEach((item) => {
    console.log('item', item.style.border);
  });
});
