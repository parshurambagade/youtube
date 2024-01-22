import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="flex w-full justify-center overflow-x-hidden"> 
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Body