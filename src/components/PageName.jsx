import PropTypes from "prop-types"
import rectanglebg from "../assets/rectangle-bg.jpg"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

const PageName = ({ pageName }) => {

    let currentPage = window.location.pathname.split("/");
    currentPage = currentPage[1].substring(0,1).toUpperCase()+currentPage[1].substring(1, currentPage[1].length).toLowerCase();
    
  return (
        <section className="position-relative overflow-hidden mb-5" style={{height: "25vh"}}>
            <img src={rectanglebg} alt="" className="w-100 position-absolute top-50 start-50 translate-middle" style={{ minHeight: "100%", objectFit: "cover", filter: "blur(3px)" }} />
            <div className="w-100 h-100 position-absolute" style={{backgroundColor: "rgba(255, 255, 255, 0.5"}}></div>
            <div className="container position-absolute top-50 start-50 translate-middle text-center">
                <img src={logo} alt="" />
                <h1>{ pageName }</h1>
                <p className="fw-semibold">Home {">"} <Link className={`text-black fw-normal ${sessionStorage.getItem("category") ? "" : "text-decoration-none"}`} to="/shop" onClick={() => sessionStorage.clear()}>{currentPage}</Link> <span className="fw-normal">{sessionStorage.getItem("category") ? " > "+sessionStorage.getItem("category") : ""}</span></p>
            </div>
        </section>
  )
}

PageName.propTypes = {
    pageName: PropTypes.string.isRequired,
}

export default PageName