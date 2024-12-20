import React, { useState, useEffect } from "react";
import SignaturePopup from "../../components/UIElements/popups/SignatureSettingsPopup";
import axios from "axios";
import { useCredentials } from "../../context/CrendentialsContext.jsx";
import { updateUserSignature } from "../../services/user.services.js";
import { updateCompanySign } from "../../services/company.services.js";
import { toast } from "react-toastify";

const SignatureSettings = () => {
  const [isUserSignatureOpen, setIsUserSignatureOpen] = useState(false);
  const [isCompanySignatureOpen, setIsCompanySignatureOpen] = useState(false);
  const [credentials, setCredentials] = useCredentials();

  const handleCompanySignatureSave = async(signature)=>{
    setIsCompanySignatureOpen(false);
    const formData = new FormData();
    formData.append("file", signature);
    try{
      let response = await updateCompanySign(credentials.authToken, formData);

      console.log(response.data.data.signature);

      setCredentials((oldValue)=> {
        return {
          ...oldValue,
          company:{
            ...oldValue.company,
            signature: response.data.data.signature
          }
        }
      })
    }
    catch(err){
      console.log(err.response);
      toast.error(err.response.data.message || "An error occured while updating company sign");
    }
  }

  const handleUserSignatureSave = async (signature) => {
    setIsUserSignatureOpen(false);
    const formData = new FormData();
    formData.append("file", signature);
    let response = await updateUserSignature(credentials.authToken, formData).catch((err)=>{
      toast.error(err.response.data.data.message || "An error occured while updating user sign");
    })
    setCredentials((oldValue)=> {
      return {
        ...oldValue,
        user:{
          ...oldValue.user,
          signature: response.data.data.signature
        }
      }
    })
    // console.log(response.data.data.signature);
  };

  return (
    <div className="space-y-4 w-full md:w-4/5 lg:w-1/2 flex flex-col items-center justify-center">
      <SignaturePopup
        isOpen={isUserSignatureOpen}
        onClose={() => setIsUserSignatureOpen(false)}
        onSave={handleUserSignatureSave}
      />
      <SignaturePopup
        isOpen={isCompanySignatureOpen}
        onClose={() => setIsCompanySignatureOpen(false)}
        onSave={handleCompanySignatureSave}
      />
      <div className="p-4 flex w-full gap-x-1 items-center justify-between">
        <div className="flex flex-col shadow-xl rounded-lg w-full">
          <p className="text-sm text-gray-500 font-semibold">User</p>
          {
            (credentials.user.signature)?
            <div className="flex justify-center">
              <img src={credentials.user.signature} alt={`Signature`} className="h-11/12"/>
            </div>:
            <div className="flex justify-center items-center h-[100px]">
              <span className="font-bold text-gray-500">No Signature</span>
            </div>
          }
          
        </div>

        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsUserSignatureOpen(true)}
        >
          Change
        </button>
      </div>
      {
        (credentials.company)?
        <div className="p-4 flex w-full gap-x-1 items-center justify-between">
          <div className="flex flex-col shadow-xl rounded-lg w-full">
            <p className="text-sm text-gray-500 font-semibold">Company</p>
            {
              (credentials.company.signature)?
              <div className="flex justify-center">
                <img src={credentials.company.signature} alt={`Signature`} className="h-11/12"/>
              </div>:
              <div className="flex justify-center items-center h-[100px]">
                <span className="font-bold text-gray-500">No Signature</span>
              </div>
            }
            
          </div>

          <button
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsCompanySignatureOpen(true)}
          >
            Change
          </button>
        </div>:
        <></>
      }   
      
    </div>
  );
};

export default SignatureSettings;
