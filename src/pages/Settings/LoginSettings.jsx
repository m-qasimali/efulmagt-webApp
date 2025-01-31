import { useState } from "react";
import SetNotificationItem from "../../components/UIElements/notifications/SetNotificationsItem";
import EnterPasscode from "../Authentication/login/enterPasscode";
import SetPasswordInput from "../../components/UIElements/settings/SetPasswordInput";
import { useCredentials } from "../../context/CrendentialsContext";
import { deleteUserAccount } from "../../services/authentication.services";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const AccountDeleteConfirmationModal = ({isOpen, setIsOpen, deleteAccount}) => {

    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className='max-w-sm w-full space-y-4'>
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg ">
            <div className="flex justify-end">
            </div>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center space-x-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="ml-3 text-gray-600">This will <span className="text-red-900 font-bold">delete</span> all of your data forever. We will not be able to restore your account.</span>
              </div>
              <div className="flex items-center justify-center space-x-4 ">
                <button className="mt-6 w-full font-semibold px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={()=>{
                    setIsOpen(false)
                }}>
                  No
                </button>
                <button className="bg-red-700 w-full font-semibold  mt-6 px-4 py-2 text-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={()=>{
                    deleteAccount()
                    setIsOpen(false)
                }}>
                  Delete
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )
    );
};

export default function LoginSettings(){
      const [specialOfferNotfication, setSpecialOfferNotification] = useState({
        "email":false,
        "pushNotification": false
      })
      const [faceID, setFaceID] = useState(false);
      const [confirmationModal, setConfirmationModal] = useState(false);
      const [credentials, setCredentials] = useCredentials();
      const navigate = useNavigate();
      const handleFaceID = (value)=>{
        setFaceID(value)
      }
      const deleteAccount = ()=>{
        //Deleting Account Logic
        deleteUserAccount(credentials.authToken).then((res)=>{
          toast.success(res.data.message);
          setCredentials(null);
          navigate("/");
        }).catch((err)=>{
          toast.error(err.response.data.data.error || "An error occurred while deleting user");
        })
      }
      const handleSpecialOfferEmailChange = (value)=>{
        setSpecialOfferNotification({...specialOfferNotfication, email:value})
      }
      const handleSpecialOfferPushNotificationChange = (value)=>{
        setSpecialOfferNotification({...specialOfferNotfication, pushNotification:value})
      }
      return(
        <div className="h-full w-full flex-col justify-center p-1">
            {/* Notifications for Special Offers */}
            <div className="w-full md:w-4/5 lg:w-3/5 space-y-4 py-2">
              <SetPasswordInput/>
            </div>
            {/* Login with Face ID */}

            {/* <div className="flex space-x-12 mt-6">
                <span className="text-md font-semibold">Login with Face ID</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                      type="checkbox"
                      className="sr-only"
                      checked={faceID}
                      onChange={() => handleFaceID(!faceID)}
                  />
                  <div className={`relative w-10 h-6 bg-gray-200 rounded-full ${faceID?"bg-primary":""}`}>
                      <div
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        faceID ? 'transform translate-x-4' : ''
                      }`}
                      ></div>
                  </div>
                </label>
            </div> */}

            {/* Delete Account */}
            <div  className="mt-10">
                <p  className="text-md font-semibold">Account</p>
                <button onClick={()=>{
                    setConfirmationModal(true);
                }} className="w-full md:w-[335px] h-[50px] rounded-lg border-solid border border-gray-800 text-gray-500 font-semibold">Delete Account</button>
            </div>
            {
            confirmationModal && 
                <AccountDeleteConfirmationModal isOpen={confirmationModal} setIsOpen={setConfirmationModal} deleteAccount={deleteAccount}/>
            }
        </div>
        
      )
}