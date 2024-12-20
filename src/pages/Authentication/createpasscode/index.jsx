import React, { useEffect, useState } from "react";
import topImage from '../../../assets/registration/Vector.png'
import CreateNewPasscode from "./createNewPasscode";
import ConfirmNewPasscode from "./confirmPasscode";
import { useLocation, useNavigate } from "react-router-dom";
import { useCredentials } from "../../../context/CrendentialsContext";
import { createPassword } from "../../../services/authentication.services";

const CreatePasscode = () => {
  const [passcode, setPasscode] = useState("");
  const [credentials, setCredentials] = useCredentials();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const createPasscode = async ()=>{
    console.log(location.state.createPasswordToken);
    let reqBody = {
      createPasswordToken : location.state.createPasswordToken,
      pin: passcode.join("")
    }
    console.log(reqBody);
    //Send Request and User Information will be returned to 
    let res = await createPassword(reqBody);

    
    navigate('/home')
    setCredentials(res.data.data);
  }
  const[step, setStep] = useState(1);
  return (
    
    <div className="relative flex flex-col py-14 align-middle w-full md:w-1/2 overflow-auto	">
          <img className = "absolute z-[0] top-0 right-0 w-4/5" src = {topImage}></img>
          <div className="flex justify-center">
          <div className = "z-[1] h-1/2 align-middle w-9/12 md:w-8/12 lg:w-7/12">
            <h2 className="text-lg font-bold mt-0 text-primary">Create New Passcode</h2>

            {
                (step==1 && <CreateNewPasscode setStep={setStep} setPasscode={setPasscode}/>)
                || (step==2 && <ConfirmNewPasscode passCode={passcode} createPasscode={createPasscode}/>)
            }
          </div>
          </div>
          
          
        </div>
  );
};

export default CreatePasscode;