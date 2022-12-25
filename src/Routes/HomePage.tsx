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

type Props = {};

export default function HomePage({}: Props) {
  const [products, setProducts] = useState<IProducts>();
  const [models, setModels] = useState<IModel[]>([]);
  const [manId, setManId] = useState<string>("");
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    handleSearch();
    handleGetManufacturers();
    // handleGetModels();
    return () => {
      setModels([]);
      setManufacturers([]);
    };
  }, []);

  // const fetchProducts = async () => {
  //   let result = await getProducts();
  //   setProducts(result);
  // };

  const handleGetManufacturers = async () => {
    const result = await getManufacturers();
    setManufacturers(result);
  };

  const handleGetModels = async () => {
    const result = await getModels(manId);
    setModels(result);
  };

  const handleGetManufacturer = (id: number) => {
    let manufacturer = manufacturers.find(
      (item: IManufacturer) => JSON.parse(item.man_id) === id
    );
    return manufacturer;
  };

  const handleSearch = async () => {
    let url = window.location.search;
    console.log(url, ' SEARCH STRING');

    let result = await getProducts(url);
    console.log(result, ' [PRODUCTS RESULT]');

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
                <div>Sort #1</div>
                <div>Sort #2</div>
              </div>
            </div>
            {products?.items.map((product: IProduct, key) => (
              <ProductCard
                product={product}
                handleGetManufacturer={() =>
                  handleGetManufacturer(product.man_id)
                }
                manId={manId}
                setManId={setManId}
                key={product.car_id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
