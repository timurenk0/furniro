import { useEffect, useState } from "react"
import { useAuth } from "../services/AuthContext"
import { getCart, updateCartItem, removeFromCart, checkout } from "../services/cartService"

import PageName from "../components/PageName"
import ClientSupport from "../components/ClientSupport"
import ProductInCart from "../components/ProductInCart"
import StripeCheckoutButton from "../components/StripeCheckoutButton"


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  
  const { isLoggedIn } = useAuth();
  
  // Fetch cart data using the cart service
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn) {
          // Fetch cart from server using the cart service
          const cart = await getCart();
          const items = cart.items.map(item => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.imageURLs ? item.product.imageURLs.main : "",
            quantity: item.quantity,
            subTotal: item.product.price * item.quantity
          }));
          
          setCartItems(items);
          calculateTotals(items);
        } else {
          return ;
        }
      } catch (err) {
        setError("Failed to load cart data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, [isLoggedIn]);
  
  // Calculate totals
  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.subTotal, 0);
    setSubTotalPrice(subtotal);
    // Calculate total price (subtotal + insurance fee + delivery fee)
    subTotalPrice < 350 ? setTotalPrice(subtotal * 1.024 + 100): setTotalPrice(subtotal * 1.024);
  };
  
  // Handle quantity updates using the cart service
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      if (isLoggedIn) {
        // Update on server using cart service
        await updateCartItem(id, newQuantity);
        
        // Update local state
        const updatedItems = cartItems.map(item => {
          if (item._id === id) {
            const newSubTotal = item.price * newQuantity;
            return { ...item, quantity: newQuantity, subTotal: newSubTotal };
          }
          return item;
        });
        
        setCartItems(updatedItems);
        calculateTotals(updatedItems);
      } else {
        // Update in localStorage
        const productData = JSON.parse(localStorage.getItem(id));
        productData.quantity = newQuantity;
        productData.subTotal = parseFloat(productData.price) * newQuantity;
        localStorage.setItem(id, JSON.stringify(productData));
        
        // Update local state
        const updatedItems = cartItems.map(item => {
          if (item._id === id) {
            return { ...item, quantity: newQuantity, subTotal: productData.subTotal };
          }
          return item;
        });
        
        setCartItems(updatedItems);
        calculateTotals(updatedItems);
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
      setError("Failed to update quantity");
    }
  };
  
  // Handle item removal using the cart service
  const handleRemoveItem = async (id) => {
    try {
      if (isLoggedIn) {
        // Remove from server using cart service
        const response = await removeFromCart(id);
        console.log(response);
      } else {
        // Remove from localStorage
        localStorage.removeItem(id);
      }
      
      // Update local state
      const updatedItems = cartItems.filter(item => item._id !== id);
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (err) {
      console.error("Failed to remove item", err);
      setError("Failed to remove item: " + (err.response ? err.response.data.error : err.message));
    }
  };

  console.log("total price:", totalPrice);
  return (
    <>
      <PageName pageName={"Cart"} />
      
      {error && <div className="alert alert-danger">{error}</div>}
      
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
              {isLoading ? (
                <p className="text-center">Loading cart...</p>
              ) : cartItems.length > 0 ? (
                cartItems.map(item => (
                  <ProductInCart 
                    key={item._id}
                    image={item.image} 
                    name={item.name} 
                    price={item.price} 
                    quantity={item.quantity} 
                    subTotal={item.subTotal} 
                    isButton={true}
                    id={item._id} 
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem} />
                ))
              ) : (
                <h4 className="text-light-grey text-center">
                  There are no items in your cart yet
                </h4>
              )}
            </div>
          </div>

          <div className="col-12 col-xl-4 mx-auto py-3 bg-yellowish">
            <h1 className="mb-5 text-center">Cart Total</h1>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Subtotal</p>
              <p>
                {subTotalPrice.toLocaleString("en-US", {
                  style: "currency", 
                  currency: "USD", 
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Insurance Fee</p>
              <p>2.4%</p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mb-1">
              <p className="fw-semibold text-left">Delivery Fee</p>
              <p>{subTotalPrice > 350 ? (<span><span className="text-decoration-line-through">$100</span> $0</span>) : "$100"}</p>
            </div>
            <div className="px-4 d-flex justify-content-between fw-semibold text-left mt-5">
              <h3 className="fw-semibold text-left">Total</h3>
              <h3>
                {subTotalPrice > 0 
                  ? totalPrice.toLocaleString("en-US", {
                      style: "currency", 
                      currency: "USD", 
                      maximumFractionDigits: 2
                    })
                  : "$0.00"
                }
              </h3>
            </div>
            
            {cartItems.length > 0 && (
              <StripeCheckoutButton />
            )}
          </div>
        </div>
      </section>

      <ClientSupport />   
    </>
  )
}

export default CartPage;