import axios from 'axios';

export default () => {
  let instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  return {
    posts: {
      fetchAll: params => instance.get('/posts', {params}),
    },
  };
};
