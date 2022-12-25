import { EnumTypeGearType } from "./../Helper/Contsants";
import { IProduct } from "./general.d";
export interface IBargain {
  id: number;
  name: string;
}

export interface IManufacturer {
  is_car: string;
  is_moto: string;
  is_spec: string;
  man_id: string;
  man_name: string;
}

export interface IModel {
  model_id: number;
  man_id: number;
  model_name: string;
}

export interface IModelData {
  manName: string;
  manID: string;
  manData: IModel[];
}

export interface ICategory {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

export interface IItem {
  item: IBargain | IManufacturer | IModelData | ICategory | IModel;
}

export interface IProduct {
  category_id: number;
  car_run_km: number;
  car_model: string;
  model_id: number;
  location_id: number;
  photo: string;
  prod_year: number;
  engine_volume: number;
  price: number;
  price_usd: number;
  car_id: number;
  photo_ver: number;
  man_id: number;
  prod_year: number;
  car_id: number;
  price: number;
  price_usd: number;
  views: number;
  order_date: string;
  engine_volume: number;
  right_wheel: boolean;
  gear_type_id: keyof typeof EnumTypeGearType;
}

export interface IProducts {
  items: IProduct[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
