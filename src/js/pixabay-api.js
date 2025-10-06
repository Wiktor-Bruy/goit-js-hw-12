import axios from 'axios';

export default function getImagesByQuery(query) {
  // Створення параметрів запиту

  const searchParams = new URLSearchParams({
    key: '52540887-918f2903ad65f90a6d5993705',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });

  //Відправка запиту
  return axios
    .get(`https://pixabay.com/api/?${searchParams}`)
    .then(response => response.data.hits)
    .catch(error => error);
}
