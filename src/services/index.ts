import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://projpsi.pythonanywhere.com/api/psicoapp/',
});
