import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getModels,
  getProducts,
  getManufacturers,
  getCategories,
} from "../Services/filter.service";
import {
  IManufacturer,
  IModel,
  IProducts,
  IProduct,
  IModelData,
  ICategory,
} from "../Types/general";

import BreadCrumbs from "../Components/BreadCrumbs";
import ProductCard from "../Components/ProductCard";
import SortDropdown from "../Components/SortDropdown";
import Sidebar from "../Components/Sidebar";

type Props = {};

export default function HomePage({}: Props) {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<IProducts>();
  const [models, setModels] = useState<IModelData[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [page, setPage] = useState(1);

  let searchObj = Object.fromEntries(searchParams);

  useEffect(() => {
    handleSearch();
    handleGetManufacturers();
    handleGetCategories();
    return () => {  
      setModels([]);
      setManufacturers([]);
    };
  }, []);

  useEffect(() => {
    if (searchObj.Mans && manufacturers.length > 0) {
      handleGetModels();
    }

    if (!searchObj.Mans) setModels([]);
  }, [searchParams, manufacturers]);

  const handleGetManufacturers = async () => {
    const result = await getManufacturers();
    setManufacturers(result);
  };

  const handleGetCategories = async () => {
    const result = await getCategories();
    setCategories(result);
  };

  const handleGetManufacturer = (id: number) => {
    let manufacturer = manufacturers.find(
      (item: IManufacturer) => JSON.parse(item.man_id) === id
    );
    return manufacturer;
  };

  const handleGetModels = async () => {
    let mansArr = searchObj.Mans?.split("-").map((obj) =>
      obj.includes(".") ? obj.split(".")[0] : obj
    );
    let endData = mansArr.map(async (man) => {
      let manObj = manufacturers.filter((item) => item.man_id === man)[0];
      let manData = await getModels(man);
      return {
        manID: manObj.man_id,
        manName: manObj.man_name,
        manData,
      };
    });

    let result = await Promise.all(endData);

    setModels(result);
  };

  const handleGetModelName = async (man_id: number, model_id: number) => {
    let modelData = models.find((modData: IModelData) => JSON.parse(modData.manID) === man_id)?.manData;
    let model = modelData?.find((mod: IModel) => mod.model_id === model_id);

    return model ? model.model_name : "";
  };

  const handleSearch = async () => {
    let url = window.location.search;

    let result = await getProducts(url);

    setProducts(result);
  };

  return (
    <div className="w-full bg-custom-gray">
      <div className="max-w-[1050px] mx-auto py-3">
        <BreadCrumbs />
        <div className="w-full flex flex-row">
          <Sidebar
            manufacturers={manufacturers}
            categories={categories}
            models={models}
            handleSearch={handleSearch}
          />
          <div className="ml-5 w-[780px]">
            <div className="flex flex-row justify-between items-center mb-4">
              <span>{products?.meta.total} განცხადება</span>
              <div className="flex flex-row">
                <div className="mr-2">
                  <SortDropdown label="Period" />
                </div>
                <div>
                  <SortDropdown label="SortOrder" />
                </div>
              </div>
            </div>
            {products?.items.map((product: IProduct, key) => (
              <ProductCard
                key={product.car_id}
                product={product}
                handleGetModelName={handleGetModelName}
                handleGetManufacturer={handleGetManufacturer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
