import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import { useNavigate } from "react-router-dom";
import { verifyForgotPasswordOTP } from "../../../services/authentication.services";

const EnterOTP = ({className, setStep, otpVerificationCode}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [time, setTime] = useState(60);
  useEffect(()=>{
    if(time > 0)
    {
      setTimeout(()=>{
          setTime(time - 1)
      }, 1000)
    }
  }, [time])
  const onSubmit = async (e)=>{
    e.preventDefault();
    let reqBody = {
      encryptedOTPToken: otpVerificationCode,
      otp: otp.join("")
    }
    //Send Request to VerifyOTP Code
    let res = await verifyForgotPasswordOTP(reqBody);
    let createPasswordToken = res.data.data.createPasswordToken
    navigate('/create-passcode', {state:{createPasswordToken}})
    //navigate('/create-passcode')
  }
  const onCancel = (e)=>{
    setStep(1)
    e.preventDefault()
  }
  const resendCode = ()=>{

  }
  return (
    <form className={className}>
        <div className="flex flex-col items-center">
          
        <label className={`block text-md font-bold mt-4`}>OTP Verification</label> 
        <p className="text-sm my-4 mb-12">Please enter the 4-digit OTP sent to your email.</p>
        <div>
            <OTPInput className = "my-3" otp={otp} setOtp={setOtp}/>
            <p className = "text-center text-xs display:inline">Remaining time: {" "}
                <span className="text-secondary">{String(parseInt(time/60)).padStart(2, '0')}:{String(time%60).padStart(2, '0')}</span>
            </p>
            <p className = "text-center text-xs mt-2">didn't get the code? <a href="#" onClick = {resendCode} className="text-secondary">Resend</a></p>
            
        </div>
          
          <button
              onClick={onSubmit}
              className="w-[180px] mt-6 btn-primary"
              >
                  Verify
          </button>
          
          <div className="flex justify-center">
              <button
              onClick={onCancel}
              className="w-[180px] mt-6 btn-primary-outline"
              >
              Cancel
              </button>
          </div>
        </div>
    </form>
  );
};

export default EnterOTP;
