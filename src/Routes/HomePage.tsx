import BreadCrumbs from "../Components/BreadCrumbs";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import {
  getModels,
  getProducts,
  getManufacturers,
} from "../Services/filter.service";
import { IManufacturer, IModel, IProducts, IProduct } from "../Types/general";
import ProductCard from "../Components/ProductCard";
import SortDropdown from "../Components/SortDropdown";

type Props = {};

export default function HomePage({}: Props) {
  const [products, setProducts] = useState<IProducts>();
  const [models, setModels] = useState<IModel[]>([]);
  // const [manId, setManId] = useState<string>("");
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleSearch();
    handleGetManufacturers();
    return () => {
      setModels([]);
      setManufacturers([]);
    };
  }, []);

  const handleGetManufacturers = async () => {
    const result = await getManufacturers();
    setManufacturers(result);
  };

  const handleGetManufacturer = (id: number) => {
    let manufacturer = manufacturers.find(
      (item: IManufacturer) => JSON.parse(item.man_id) === id
    );
    return manufacturer;
  };

  const handleGetModelName = async (man_id: number, model_id: number) => {
    let modelsArr = await getModels(man_id);
    console.log(modelsArr, '[MODELS ARR]');
    let model = modelsArr.find((mod: IModel) => mod.model_id === model_id);

    return model.moden_name;
  }

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
          <Sidebar manufacturers={manufacturers} handleSearch={handleSearch} />
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
                // manId={manId}
                // setManId={setManId}
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
