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
  manName: string,
  manData: IModel[]
}

export interface ICategory {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}
