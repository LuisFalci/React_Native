// este arquivo api não é um componente, por isso a extensção .ts
import axios from "axios";

// utilizamos o ip da máquina pois localhost não funciona
const api = axios.create({
  baseURL: "http://192.168.0.187:5000/api",
});

export { api };
