import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import { useNavigate } from "react-router-dom";

const CreateNewPasscode = ({className, setStep, setPasscode}) => {
  const navigate = useNavigate();
  const [pass, setPass] = useState(new Array(4).fill(""));
  const handleSubmit = (e)=>{
    e.preventDefault()
    setPasscode(pass)
    setStep(2);
  }
  const onCancel = ()=>{
    navigate("/signup")
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <p className="text-sm text-primary">Please create your new passcode.</p>
        <label className="block text-md font-semibold mt-12">Create New Passcode*</label> 
        <div className="flex flex-col items-center">
          <OTPInput className = "my-3" otp={pass} setOtp={setPass}/>
          
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

export default CreateNewPasscode;
