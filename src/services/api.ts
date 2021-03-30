import axios from "axios";

const api = axios.create({
  baseURL: "https://strapi-apontamentos.herokuapp.com",
});

export default api;
