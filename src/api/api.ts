import axios from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-nesto-candidat': import.meta.env.VITE_X_NESTO_CANDIDAT,
};

export const api = axios.create({
  baseURL: 'https://nesto-fe-exam.vercel.app/api',
  headers: {
    ...DEFAULT_HEADERS,
  },
  timeout: 25000,
});
