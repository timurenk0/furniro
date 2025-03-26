import DiscoverMore from "../components/DiscoverMore"
import BrowseRange from "../components/BrowseRange"
import OurProducts from "../components/OurProducts"

import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {

  const location = useLocation();
  
  useEffect(() => {

    if (location.state?.productDeleted) {
      toast.success(`Product ${location.state.productName} deleted successfully`);
    }
    
  }, [location])
  
  return (
    <>
        <ToastContainer position="top-right" autoClose={3000} />
    
        <DiscoverMore />
        <BrowseRange />
        <OurProducts isHome={true}/>
    </>
  )
}

export default HomePage