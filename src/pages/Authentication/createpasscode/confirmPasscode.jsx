import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import { useNavigate } from "react-router-dom";

const ConfirmPasscode = ({className, passCode, createPasscode}) => {
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState(new Array(4).fill(""));
  const [error, setError] = useState(false);
  const handleSubmit = (e)=>{
    if(passCode.join() === confirmPass.join())
    {
      setError(false);
      createPasscode();
    }
    else{
      setError(true);
    }
    e.preventDefault()
  }
  const onCancel = ()=>{
    navigate("/signup")
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <p className="text-sm text-primary">Please re-enter your new passcode.</p>
        <label className={`block text-md font-semibold mt-12 ${error?"text-danger":"text-black"}`}>Re-enter New Passcode *</label> 
        <div className="flex flex-col items-center">
          <div>
            <div>
              <OTPInput className = "my-3" otp={confirmPass} setOtp={setConfirmPass}/>
            </div>
            {error && (
            <div>
              <p className = "text-danger text-sm">Passcode doesn't match</p>
            </div>
            )}
            
          </div>
          
          <button
              type="submit"
              className="w-[180px] mt-6 btn-primary"
              >
                  Create Passcode
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

export default ConfirmPasscode;
