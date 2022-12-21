import axios, { AxiosInstance } from "axios";

const api2Service: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://api2.myauto.ge",
});

const statisMyService: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://static.my.ge/myauto/js",
});

export { api2Service, statisMyService };
