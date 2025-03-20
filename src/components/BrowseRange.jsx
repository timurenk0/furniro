import browseDining from "../assets/browseDining.png";
import browseLiving from "../assets/browseLiving.png";
import browseBedroom from "../assets/browseBedroom.png";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BrowseRange = () => {

  const navigate = useNavigate();

  const handleRedirect = (category) => {
    sessionStorage.setItem("category", category);
    navigate("/shop");
  }
    
  return (
    <section className="container mt-5 text-center p-0">
      <h2 className="fw-bold text-dark-grey">Browse The Range</h2>
      <h5 className="text-grey fw-normal mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-3"> 
          <Link className="col text-dark-grey text-decoration-none" to="/shop" onClick={() => handleRedirect("Dining")}>
            <img src={browseDining} alt="" className="img-fluid rounded-3"/>
            <h4 className="mt-3">Dining</h4>
          </Link>
          <Link className="col text-dark-grey text-decoration-none" to="/shop" onClick={() => handleRedirect("Living")}>
            <img src={browseLiving} alt="" className="img-fluid rounded-3"/>
            <h4 className="mt-3">Living</h4>
          </Link>
          <Link className="col text-dark-grey text-decoration-none" to="/shop" onClick={() => handleRedirect("Bedroom")}>
            <img src={browseBedroom} alt="" className="img-fluid rounded-3"/>
            <h4 className="mt-3">Bedroom</h4>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BrowseRange