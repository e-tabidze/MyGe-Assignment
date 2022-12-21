export interface IDealType {
  sale: IBargain;
  rent: {
    name: string;
    id: number;
    subCats: IBargain[];
  };
}

interface IBargain {
  name: string;
  id: number;
}

export interface IManufacturer {
  is_car: string;
  is_moto: string;
  is_spec: string;
  man_id: string;
  man_name: string;
}

export interface ICategory {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

export interface IModel {

}