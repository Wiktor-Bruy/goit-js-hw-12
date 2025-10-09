import axios from 'axios';

export default async function getImagesByQuery(query, page) {
  // Створення параметрів запиту

  const searchParams = new URLSearchParams({
    key: '52540887-918f2903ad65f90a6d5993705',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  //Відправка запиту
  try {
    const answer = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    return {
      images: answer.data.hits,
      total: answer.data.total,
    };
  } catch (error) {
    console.log(error);
  }
}
