// export const removeValidation = function (specificForm) {
//   const errors = specificForm.querySelectorAll('.errorMsg');

//   for (let i = 0; i < errors.length; i++) {
//     console.log('removeValidation[i]', errors[i]);
//     errors[i].remove();
//   }
// };

export const generateError = function (text, form) {
  // let errors = Array.from(form.querySelectorAll('.errorMsg'));
  // errors[0];
  // for (let i = 0; i < errors.length; i++) {
  //   errors[i]?.remove();
  //   console.log(' errors[i]', errors);
  // }

  const error = document.createElement('div');
  error.className = 'errorMsg';
  error.style.color = 'red';
  error.innerHTML = text;
  return error;
};
