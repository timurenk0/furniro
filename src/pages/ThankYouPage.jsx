import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const ThankYouPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);
    
  return (
    <>
        <h1>Payment Successful! Thank you for choosing us!</h1>
        <p>Redirecting you to home page...</p>
    </>
  )
}

export default ThankYouPage