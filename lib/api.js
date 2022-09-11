import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3006",
  // baseURL: "http://localhost:9898",
  // baseURL: "http://192.168.43.136:3006",
  // baseURL: "https://4e79-27-55-66-178.ap.ngrok.io"
});
export default instance;
