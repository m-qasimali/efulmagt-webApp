import React, { useEffect, useState } from "react";
import topImage from '../../../assets/registration/Vector.png'
import EnterEmail from "./enterEmail";
import EnterPasscode from "./enterPasscode";
import { useNavigate } from "react-router-dom";
import { useCredentials } from "../../../context/CrendentialsContext";
import { login } from "../../../services/authentication.services";
import { toast } from "react-toastify";

const Login = () => {
  const[contextCredentials, setContextCredentials]= useCredentials();
  const[step, setStep] = useState(1);
  const [credentials, setCredentials] = useState("");
  const[passcode, setPasscode] = useState(new Array(4).fill(""));
  const navigate = useNavigate();
  const handleLoginUser = async () => {
    try{
      let response = await login({credentials, pin: passcode.join("")});
      let resCredentials = await response.data.data;
      console.log(response);
      setContextCredentials(
        {
          ...resCredentials,
          selected: "user"
        }
      )
      localStorage.setItem("token", response.data.data.authToken)
      localStorage.setItem("userId", response.data.data.user._id);
      console.log(credentials);
      navigate('/home')
    }
    catch(err){
      if (err?.response?.data?.success === false){
        toast.error(err?.response.data.message)
      }
      toast.error(err.response.data.data.error || "Wrong email or password");
    }
  }
  return (
    
<div className="relative flex flex-col py-12 align-middle w-full md:w-1/2 overflow-auto	">
          <img className = "absolute z-[0] top-0 right-0 w-4/5" src = {topImage}></img>
          <div className="flex justify-center">
          <div className = "z-[1] h-1/2 align-middle w-9/12 md:w-8/12 lg:w-7/12">
            <h2 className="text-sm font-semibold text-muted">
                Welcome to Attorney
            </h2>
            <h3 className="text-lg font-bold mt-0 text-primary">Login</h3>
            {
                (step==1 && <EnterEmail className="mt-6" setStep = {setStep} setCredentials={setCredentials}/>) ||
                (step==2 && <EnterPasscode className="mt-6" setStep = {setStep} passcode={passcode} passCode={passcode} setPasscode={setPasscode} handleLogin={handleLoginUser} credentials={credentials}/>)
            }
          </div>
          </div>
        </div>
  );
};

export default Login;