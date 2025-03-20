import PageName from "../components/PageName"
import OurProducts from "../components/OurProducts"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';


const ShopPage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state?.productAdded) {
      toast.success(`Product ${location.state.productName} added succesfully!`);
    }
  }, [location]);
  
  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} />
    
        <PageName pageName={"Shop"} />
        <div className="container d-flex justify-content-center">
          <Link className="btn btn-outline-success border-3 btn-lg" to="/add-product">Add Product</Link>
        </div>
        <OurProducts />
    </>
  )
}

export default ShopPage