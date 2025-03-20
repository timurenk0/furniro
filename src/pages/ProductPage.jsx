import RelatedProducts from "../components/RelatedProducts";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const product = useLoaderData();
  const [count, setCount] = useState(1);
  const [mainImage, setMainImage] = useState(product.imageURLs.main);

  const navigate = useNavigate();
  const handleRedirect = (category) => {
    sessionStorage.setItem("category", category);
    navigate("/shop");
  }


  const addToCart = (product) => {
    if (!localStorage.getItem(product._id)) {
      localStorage.setItem(product._id, JSON.stringify({ image: product.imageURLs.main, name: product.name, price: product.price, quantity: count }));
      return ;
    }
    const data = JSON.parse(localStorage.getItem(product._id));
    data.quantity += count;
    localStorage.setItem(product._id, JSON.stringify(data));

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
          <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>

      <RelatedProducts tag={product.type} />
    </section>
  )
}

const productLoader = async ({ params }) => {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
  const data = await res.json();
  return data;
}

export { ProductPage as default, productLoader }