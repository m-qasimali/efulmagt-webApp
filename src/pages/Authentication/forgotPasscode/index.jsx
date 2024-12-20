import React, { useEffect, useState } from "react";
import topImage from '../../../assets/registration/Vector.png'
import EnterEmail from "./enterEmail"; 
import EnterOTP from "./enterOTP";

const ForgotPasscode = () => {
  const [step, setStep] = useState(1);
  const [otpVerificationCode, setOTPVerificationCode] = useState("");
  return (
    
<div className="relative flex flex-col py-12 align-middle w-full md:w-1/2 overflow-auto	">
          <img className = "absolute z-[0] top-0 right-0 w-4/5" src = {topImage}></img>
          <div className="flex justify-center">
          <div className = "z-[1] h-1/2 align-middle w-9/12 md:w-8/12 lg:w-7/12">
            {
                (step==1 && <EnterEmail className="mt-6" setStep = {setStep} setOtpVerificationCode={setOTPVerificationCode}/>) ||
                (step==2 && <EnterOTP className="mt-6" setStep = {setStep}  otpVerificationCode={otpVerificationCode} />)
            }
          </div>
          </div>
          
          
        </div>
  );
};

export default ForgotPasscode;