import React, { useEffect, useState } from "react";
import PhoneInput from "../../../components/UIElements/inputs/PhoneInput";
import { sendOTP } from "../../../services/authentication.services";

const EnterEmail = ({className, setStep, setOtpVerificationCode}) => {
  const [signInWithEmail, setSignInWithEmail] = useState(true);
  const switchSignIn = ()=>{
    setSignInWithEmail(!signInWithEmail)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    let credentials = {
        email: e.target.email.value
      }
    
    let res = await sendOTP(credentials);

    setOtpVerificationCode(res.data.data.encryptedOTPToken);
    
    setStep(2)
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <div className="text-lg font-bold">
          Create New Code
        </div >
        <p className="text-sm">
          To be able to create a new code for e-fuldmagt we will need to be sure its really you.
        </p>
        <div className ="my-8"></div>
        {
            (signInWithEmail)?
            <div>
            <label className="block text-md font-semibold">Email</label>
            <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full mt-2 txt-field-primary"
            required
            />
            </div>
            :
            <div>
            <label className="block text-md font-semibold">Phone Number</label>
            <div className="w-full mt-2">
                <PhoneInput/>
            </div>
            </div>
        }
        
        <p className="text-xs text-muted mt-2">
        We will send you a code to verify your {signInWithEmail?"email address":"phone number"} to verify it's you.
        {" "}
        <a href="#" className="text-xs text-muted mt-2 text-secondary" onClick={switchSignIn}>
        {
            signInWithEmail?"Use phone number instead":"Use email instead"
        }.
        </a>
        </p>
        <div className="mt-4">
        </div>
        <div className="flex justify-center">
            <button
            type="submit"
            className="w-[180px] mt-6 btn-primary"
            >
            Get Code
            </button>
        </div>
        
    </form>
  );
};

export default EnterEmail;
