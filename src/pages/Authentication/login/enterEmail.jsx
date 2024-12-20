import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import PhoneInput from "../../../components/UIElements/inputs/PhoneInput";
import { Link } from "react-router-dom";

const EnterEmail = ({className, setStep, setCredentials}) => {

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    let credentials = {"email": e.target.email.value}
    
    //Credentials has been set and move to enter passcode
    setCredentials(credentials);
    
    setStep(2)
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <div>
        <label className="block text-md font-semibold">Email</label>
        <input
        name="email"
        type="email"
        placeholder="Enter Your Email"
        className="w-full mt-2 txt-field-primary"
        required
        />
        </div>
      
        <Link to="/signup" className="text-xs text-muted mt-2 text-secondary">
          Create an account.
        </Link>
        <div className="mt-4">
        </div>
        <div className="flex justify-center">
            <button
            type="submit"
            className="w-[180px] mt-6 btn-primary"
            >
            Continue
            </button>
        </div>
        
    </form>
  );
};

export default EnterEmail;
