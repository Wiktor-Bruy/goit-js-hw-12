'use strict';

// Імпорти бібліотек

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Імпорти модулів

import * as galleryMethods from './js/render-functions';
import getImagesByQuery from './js/pixabay-api';

// Обробка сабміту форми

const form = document.querySelector('.form');
form.addEventListener('submit', startSearch);

function startSearch(event) {
  event.preventDefault();
  const searchWords = event.target.elements.word.value.trim();
  if (searchWords != '') {
    // Запит та обробка його результату

    galleryMethods.showLoader(); // Показ індикатора завандаження
    getImagesByQuery(searchWords)
      .then(value => {
        // Обробка результату відповіді

        galleryMethods.hideLoader(); // Приховуємо індикатор завантаження
        // Виводимо всовіщення про невдалий пошук

        if (value.length === 0) {
          galleryMethods.clearGallery();
          iziToast.warning({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageColor: '#fff',
            backgroundColor: 'red',
            theme: 'dark',
            position: 'center',
          });
        } else {
          galleryMethods.clearGallery();
          galleryMethods.createGallery(value);
        }
      })
      .catch(error => {
        // Обробка помилки

        console.log(error);
        galleryMethods.hideLoader(); // Приховуємо індикатор завантаженняw
      });
    form.reset();
  } else {
    // Попередження при порожньому запиті

    iziToast.warning({
      message: 'Enter word for search...',
      messageColor: '#fff',
      backgroundColor: 'red',
      theme: 'dark',
      position: 'topRight',
    });
  }
}
