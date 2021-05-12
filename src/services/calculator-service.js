import client from "./http-service";
import { BASE_URL_API } from "utils/constants";

export function getProducts() {
  return client.get(`${BASE_URL_API}/products`);
}

export function getLocations() {
  return client.get(`${BASE_URL_API}/locations`);
}

export function addToCard(request) {
  return client.post(`${BASE_URL_API}/cart`, request);
}
