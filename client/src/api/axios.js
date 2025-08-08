import axios from "axios";

axios.defaults.baseURL = `https://coursetext.onrender.com/api`;
axios.defaults.withCredentials = true;

export default axios;
