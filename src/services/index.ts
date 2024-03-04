import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://projpsi.pythonanywhere.com/api/psicoapp/',
});