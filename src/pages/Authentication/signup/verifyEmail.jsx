import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import PhoneInput from "../../../components/UIElements/inputs/PhoneInput";
import { sendOTP, verifySignupOTP } from "../../../services/authentication.services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const VerifyEmail = ({className, setStep, setJWTCode}) => {
  const [time, setTime] = useState(10)
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [encryptedOTPToken, setEncryptedOTPToken] = useState(null);
  useEffect(()=>{
    if(time > 0)
    {
      setTimeout(()=>{
          setTime(time - 1)
      }, 1000)
    }
  }, [time])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!encryptedOTPToken){
      let credentials = {
        "email": e.target.email.value
      }

      let response = await sendOTP(credentials);
      let payload = response.data.data
      //Once Credentials are Sent, You will Receive a JWT of OTP Verification//
      console.log(payload);
      setEncryptedOTPToken(payload.encryptedOTPToken)
      setTime(600);
    }
    else{
      //User is supposed to enter the OTP Code and get another JWT//
      console.log(otp, encryptedOTPToken)//Send this otp along with otpVerification to Backend

      let otpRefined = otp.join("");
      try{
        let res = await verifySignupOTP({encryptedOTPToken, otp:otpRefined})
      
        setJWTCode(res.data.data.credentialsToken)
        setStep(2);
      }
      catch(err){
        toast.error(err.response.data.message);
      }
    }
  }
  const cancelOtp = ()=>{
    setEncryptedOTPToken(null);
  }
  const resendCode = ()=>{
    console.log("Resend Code");
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
        
        <p className="text-xs text-muted mt-2">
        We will send you an email with a code to verify youremail address".

        </p>
        <Link to="/signin" className="text-xs text-muted mt-2 text-secondary">
          Already have an account?
        </Link>
        
        {
            (encryptedOTPToken)?
            <div className = "flex flex-col items-center mt-4">
            <p className = "text-center font-bold text-xl m-1">OTP Verification</p>
            <p className = "text-center text-sm m-1">Please enter the OTP sent to your registered email</p>
            <OTPInput className = "my-3" otp={otp} setOtp={setOtp}/>
            <p className = "text-center text-xs display:inline">Remaining time: {" "}
                <span className="text-secondary">{String(parseInt(time/60)).padStart(2, '0')}:{String(time%60).padStart(2, '0')}</span>
            </p>
            <p className = "text-center text-xs mt-2">didn't get the code? <a href="#" onClick = {resendCode} className="text-secondary">Resend</a></p>
            </div>:
            <></>
        }
        <div className="mt-4">
        <label className="text-sm inline-flex items-center mt-2">
            <input type="checkbox" required className="checkbox-custom" />
            <span className="ml-2 text-muted">
            By signing up, you agree to our{" "}
            <a href="#" className="text-black font-bold">
                Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-black font-bold">
                Privacy Policy
            </a>
            .
            </span>
        </label>
        </div>
        <div className="flex justify-center">
            <button
            type="submit"
            className="w-[180px] mt-6 btn-primary"
            >
            {
                (encryptedOTPToken)?
                "Continue":
                "Verify"
            }
            </button>
        </div>
        
        {
            encryptedOTPToken &&
            <div className="flex justify-center">
                <button
                onClick={cancelOtp}
                className="w-[180px] mt-6 btn-primary-outline"
                >
                Cancel
                </button>
            </div>
        }
        
    </form>
  );
};

export default VerifyEmail;
