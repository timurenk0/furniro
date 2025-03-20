import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
  <footer style={{backgroundColor: "#F4F5F7"}} className=" pt-4">
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col">
          <h4 className="fw-bold">Furniro.</h4>
          <p className="text-light-grey">GISMA University of Applied Sciences, Konrad-Zuse-Ring 11, Potsdam, BB, Germany</p>
        </div>
        <div className="col text-center mt-5 mt-md-0">
          <p className="text-light-grey">Links</p>
          <ul className="list-group list-group-flush">
            <NavLink to="/" className="bg-transparent text-dark-grey border-0 text-decoration-none py-1">Home</NavLink>
            <NavLink to="/shop" className="bg-transparent text-dark-grey border-0 text-decoration-none py-1">Shop</NavLink>
            <NavLink to="/about" className="bg-transparent text-dark-grey border-0 text-decoration-none py-1">About</NavLink>
            <NavLink to="/contact" className="bg-transparent text-dark-grey border-0 text-decoration-none py-1">Contact</NavLink>
          </ul>
        </div>
      </div>
      <div className="container border-top border-black mt-4 pt-3">
        <p>2025 <a href="https://github.com/timurenk0" >timurenk0</a>. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
}

export default Footer