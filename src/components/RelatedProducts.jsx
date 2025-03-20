import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const RelatedProducts = ({tag}) => {

    const [products, setProducts] = useState([]);
    const location = useLocation();
    
    const currentProductId = location.pathname.split('/').pop();

    useEffect(() => {
        loadProducts();
    }, [location.pathname])

    const loadProducts = async () => {
        const data = await fetchProducts(tag, null);
        const filteredProducts = data.filter(product => product._id !== currentProductId);
        const shuffledProducts = shuffleArray(filteredProducts);
        setProducts(shuffledProducts.slice(0, 4)); 
    }

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
  return (
    <div className="container-fluid pt-5 pb-3 mt-5">
        <h3 className="text-center mb-5 text-dark-grey fw-semibold">Related Products</h3>
        <div className="row">
            {products.map((product, key) => (
                <div className="col-3" key={key}>
                    <ProductCard key={product._id} product={product} isRelated={true} />
                </div>
            ))}
        </div>
    </div>
  )
}

RelatedProducts.propTypes = {
    tag: PropTypes.string,
    isRelated: PropTypes.bool,
}

export default RelatedProducts;