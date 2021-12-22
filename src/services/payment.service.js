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

function loadPayments(token) {
  console.log(token);
  return instance.get('/payment/get_all', {
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    console.log(error);
    throw new Error('Echec de chargement des paiements !');
  });
}

function reimburse(token, data) {
  return instance.post('/payment/reimburse', data, {
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    console.log(error);
    throw new Error('Echec de remboursement !');
  });
}

export const paymentService = {
  loadPayments,
  reimburse,
};
