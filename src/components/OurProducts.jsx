import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import PaginationComponent from "../components/PaginationComponent"

const OurProducts = ({ isHome = false }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    loadProducts();
  });

  const loadProducts = async () => {
    const category = sessionStorage.getItem("category");
    const data = isHome ? await fetchProducts(null, 12) : category ? await fetchProducts(category, null) : await fetchProducts();
    setProducts(data);
  }

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length/productsPerPage);
  
  return (
    <section className="container mt-5 d-flex flex-column">
      <h2 className="fw-bold text-center mb-5">Our Products</h2>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 g-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
      </div>
      {isHome ? (<Link className="btn-outline-navlink mt-4 mb-5" to="/shop">Show More</Link>) : ""}
      {!isHome ? (<PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />) : ""}
    </section>
  );
};

OurProducts.propTypes = {
  isHome: PropTypes.bool,
}


export default OurProducts;
