import PageName from "../components/PageName"
import OurProducts from "../components/OurProducts"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import 'react-toastify/dist/ReactToastify.css';


const ShopPage = () => {
  
  const { userRole } = useAuth();
  
  const location = useLocation();

  useEffect(() => {
    if (location.state?.productAdded) {
      toast.success(`Product ${location.state.productName} added succesfully!`);
    } else if (location.state?.userLoggedIn) {
      toast.success("Successfully logged in!");
    }
  }, [location]);
  
  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} />
    
        <PageName pageName={"Shop"} />
        {userRole === "admin" ? (
          <div className="container d-flex justify-content-center">
            <Link className="btn btn-outline-success border-3 btn-lg" to="/add-product">Add Product</Link>
          </div>
        ): (<p className="text-light-grey text-center">Only admins can manipulate products</p>)}
        
        <OurProducts />
    </>
  )
}

export default ShopPage