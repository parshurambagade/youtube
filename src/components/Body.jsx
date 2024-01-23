import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="w-full lg:overflow-x-hidden">
      <Header />
      <div className="flex w-full justify-center lg:overflow-x-hidden"> 
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Body