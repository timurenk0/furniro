/* eslint-disable no-self-assign */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, isRelated=false }) => {

  const navigate = useNavigate();
  
  const handleRedirect = (category) => {
    sessionStorage.setItem("category", category);
    navigate("/shop");
  }
  
  return (
    <Link className="col text-decoration-none product-card" to={`/shop/${product._id}`}>
          <div className="d-flex flex-column" style={{ backgroundColor: "#F4F5F7", cursor: "pointer"}}>
            <img src={product.imageURLs.main} style={{ aspectRatio: "1/1" }} alt="" />
            <div className="ps-2 pb-2">
              <h4 className="text-dark-grey mt-3 text-truncate">{product.name}</h4>
              {!isRelated ? <Link className="type-link" onClick={() => {handleRedirect(product.type)}}>{product.type}</Link> : ""}
              <h5 className="text-dark-grey mt-3">{(product.price).toLocaleString("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 2})}</h5>
            </div>
        </div>
    </Link>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageURLs: PropTypes.string.isRequired,
  }).isRequired,
  isRelated: PropTypes.bool,
};

export default ProductCard