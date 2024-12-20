import React, { useEffect, useState } from "react";
import topImage from '../../../assets/registration/Vector.png'
import UserForm from "./userInformationForm";
import VerifyPhone from "./verifyPhone";
import VerifyEmail from "./verifyEmail";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [emailCredentialsToken, setEmailCredentialsToken] = useState(null);
  const [phoneCredentialsToken, setPhoneCredentialsToken] = useState(null);
  return (
    
<div className="relative flex flex-col py-12 align-middle w-full md:w-1/2 overflow-auto	">
          <img className = "absolute z-[0] top-0 right-0 w-4/5" src = {topImage}></img>
          <div className="flex justify-center">
          <div className = "z-[1] h-1/2 align-middle w-9/12 md:w-8/12 lg:w-7/12">
            <h2 className="text-sm font-semibold text-muted">
                Welcome to Attorney
            </h2>
            <h3 className="text-lg font-bold mt-0 text-primary">Sign Up</h3>
            {
                (step==1 && <VerifyEmail className="mt-6" setStep = {setStep} setJWTCode={setEmailCredentialsToken}/>) ||
                (step==2 && <VerifyPhone className="mt-6" setStep = {setStep} setJWTCode={setPhoneCredentialsToken}/>) ||
                (step==3 && <UserForm className="mt-6" emailCredentialsToken={emailCredentialsToken} phoneCredentialsToken={phoneCredentialsToken}/>)
            }
          </div>
          </div>
          
          
        </div>
  );
};

export default Signup;