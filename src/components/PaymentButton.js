/*global payhere*/
import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    const paymentDetails = {
      order_id: "67ab4c491240b7850c744722",
      amount: "980.00",
      currency: "LKR",
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    try {
      // Request backend to generate the hash value
      const response = await fetch(
        process.env.REACT_APP_START_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
          body: JSON.stringify(paymentDetails),
        }
      );

      if (response.ok) {
        const { data } = await response.json();

        // Payment configuration
        const payment = {
          sandbox: true, // Use sandbox for testing
          merchant_id: process.env.REACT_APP_MERCHANT_ID,
          return_url: "http://localhost:3000/payment/success", // Replace with your return URL
          cancel_url: "http://localhost:3000/payment/cancel", // Replace with your cancel URL
          notify_url: process.env.REACT_APP_NOTIFY_URL, // Replace with your notify URL - This should be public IP (No Localhost)
          order_id: paymentDetails.order_id,
          items: "Item Title",
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          first_name: paymentDetails.first_name,
          last_name: paymentDetails.last_name,
          email: paymentDetails.email,
          phone: paymentDetails.phone,
          address: paymentDetails.address,
          city: paymentDetails.city,
          country: paymentDetails.country,
          hash: data,
        };

        // Initialize PayHere payment
        payhere.startPayment(payment);
      } else {
        console.error("Failed to generate hash for payment.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <button id="payhere-payment" onClick={handlePayment}>
        PayHere Pay
      </button>
    </div>
  );
};

export default PaymentButton;