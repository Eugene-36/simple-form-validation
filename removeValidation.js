export const removeValidation = function (specificForm) {
  console.log('specificForm', specificForm);
  const errors = specificForm.querySelectorAll('.errorMsg');

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
};
export const generateError = function (text, form) {
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
