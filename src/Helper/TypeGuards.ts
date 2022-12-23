import {
  IManufacturer,
  IModel,
  ICategory,
  IModelData,
  IBargain,
} from "../Types/general";

type Props = {
  label: string;
  filterData: IBargain[] | IManufacturer[] | IModelData[] | ICategory[];
  item?: IBargain | IManufacturer | IModelData | ICategory;
};

function isManufacturer(obj: any): obj is IManufacturer {
  return "man_id" in obj;
}

function isModel(obj: any): obj is IModel {
  return "model_name" in obj;
}

function isCategory(obj: any): obj is ICategory {
  return "category_id" in obj;
}

function isBargain(obj: any): obj is IBargain {
  return "name" in obj;
}

const returnObjID = (item: Props["item"]) => {
  let propID;

  if (isBargain(item)) propID = item.id;
  if (isManufacturer(item)) propID = item.man_id;
  if (isModel(item)) propID = `${item.man_id}-${item.model_id}`;
  if (isCategory(item)) propID = item.category_id;

  return propID;
};

const returnObjName = (item: Props["item"]) => {
  let propName;

  if (isBargain(item)) propName = item.name;
  if (isManufacturer(item)) propName = item.man_name;
  if (isModel(item)) propName = item.model_name;
  if (isCategory(item)) propName = item.title;

  return propName;
};

export {
    returnObjID,
    returnObjName
}
