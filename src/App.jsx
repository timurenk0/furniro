import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom"

import { AuthProvider } from "./services/AuthContext"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage, { productLoader } from "./pages/ProductPage"
import AddProductPage from "./pages/AddProductPage"
import CartPage from "./pages/CartPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import AuthPage from "./pages/AuthPage"
import TASPage from "./pages/TASPage"
import ThankYouPage from "./pages/ThankYouPage"

const App = () => {

    
  const addProduct = async (newProduct) => {
    console.log(newProduct);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error(`Error ${res.status}:`, errorData || res.statusText);
        throw new Error("Failed to add product: " + res.statusText);
      }

      const data = await res.json();
      console.log("Product added successfully:", data);
      return data;
      
    } catch (error) {
      console.error("Failed to add product:", error);
      throw error;
    }
  }

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error(`Error ${res.status}:`, errorData || res.statusText);
        throw new Error("Failed to delete product: " + res.statusText);
      }

      const data = await res.json();
      console.log("Product deleted successfully:", data);
      return data;
      
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  }

  
  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage deleteProductSubmit={ deleteProduct }/>} loader={ productLoader } />
          <Route path="/add-product" element={<AddProductPage addProductSubmit={ addProduct } />}></Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/terms-and-conditions" element={<TASPage />} />
        </Route>
        <Route path="/success" element={<ThankYouPage />} />
      </Route>
    )
  )
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App