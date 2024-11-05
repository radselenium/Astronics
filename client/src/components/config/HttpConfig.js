import axios from "axios";
const host = require('./config');

const HttpClient = axios.create({
  baseURL: host.URL+host.PORT,
});


// HttpClient.interceptors.request.use(function (config) {
//   config.headers['Content-Type'] = 'application/json';

//   const token = sessionStorage.getItem('jwtToken');
//   if (token) {
//     config.headers['Authorization'] = 'Bearer ' + token;
//   } 
    
//   return config;
// },
//   function (error) {
//     Promise.reject(error);
//   }
// );


// axiosHttp.interceptors.response.use(
  
// )

export default HttpClient;