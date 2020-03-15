import axios from 'axios';
module.exports = {
  fetchAll(){
    return axios.get('https://corona.lmao.ninja/all').then(data=>data.data);
  },
  fetchByCountry(){
    return axios.get('https://corona.lmao.ninja/countries').then(data=>data.data);
  }
}
