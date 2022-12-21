import { useEffect, useState } from "react";
import { getCategories, getManufacturers, getModels, getProducts } from "../Services/filter.service";

type Props = {};

export default function HomePage({}: Props) {
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
  }, [])

  return <div>HomePage</div>;
}
