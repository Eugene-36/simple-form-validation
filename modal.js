export function openModal(modal, modalButtonsClose, allModals) {
  //Открываем модальное окно
  modal.classList.remove('hidden');

  //Кнопки закрыть модалку
  modalButtonsClose.forEach((item) => {
    item.addEventListener('click', (e) => {
      const modalIdClose = e.target
        .closest('[data-modal]')
        .classList.add('hidden');
    });
  });

  // Закрытие модалки по фейду
  allModals.forEach((item) => {
    item.addEventListener('click', (e) => {
      const fadeBlocClick = e.target.classList.contains('fade-block');

      if (fadeBlocClick) {
        e.target.classList.add('hidden');
      } else if (!fadeBlocClick) {
        return;
      }
    });
  });
}
