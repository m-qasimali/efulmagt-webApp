import { useState } from "react"
import CloseSVG from "../../../assets/icons/close.svg?react"
import OTPInput from "../inputs/OTPInput";
import { toast } from "react-toastify";
import { changePassword, verifyPassword } from "../../../services/authentication.services";
import { useCredentials } from "../../../context/CrendentialsContext";

export default function SetPasswordInput(){
    const res ={
        lastUpdate: "2 months"
    }
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = ()=>{
        setIsOpen(!isOpen)
    }
    const [credentials, setCredentials] = useCredentials();
    const [passcodeConfirmed, setPasscodeConfirmed] = useState(false);
    const [newPassCodeSubmitted, setNewPasscodeSubmitted] = useState(false);
    const [passcode, setPasscode] = useState(new Array(4).fill(""));
    const [newPasscode, setNewPasscode] = useState(new Array(4).fill(""));
    const [confirmPasscode, setConfirmPasscode] = useState(new Array(4).fill(""));

    const verifyPasscode = (e)=>{
        e.preventDefault();
        verifyPassword(credentials.authToken, {pin: passcode.join("")}).then((res)=>{
            setPasscodeConfirmed(true);
        }).catch((err)=>{
            console.log(err.response.data);
            toast.error(err.response.data.message)
        })
    }
    
    const submitNewPasscode = ()=>{
        setNewPasscodeSubmitted(true);
    }

    const updatePasscode = (e)=>{
        e.preventDefault();
        let isEqual = true;

        for(let i = 0; i<newPasscode.length; i++){
            if(newPasscode[i] != confirmPasscode[i])
                isEqual=false;
        }

        if(!isEqual){
            toast.error("Passcode doesn't match");
            return
        }

        changePassword(credentials.authToken, {oldPin: passcode.join(""), newPin: newPasscode.join("")}).then((res)=>{
            console.log(res);
            toast.success("Password Changed Successfully");
        }).catch((err)=>{
            toast.error("Password doesn't match");
        })

        setPasscodeConfirmed(false);
        setNewPasscodeSubmitted(false);
        setIsOpen(false);
        setPasscode(new Array(4).fill(""));
        setNewPasscode(new Array(4).fill(""));
        setConfirmPasscode(new Array(4).fill(""));
    }

    return (
    <div className="bg-white">
      {/* Header Section */}
      <div
        className="outline-1 outline-gray-400 outline rounded-md flex items-center justify-between p-4 cursor-pointer shadow-md"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Passcode</h3>
            <p className="text-sm text-gray-500">Last updated {res.lastUpdate} ago</p>
          </div>
        </div>
        <div>
          <button className="text-blue-500 font-medium hover:underline">
            Change
          </button>
        </div>
      </div>

      {
        isOpen && (
            <div className="hidden md:block">
                <p className="text-md font-semibold mt-4">Update Passcode</p>
                {
                    (!passcodeConfirmed) && (
                        <form className="flex flex-col space-y-4 " onSubmit={verifyPasscode}>
                            <p className="text-base">Please enter your old passcode first to update the passcode.</p>
                            <OTPInput otp={passcode} setOtp={setPasscode}/>
                            <button
                            type="submit"
                            className="btn-primary w-[200px]"
                            >
                                Verify
                            </button>
                        </form>
                    )
                }
                {
                    (passcodeConfirmed ) && (
                        <form  className="flex flex-col space-y-4 "  onSubmit={updatePasscode}>
                            <p className="text-base">Please Enter New Passcode</p>
                            <OTPInput otp={newPasscode} setOtp={setNewPasscode}/>
                            <p className="text-base">Please Re-enter New Passcode</p>
                            <OTPInput otp={confirmPasscode} setOtp={setConfirmPasscode}/>
                            <button
                            type="submit"
                            className="btn-primary w-[200px]"
                            >
                                Update Passcode
                            </button>
                        </form>
                    )
                }
            </div>
        )
      }

     {
        isOpen && (
            <div className="z-20 fixed md:hidden h-screen w-screen top-0 left-0">
                <div className='flex flex-col justify-end h-full'>
                    <div className='w-full h-full bg-white bg-opacity-40'
                    onClick={()=>{toggleDropdown()}}>
                        {/* Giving White Space */}
                            </div>
                            <div className="py-8 w-full border border-solid bg-white rounded-t-[30px]">
                                <div className='relative'>
                                <div className='absolute top-2 left-4 hover:cursor-pointer'
                                    onClick={()=>{toggleDropdown()}}
                                >
                                    <CloseSVG/>
                                </div>
                                <div className="text-center m-3 mx-6 space-y-5">
                                    <p className="text-md font-semibold mt-4">
                                        Update Password
                                    </p>
                                {
                            (!passcodeConfirmed) && (
                                <form className="flex flex-col  items-center  space-y-4 " onSubmit={verifyPasscode}>
                                    <p className="text-base">Please enter your old passcode first to update the passcode.</p>
                                    <OTPInput otp={passcode} setOtp={setPasscode}/>
                                    <button
                                    type="submit"
                                    className="btn-primary w-[200px]"
                                    >
                                        Verify
                                    </button>
                                </form>
                            )
                        }
                        {
                            (passcodeConfirmed && !newPassCodeSubmitted) && (
                                <form  className="flex flex-col  items-center  space-y-4 " onSubmit={submitNewPasscode}>
                                    <p  className="text-base">Please Enter New Passcode</p>
                                    <OTPInput otp={newPasscode} setOtp={setNewPasscode}/>
                                    
                                    <button
                                    type="submit"
                                    className="btn-primary w-[200px]">
                                        Update Passcode
                                    </button>
                                </form>
                            )
                        }
                         {
                            (passcodeConfirmed && newPassCodeSubmitted) && (
                                <form  className="flex flex-col items-center space-y-4 " onSubmit={updatePasscode}>
                                    <p  className="text-base">Please Re-enter New Passcode</p>
                                    <OTPInput otp={confirmPasscode} setOtp={setConfirmPasscode}/>
                                    <button
                                    type="submit"
                                    className="btn-primary w-[200px]"
                                    >
                                        Update Passcode
                                    </button>
                                </form>
                            )
                        }
                        </div>
                    </div>
                        </div>
                        
                    </div>
            </div>
        )
      }
    </div>
    )
}