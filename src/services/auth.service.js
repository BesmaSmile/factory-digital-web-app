import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URI;
const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

function login(credentials) {
  return instance.post('/user/login', credentials)
    .catch((error) => {
      switch (error.response?.data?.error) {
        case 'incorrect_credentials':
          throw new Error('Nom d\'utilisateur ou mot de passe incorrect !');
        default:
          throw new Error('Echec de connexion !');
      }
    });
}

export const authService = {
  login,
};
