import { useEffect, useState } from "react";
import BreadCrumbs from "../Components/BreadCrumbs";
import {
  getCategories,
  getManufacturers,
  getModels,
  getProducts,
} from "../Services/filter.service";

type Props = {};

export default function HomePage({}: Props) {
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="w-full h-screen bg-custom-gray">
      <div className="max-w-[1050px] mx-auto py-3">
        <BreadCrumbs />
      </div>
    </div>
  );
}
