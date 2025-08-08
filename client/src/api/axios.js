import axios from "axios";

let isProd = import.meta.env.PROD;

axios.defaults.baseURL = isProd ?  `https://coursetext.onrender.com/api` : 'http://localhost:3000/api'
axios.defaults.withCredentials = true;

export default axios;
