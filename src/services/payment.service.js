import { toast } from "react-toastify";
import axios from "axios";

const paymentBaseUrl = "https://efulmagt-backend-payment-1.onrender.com"

const handlePayment = async (amount, currency) => {
    const orderId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

    try {
      const response = await axios.post(`${paymentBaseUrl}/create-quickpay-link`, {
        orderId,
        amount: amount * 100,
        currency
      });

      // Open the payment URL in a new tab
      if (response.data.paymentUrl) {
        localStorage.setItem("paymentUrl", response.data.paymentUrl);
        localStorage.setItem("orderId", orderId)
        window.open(response.data.paymentUrl, '_blank');
        
        return true
      }
    } catch (error) {
      console.error("Payment link creation failed:", error);
      toast.error("Failed to create payment link");
    }
  }

const verifyPayment = async (orderId) => {
    try{
        const response = await axios.get(`${paymentBaseUrl}/verify-payment/${orderId}`)
        if (response) {
            console.log(response.data);
            return response.data
        }
    }
    catch (err){
        console.log(err);
        toast.error("Error Verifying Payment")
    }
    
}

// Async function to update order status in your database
async function updateOrderStatus(orderId, status) {
  try {
    // Implement your database update logic here
    // This could be with Prisma, Mongoose, or any other ORM
    // Example with Prisma:
    // await prisma.order.update({
    //   where: { orderId: orderId },
    //   data: { status: status }
    // });
  } catch (dbError) {
    console.error('Database update error:', dbError);
    throw dbError;
  }
}

export { handlePayment, verifyPayment };