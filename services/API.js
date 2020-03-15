import axios from 'axios';

const domain = 'https://aliezsid-covid-server.herokuapp.com';

  
module.exports = {
  fetchAll(){
    return axios.get(`${domain}/all`).then(data=>data.data);
  },
  fetchByCountry(){
    return axios.get(`${domain}/countries`).then(data=>data.data);
  }
}
