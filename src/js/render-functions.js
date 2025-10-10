import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Функція створення та додавання розмітки галереї

let galleryBox;
let isGalleryBox = false;

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');

  let galleryArr = [];

  images.forEach(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const item = document.createElement('li');
      item.classList.add('gallery-item');

      const link = document.createElement('a');
      item.classList.add('gallery-item-link');
      link.setAttribute('href', largeImageURL);
      item.append(link);

      const image = document.createElement('img');
      image.setAttribute('src', webformatURL);
      image.setAttribute('alt', tags);
      link.append(image);

      // Створення і додавання опису картинки

      const description = document.createElement('ul');
      description.classList.add('description');
      const descriptionSettings = ['Likes', 'Vievs', 'Comments', 'Downloads'];
      for (let i = 0; i < 4; i++) {
        const descriptionItem = document.createElement('li');
        const descriptionState = document.createElement('p');
        descriptionState.classList.add('description-state');
        descriptionState.textContent = descriptionSettings[i];
        const descriptionValue = document.createElement('p');
        descriptionValue.classList.add('description-value');
        if (i === 0) {
          descriptionValue.textContent = likes;
        } else if (i === 1) {
          descriptionValue.textContent = views;
        } else if (i === 2) {
          descriptionValue.textContent = comments;
        } else if (i === 3) {
          descriptionValue.textContent = downloads;
        }
        descriptionItem.append(descriptionState);
        descriptionItem.append(descriptionValue);
        description.append(descriptionItem);
      }
      item.append(description);

      galleryArr.push(item);
    }
  );

  gallery.append(...galleryArr);

  if (isGalleryBox) {
    galleryBox.refresh();
  } else {
    const settings = {
      captionsData: 'alt',
      captionDelay: 250,
    };
    galleryBox = new SimpleLightbox('.gallery li a', settings);
    isGalleryBox = true;
  }
}

// Очищення галереї

export function clearGallery() {
  const items = document.querySelectorAll('.gallery-item');
  if (items.length != 0) {
    items.forEach(elem => elem.remove());
  }
}

// Показуємо індикатор завантаження

export function showLoader() {
  const loading = document.querySelector('.loader');
  loading.classList.toggle('visible');
}

// Прибираємо індикатор завантаження

export function hideLoader() {
  const loading = document.querySelector('.loader');
  loading.classList.toggle('visible');
}

// Показуємо кнопку
export function showLoadMoreButton() {
  const btnMore = document.querySelector('.btn-more');
  if (!btnMore.classList.contains('viseble')) {
    btnMore.classList.add('viseble');
  }
}

// Приховуємо кнопку
export function hideLoadMoreButton() {
  const btnMore = document.querySelector('.btn-more');
  btnMore.classList.remove('viseble');
}
