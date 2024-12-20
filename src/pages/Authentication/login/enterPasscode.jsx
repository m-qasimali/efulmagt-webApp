import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import { Link, useNavigate } from "react-router-dom";

function passcodeLength(array){
  let correct = true;
  for(let i = 0; i<array.length; i++){
    if(array[i].length<=0){
      correct=false
      break
    }
  } 
  return correct;
}

const EnterPasscode = ({className, setStep, passCode, setPasscode, handleLogin}) => {
  const [error, setError] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(passcodeLength(passCode)){
      handleLogin();
    }
    else{
      setError(true)
    }
  }
  const onCancel = (e)=>{
    e.preventDefault()

    setStep(1)
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <label className={`block text-md font-semibold mt-12 ${error?"text-danger":"text-black"}`}>Enter Your Passcode *</label> 
        <div className="flex flex-col items-center">
        <div>
            <div>
              <OTPInput className = "my-3" otp={passCode} setOtp={setPasscode}/>
            </div>
            
            <div className="flex justify-between">
              <p className = {`text-danger text-xs ${error?'':'invisible'}`}>Passcode doesn't match</p>
              <Link className = "text-xs" to="/forgot-passcode">Forgot password?</Link>
            </div>
            
          </div>
          
          <button
              type="submit"
              className="w-[180px] mt-6 btn-primary"
              >
                  Continue
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

export default EnterPasscode;
