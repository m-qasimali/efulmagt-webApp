import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { toast } from "react-toastify";

const tiers = [
  { id: 1, name: "Tier 1", price: "9KR" },
  { id: 3, name: "Tier 3", price: "17KR" },
  { id: 5, name: "Tier 5", price: "25KR" },
  { id: 7, name: "Tier 7", price: "35KR" },
  { id: 10, name: "Tier 10", price: "45KR" },
  { id: 12, name: "Tier 12", price: "59KR" },
  { id: 14, name: "Tier 14", price: "69KR" },
];

const Payment = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [stage, setStage] = useState(1);
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
    country: "Denmark",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Input type restrictions
    switch (name) {
      case "cardNumber":
        processedValue = value.replace(/\D/g, '').slice(0, 19);
        break;
      case "expiryDate":
        processedValue = value.replace(/\D/g, '');
        if (processedValue.length > 2) {
          processedValue = `${processedValue.slice(0, 2)}/${processedValue.slice(2, 4)}`;
        }
        processedValue = processedValue.slice(0, 5);
        break;
      case "cvv":
        processedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
      case "zipCode":
        processedValue = value.replace(/\D/g, '').slice(0, 5);
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const { cardNumber, expiryDate, cvv, zipCode } = formData;
    
    if (!cardNumber || cardNumber.length < 12) {
      toast.error("Invalid card number");
      return;
    }

    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast.error("Invalid expiry date");
      return;
    }

    if (!cvv || cvv.length < 3) {
      toast.error("Invalid CVV");
      return;
    }

    if (!zipCode || zipCode.length !== 5) {
      toast.error("Invalid ZIP code");
      return;
    }

    // Proceed with payment
    const paymentInfo = {
      tier: selectedTier,
      cardDetails: {
        ...formData,
        cardNumber: formData.cardNumber.slice(-4)
      }
    };

    if (onPaymentSuccess) {
      onPaymentSuccess(paymentInfo);
    }

    toast.success(`Payment for ${selectedTier.name} successful!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-[450px] rounded-2xl shadow-lg p-6 max-h-[658px]">
        {/* Stage 1: Choose Tier */}
        {stage === 1 && (
          <>
            <div className="flex justify-center gap-1 mb-2">
              <div className="w-8 h-1.5 rounded-full bg-primary"></div>
              <div className="w-8 h-1.5 rounded-full bg-[#E0E0E0]"></div>
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">
              Choose Tier
            </h2>
            <div className="space-y-2 overflow-auto">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  className={`flex justify-between items-center p-3 w-full border rounded-lg 
                  ${
                    selectedTier.id === tier.id
                      ? "bg-primary text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <span className="flex items-center">
                    {selectedTier.id === tier.id && (
                      <FaCheckCircle className="text-white bg-primary rounded-lg mr-2" />
                    )}
                    {tier.name}
                  </span>
                  <span className="flex items-center">{tier.price}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={onClose}
                className="py-3 px-6 border border-gray-400 rounded-lg w-1/3"
              >
                Cancel
              </button>
              <button
                onClick={() => setStage(2)}
                className="py-3 px-6 bg-primary text-white rounded-lg w-2/3"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Stage 2: Payment Details */}
        {stage === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-1 mb-2">
              <div className="w-8 h-1.5 rounded-full bg-primary"></div>
              <div className="w-8 h-1.5 rounded-full bg-primary"></div>
            </div>
            <h2 className="text-lg font-semibold text-center mb-4">
              Payment Details
            </h2>
            <div className="space-y-3">
              {/* Card Number */}
              <div className="flex h-[64px] mb-4">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">Card Number</span>
                </div>
                <div className="flex-grow relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your card number"
                    className="w-full h-full p-4 bg-white border-none outline-none"
                  />
                  <FaCcMastercard className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500" />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="flex h-[64px] mb-4">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">Expiry Date</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className="w-full h-full p-4 bg-white border-none outline-none"
                  />
                </div>
              </div>

              {/* CVV */}
              <div className="flex h-[64px] mb-4">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">CVV</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="Enter CVV"
                    className="w-full h-full p-4 bg-white border-none outline-none"
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div className="flex h-[64px] mb-4">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">ZIP Code</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                    className="w-full h-full p-4 bg-white border-none outline-none"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="flex h-[64px] mb-4">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-700 font-medium text-sm">Country</span>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    readOnly
                    className="w-full h-full p-4 bg-white border-none outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 gap-2">
              <button
                type="button"
                onClick={() => setStage(1)}
                className="py-3 px-6 flex items-center justify-center border rounded-lg w-1/3"
              >
                Back
              </button>
              <button 
                type="submit"
                className="py-3 px-6 bg-primary text-white rounded-lg w-2/3"
              >
                Pay {selectedTier.price}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
