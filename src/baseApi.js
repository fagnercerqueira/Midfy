import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'https://66ba0831fa763ff550fa8ce4.mockapi.io/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default APIClient;