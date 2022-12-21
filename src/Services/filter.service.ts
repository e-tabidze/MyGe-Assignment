import { api2Service, statisMyService } from "./http.service";

export const getManufacturers = async () => {
  return await statisMyService
    .get("/mans.json")
    .then((res) => console.log(res, "[GOT MANUFACTURERS]"));
};

export const getModels = async (man_id: number) => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/getManModels?man_id=${man_id}`)
    .then((res) => console.log(res, "[GOT MODELS]"));
};

export const getCategories = async () => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/cats/get`)
    .then((res) => console.log(res, "[GOT CATEGORIES]"));
};

export const getProducts = async () => {
  let lang = localStorage.getItem("lang");

  return await api2Service
    .get(`/${lang || "ka"}/products`)
    .then((res) => console.log(res, "[GOT CAR LIST]"));
};
