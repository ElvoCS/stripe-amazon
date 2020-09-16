import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "http://localhost:5001/stripe-6e2ac/us-central1/api",
});

export default instance;
