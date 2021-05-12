import client from "./http-service";
import { BASE_URL_API } from "../utils/constants";

// get list products
export function getProducts() {
  return client.get(`${BASE_URL_API}/products`);
}

// get list locations
export function getLocations() {
  return client.get(`${BASE_URL_API}/locations`);
}

// add product to card
export function addToCard(request) {
  return client.post(`${BASE_URL_API}/cart`, request);
}
