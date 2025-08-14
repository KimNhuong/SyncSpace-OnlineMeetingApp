import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  )
};

export default Layout;