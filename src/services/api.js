import axios from "axios";

const api = axios.create({
  baseURL: "/api", // karena sudah di-proxy ke https://suitmedia-backend.suitdev.com
});

export const getIdeas = (page, size, sort) =>
  api.get(
    `/ideas?page[number]=${page}&page[size]=${size}&append[]=medium_image&sort=${sort}`
  );
