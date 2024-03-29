import axios from 'axios';

const domain = 'https://aliezsid-covid-server.herokuapp.com';
// const domain = 'http://localhost:5000';

  
export default {
  ping(){
    return axios.get(`${domain}/ping`).then(data=>data.data);
  },
  fetchAll(){
    return axios.get(`${domain}/all`).then(data=>data.data);
  },
  fetchByCountry(){
    return axios.get(`${domain}/countries`).then(data=>data.data);
  }
}
