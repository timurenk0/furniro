import RelatedProducts from "../components/RelatedProducts";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import PropTypes from "prop-types";

import { addToCart } from "../services/cartService";


const ProductPage = ({ deleteProductSubmit }) => {

  const { userRole, isLoggedIn } = useAuth();
  
  const product = useLoaderData();
  const [count, setCount] = useState(1);
  const [mainImage, setMainImage] = useState(product.imageURLs.main);

  const navigate = useNavigate();

  const handleRedirect = (category) => {
    sessionStorage.setItem("category", category);
    navigate("/shop");
  }

  const deleteProduct = async () => {

    deleteProductSubmit(product._id);
    return navigate("/", { state: { productDeleted: true, productName: product.name } });
    
  }

  const addItemToCart = async (product, quantity) => {

    try {
      return await addToCart(product._id, quantity);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }

  }


  return (
    <section className="container-fluid px-5 mt-4 mb-5">
      <div className="row row-cols-1 row-cols-xl-2">
        <div className="col d-flex">
          <div className="d-flex flex-column my-auto pe-4">
            {Object.values(product.imageURLs).map((imgURL, index) => (
              <img
                key={index}
                src={imgURL}
                width={150}
                className="img-fluid my-2 border border-warning"
                alt=""
                onClick={() => setMainImage(imgURL)}
                style={{ cursor: "pointer" }} />
            ))}
          </div>
          <div className="d-flex my-auto">
            <img src={mainImage} className="img-fluid border border-3 rounded-3 border-warning" alt="" />
          </div>
        </div>

        <div className="product-info col mt-4 mt-xl-0">
          <h2>{product.name}</h2>
          <Link className="type-link" onClick={() => {handleRedirect(product.type)}}>{product.type}</Link>
          <p className="mt-4">{product.description}</p>
          <h4 className="mt-5 text-decoration-underline">{(product.price).toLocaleString("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 2})}</h4>

          <div className="counter">
            <button
              className="btn"
              onClick={() => setCount(prev => Math.max(1, prev - 1))}
            >−</button>

            <span className="fs-4">{count}</span>

            <button
              className="btn"
              onClick={() => setCount(prev => prev + 1)}
            >+</button>
          </div>
          {isLoggedIn ? <button className="add-to-cart" onClick={() => addItemToCart(product, count)}>Add to Cart</button> : <p className="d-md-inline text-center mt-3 m-md-0 border border-black p-2 ">Log in to add products to cart</p>}          
          {userRole === "admin" ? (
            <>
              <button type="button" className="btn btn-outline-danger border-2 mt-3 mt-md-0 ms-md-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete Product</button>
              <div className="modal fade" id="staticBackdrop" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-danger fw-bold">Warning</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                      <p>Are you sure you want to delete this product? This action will <span className="fw-bold">permanently</span> delete the product from our database.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn" data-bs-dismiss="modal">Go back</button>
                      <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteProduct()}>Yes, delete this product</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
        ): ("")}
        </div>
      </div>

      <RelatedProducts tag={product.type} />
    </section>
  )
}

ProductPage.propTypes = {
  deleteProductSubmit: PropTypes.func.isRequired,
}

const productLoader = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
  const data = await res.json();
  return data;
}

export { ProductPage as default, productLoader }