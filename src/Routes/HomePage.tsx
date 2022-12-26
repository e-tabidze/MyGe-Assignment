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
import PrevManySVG from "../Assets/Icons/PrevMany";
import ArrowRight from "../Assets/Icons/ArrowRight";
import PrevSVG from "../Assets/Icons/Prev";

type Props = {};

export default function HomePage({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<IProducts>();
  const [models, setModels] = useState<IModelData[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [page, setPage] = useState(1);
  const [loading, toggleLoading] = useState(false);

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
    searchObj["Page"] = JSON.stringify(page);

    setSearchParams(searchObj);

    handleSearch();
  }, [page]);

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
    let modelData = models.find(
      (modData: IModelData) => JSON.parse(modData.manID) === man_id
    )?.manData;
    let model = modelData?.find((mod: IModel) => mod.model_id === model_id);

    return model ? model.model_name : "";
  };

  const handleSearch = async () => {
    toggleLoading(true);
    let url = window.location.search;

    let result = await getProducts(url);

    setProducts(result);
    toggleLoading(false);
  };

  const handleReturnPages = () => {
    let currPage = products?.meta.current_page;
    let startCount = 1;

    if (!currPage) return;
    if (currPage >= 4) {
      startCount -= 3;
    }

    let arr = Array.from(Array(7).keys()).map(
      (item: number) => item + startCount
    );

    let nodeArr = arr.map((pageItem) => (
      <div
        key={`page-${pageItem}`}
        onClick={() => setPage(pageItem)}
        className={`px-3 text-xs sm:text-sm cursor-pointer ${
          pageItem === page ? "text-main-orange" : "text-secondary-gray"
        }`}
      >
        {pageItem}
      </div>
    ));
    return nodeArr;
  };

  const handlePrev = () => {
    let toBePage = page - 1;

    if (!products) return;

    if (toBePage === 0 || toBePage < 0) {
      setPage(1);
    } else {
      setPage(toBePage);
    }
  };

  const handleNext = () => {
    let toBePage = page + 1;
    let lastPage = products?.meta.last_page || 7;

    if (toBePage === lastPage || toBePage > lastPage) {
      setPage(lastPage);
    } else {
      setPage(toBePage);
    }
  };

  const handlePrevMany = () => {
    setPage(1);
  };

  const handleNextMany = () => {
    let lastPage = products?.meta.last_page || 7;

    setPage(lastPage);
  };

  return (
    <div className="w-full bg-custom-gray">
      <div className="max-w-[1050px] mx-auto py-3">
        <BreadCrumbs />
        <div className="w-full flex flex-col sm:flex-row">
          <Sidebar
            manufacturers={manufacturers}
            categories={categories}
            models={models}
            handleSearch={handleSearch}
          />
          <div className="flex flex-col grow sm:ml-5">
            <div className="flex flex-row justify-between items-center mb-4 px-1 sm:px-0">
              <span className="text-xs sm:text-base">
                {products?.meta.total} განცხადება
              </span>
              <div className="flex flex-row">
                <div className="mr-1 sm:mr-2">
                  <SortDropdown label="Period" handleSearch={handleSearch} />
                </div>
                <div>
                  <SortDropdown label="SortOrder" handleSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className={`${loading ? "opacity-30" : ""}`}>
              {products?.items.map((product: IProduct, key) => (
                <ProductCard
                  key={product.car_id}
                  product={product}
                  handleGetModelName={handleGetModelName}
                  handleGetManufacturer={handleGetManufacturer}
                />
              ))}
            </div>

            <div className={`flex justify-center items-center w-full bg-white rounded-md p-2 ${loading && "hidden"}`}>
              <div className="flex flex-row items-center w-fit">
                <div className={`flex flex-row ${products?.meta.current_page === 1 && "hidden"}`}>
                  <div className="mx-2 cursor-pointer" onClick={handlePrevMany}>
                    <PrevManySVG />
                  </div>
                  <div className="mx-2 cursor-pointer" onClick={handlePrev}>
                    <PrevSVG />
                  </div>
                </div>

                {handleReturnPages()}

                <div className={`flex flex-row rotate-180 ${products?.meta.current_page === products?.meta.last_page}`}>
                  <div className="mx-2 cursor-pointer" onClick={handleNextMany}>
                    <PrevManySVG />
                  </div>
                  <div className="mx-2 cursor-pointer" onClick={handleNext}>
                    <PrevSVG />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
