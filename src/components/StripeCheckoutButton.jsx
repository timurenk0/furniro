/* eslint-disable react/prop-types */
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const StripeCheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      // Create checkout session with total price
      const response = await axios.post('/api/create-checkout-session', { 
      }, { 
        withCredentials: true 
      });

      console.log(response.data);

      const stripe = await loadStripe('pk_test_51R6H9LEzlr0nurStjF9XDYwe4A9gSs0JHOXXPclvSZREfSRB1MbDDItvBOUlRsJU0IVwt2lhOD6cHZrT1F9O2W7c00cE9a17vX'); // Replace with your actual publishable key
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        console.error('Checkout failed', error);
      }

      return;
      
    } catch (error) {
      console.error('Failed to create checkout session', error);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      className="btn btn-success border-3 fw-semibold fs-5 w-100 py-2 mt-3"
    >
      Proceed to Checkout
    </button>
  );
};

export default StripeCheckoutButton;