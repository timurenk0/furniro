import { FaTrash } from "react-icons/fa"
import PropTypes from "prop-types";


const ProductInCart = ({image, name, price, quantity, subTotal, isButton=false, id}) => {


  const deleteProduct = async (productId) => {
    // const res = await fetch(`http://localhost:3000/products/${productId}`, {
    //   method: "DELETE"
    // });
    localStorage.removeItem(productId);
    window.location.reload();
    return ;
  }
    
        return (
          <>
            <div className="col-6 col-md-4 col-lg-1 py-md-1 my-auto">
              <img className="img-fluid rounded-2" style={{objectFit: "contain"}} src={image} alt="" />
            </div>
            <div className={`col-12 col-lg-4 ${isButton ? "border-bottom" : ""} my-auto text-truncate fw-semibold`}>{name}</div>
            <div className={`col-12 col-lg-2 ${isButton ? "border-bottom" : ""} my-auto py-2 py-lg-0`}>${price}</div>
            <div className={`col-12 col-lg-2 ${isButton ? "border-bottom" : ""} my-auto py-2 py-lg-0`}>{quantity} {isButton ? "pcs." : ""}</div>
            <div className={`col-12 col-lg-2 ${isButton ? "border-bottom" : ""} my-auto py-2 py-lg-0`}>{subTotal.toLocaleString("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 2})}</div>
            <div className={`col-12 col-lg-1 my-auto py-2 py-lg-0 ${isButton ? "mb-4" : ""}`}>
              {isButton ? (<button type="button" className="btn" onClick={() => deleteProduct(id)}>
                <FaTrash /></button>) : ""}
            </div>
          </>
      )
    }

ProductInCart.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  isButton: PropTypes.bool,
  id: PropTypes.string.isRequired
}
    

export default ProductInCart