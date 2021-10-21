const axios = require('axios');

const api = axios.create({
  baseURL: 'https://investorbackend.herokuapp.com/api'
});

export const signin = async (formData) => {
  const res = await api.post(`/user/signin`, formData);
  return res;
};

const res = await axios.get('/profile', {
  headers: {
    'Test-Header': 'test-value'
  }
});
