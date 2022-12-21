import { api2Service, statisMyService } from "./http.service";

export const getManufacturers = async () => {
  return await statisMyService
    .get("/mans.json")
    .then((res) => res.data);
};

export const getModels = async (man_id: number) => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/getManModels?man_id=${man_id}`)
    .then((res) => res.data.data);
};

export const getCategories = async () => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/cats/get`)
    .then((res) => res.data.data);
};

export const getProducts = async () => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/products`)
    .then((res) => res.data.data);
};
