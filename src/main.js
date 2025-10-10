'use strict';

// Імпорти бібліотек

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Імпорти модулів

import * as galleryMethods from './js/render-functions';
import getImagesByQuery from './js/pixabay-api';

// Оголошення глобальних змінних
let pageCounter = 1;
let searchWords;
let totaPage;
const pageView = document.querySelector('.page-counter');

// Обробка кліку кнопки
const btnMore = document.querySelector('.btn-more');
btnMore.addEventListener('click', loadMore);

// Обробка сабміту форми

const form = document.querySelector('.form');
form.addEventListener('submit', startSearch);

function startSearch(event) {
  event.preventDefault();
  pageCounter = 1;
  searchWords = event.target.elements.word.value.trim();
  if (searchWords != '') {
    // Показ індикатора завандаження
    galleryMethods.showLoader();

    // Запит та обробка його результату
    getImagesByQuery(searchWords, pageCounter).then(value => {
      galleryMethods.hideLoader(); // Приховуємо індикатор завантаження

      if (value.images.length === 0) {
        pageView.classList.remove('visible');
        // Виводимо совіщення про невдалий пошук
        galleryMethods.clearGallery();
        galleryMethods.hideLoadMoreButton();
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          backgroundColor: 'red',
          theme: 'dark',
          position: 'center',
        });
      } else {
        totaPage = Math.ceil(value.total / 15);
        galleryMethods.clearGallery();
        galleryMethods.createGallery(value.images);

        // Якщо сторінок більше 1, показуємо кнопку
        if (pageCounter < totaPage) {
          galleryMethods.showLoadMoreButton();
          pageView.classList.add('visible');
          pageView.textContent = `1 --- ${totaPage}`;
        } else {
          iziToast.info({
            message:
              'We`re sorry, but you`ve reached the end of search results.',
            messageColor: '#fff',
            backgroundColor: 'green',
            theme: 'dark',
            position: 'topRight',
          });
          pageView.classList.remove('visible');
          galleryMethods.hideLoadMoreButton();
        }
      }
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
    pageView.classList.remove('visible');
  }
}

// Функція завантаження додаткових зображень
function loadMore() {
  // Переходимо на наступну сторінку і відправляємо запит

  pageCounter += 1;
  const scrolH = window.innerHeight;
  getImagesByQuery(searchWords, pageCounter).then(value => {
    galleryMethods.createGallery(value.images);
    window.scrollBy({
      top: scrolH,
      left: 0,
      behavior: 'smooth',
    });
    pageView.textContent = `1 --- ${pageCounter} --- ${totaPage}`;
  });

  // Якщо дійшли до останньої сторінки ховаємо кнопку та виводимо сповіщення

  if (pageCounter === totaPage) {
    galleryMethods.hideLoadMoreButton();
    pageView.textContent = `1 --- ${pageCounter}`;
    iziToast.info({
      message: 'We`re sorry, but you`ve reached the end of search results.',
      messageColor: '#fff',
      backgroundColor: 'green',
      theme: 'dark',
      position: 'topRight',
    });
  }
}
