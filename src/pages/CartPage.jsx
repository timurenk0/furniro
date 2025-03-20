import { useEffect, useState, useRef } from "react"

import PageName from "../components/PageName"
import ClientSupport from "../components/ClientSupport"
import ProductInCart from "../components/ProductInCart"

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const subTotalPrice = useRef(0);
  const totalPrice = useRef(0);
  
  useEffect(() => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
        const productData = JSON.parse(localStorage.getItem(key));
        productData._id = key;
        productData.subTotal = (parseFloat(productData.price)*productData.quantity);
        items.push(productData);
        subTotalPrice.current += parseFloat(productData.subTotal);
      }
    totalPrice.current += parseFloat(subTotalPrice.current*1.024+100);
    setCartItems(items);
  }, [])
  
  return (
    <>
      <PageName pageName={"Cart"} />
      
      <section className="container-fluid mb-5">
        <div className="row px-xl-5 gx-xl-5">
          <div className="col-12 col-xl-8">
            <div className="row bg-yellowish py-3 fw-semibold">
              <ProductInCart 
              name="Product name" 
              price=" Price" 
              quantity="Quantity" 
              subTotal=" Subtotal" />
            </div>
            <div className="row py-3">
            { cartItems.length > 0 ? cartItems.map(item => (
              <ProductInCart 
              key={item._id}
              image={item.image} 
              name={item.name} 
              price={item.price} 
              quantity={item.quantity} 
              subTotal={(item.subTotal)} 
              isButton={true}
              id={item._id} />
            )) : <h4 className="text-light-grey text-center">There are no items in your cart yet</h4>}
            </div>
          </div>

          <div className="col-12 col-xl-4 mx-auto py-3 bg-yellowish">
            <h1 className="mb-5 text-center">Cart Total</h1>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Subtotal</p>
              <p>{(subTotalPrice.current).toLocaleString("en-US", {style: "currency", currency:"USD", maximumFractionDigits: 2})}</p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Insurance Fee</p>
              <p>2.4%</p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Delivery Fee</p>
              <p>$100</p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mt-5">
              <h3 className="fw-semibold text-left">Total</h3>
              <h3>{subTotalPrice.current > 0 ? (totalPrice.current).toLocaleString("en-US", {style: "currency", currency:"USD", maximumFractionDigits: 2}): "$0.00"}</h3>
            </div>
          </div>
        </div>
      </section>

      <ClientSupport />   
    </>
  )
}


export default CartPage;