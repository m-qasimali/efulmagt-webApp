import React from 'react';

const OTPInput = ({ className, otp, setOtp }) => {
  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only the last entered character is kept
    setOtp(newOtp);

    // Move to the next input if a value is entered
    if (value.length === 1 && index < otp.length - 1) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      // Move to the previous input if Backspace is pressed
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className={className}>
        <div className="flex space-x-4">
        {otp.map((digit, index) => (
            <input
            key={index}
            type="number"
            maxLength="1"
            value={digit}
            required
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-xl bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ))}
        </div>
    </div>
  );
};

export default OTPInput;