import BreadCrumbs from "../Components/BreadCrumbs";
import Sidebar from "../Components/Sidebar";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <div className="w-full h-screen bg-custom-gray">
      <div className="max-w-[1050px] mx-auto py-3">
        <BreadCrumbs />

        <div className="w-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
