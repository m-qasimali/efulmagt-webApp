import React, { useState, useContext } from "react";
import logo from "../../assets/dashboard/logo.png";
import "reactjs-popup/dist/index.css";
import UserSearchBar from "../../components/UIElements/searchBars/UserSearchBar.jsx";
import DateSelector from "../../components/UIElements/dateSelectors/dateSelector.jsx";
import { useNavigate } from "react-router-dom";
import PhoneInput from "../../components/UIElements/inputs/PhoneInput.jsx";
import SignaturePopup from "../../components/UIElements/popups/SignaturePopup.jsx";
import axios from "axios";
import { useCredentials } from "../../context/CrendentialsContext.jsx";
import { toast } from "react-toastify";
import { createFuldmagt, requestFuldmagt } from "../../services/fuldmagt.services.js";

const PackageCollectionRequest = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useCredentials();
  const { authToken } = credentials;
  const defaultHours = 3;
  const [selectedUser, setSelectedUser] = useState(null);
  const [chooseDate, setChooseDate] = useState(false);
  const [isChooseMannually, setChooseMannually] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const handleSelectUser = (user)=>{
    setSelectedUser(user);
    setChooseMannually(false);
  }

  const handleSignatureSave = async (signature) => {
    setSignatureData(signature);
    setIsSignatureOpen(false);

    let expiry = null;
    let currentDate = new Date();
    if (!chooseDate) {
      expiry = new Date(currentDate.getTime() + defaultHours * 60 * 60 * 1000);
    } else {
      expiry = new Date(expiryDate);
    }

    if(expiry<new Date()){
        console.log(expiryDate);
        console.log(new Date());
        toast.error("Expiry Date must be greater than issue date");
        return
    }

    const formattedExpiry = expiry.toISOString().replace(/\.\d{3}Z$/, "+0000");

    let user = null;
    if (isChooseMannually) {
      console.log(dateOfBirth.year, dateOfBirth.month, dateOfBirth.day);

      const dob = new Date(
        `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`
      );
      const formattedDOB = dob.toISOString().replace(/\.\d{3}Z$/, "+0000");
      user = {
        fullName: `${fullName.firstName} ${fullName.lastName}`,
        dateOfBirth: formattedDOB,
        email,
        phoneNumber,
        countryCode,
      };
    } else {
      user = selectedUser;
    }
    
    if(!user)
    {
      toast.error("User not selected");
      return
    }

    const formData = new FormData();
    if (!isRequest) {
      formData.append("title", "Post POA");
      formData.append("accountType", credentials.selected);
      formData.append("expiry", formattedExpiry);
      formData.append("signature", signature);
      console.log(signature);

      if (isChooseMannually) {
        formData.append("agentName", user.fullName);
        formData.append("agentDOB", user.dateOfBirth);
        formData.append("agentEmail", user.email);
        formData.append("agentCountryCode", user.countryCode);
        formData.append("agentPhoneNumber", user.phoneNumber);
      } else {
        formData.append("agentId", user._id || "");
      }
    } else {
      formData.append("title", "Post POA");
      formData.append("accountType", "user");
      formData.append("expiry", formattedExpiry);

      if (isChooseMannually) {
        formData.append("fuldmagtGiverName", user.fullName);
        formData.append("fuldmagtGiverDOB", user.dateOfBirth);
        formData.append("fuldmagtGiverEmail", user.email);
        formData.append("fuldmagtGiverPhoneNumber", user.phoneNumber);
        formData.append("fuldmagtGiverCountryCode", user.countryCode);
      } else {
        formData.append("fuldmagtGiverId", user._id || "");
      }
    }

    try {

      let response = null;
      if(!isRequest){
        response = await createFuldmagt(credentials.authToken, formData)
      }
      else{
        response = await requestFuldmagt(credentials.authToken, formData)
      }
      console.log(response);
      toast.success(response.data.message);
      navigate ("/home")
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <SignaturePopup
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onSave={handleSignatureSave}
        selectedUser={selectedUser}
      />
      <div className="text-lg font-bold">e-fuldmagt for package Collection</div>
      <div className="flex items-center justify-center space-x-4 rounded-full bg-[#246C89] p-1 w-max mx-auto">
        {isRequest ? (
          <button
            className={`px-[40px] py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
            onClick={() => {
              setIsRequest(false);
            }}
          >
            Send
          </button>
        ) : (
          <button
            className={`px-[40px] py-3 rounded-full bg-white text-primary text-sm font-bold`}
            onClick={() => {
              setIsRequest(false);
            }}
          >
            Send
          </button>
        )}
        {!isRequest ? (
          <button
            className={`px-[40px] py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
            onClick={() => {
              setIsRequest(true);
            }}
          >
            Request
          </button>
        ) : (
          <button
            className={`px-[40px] py-3 rounded-full bg-white text-primary text-sm font-bold`}
            onClick={() => {
              setIsRequest(true);
            }}
          >
            Request
          </button>
        )}
      </div>
      <div className="text-lg font-semibold">When should it expire?</div>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-12 rounded-full p-1 w-max mx-auto">
        <button
          className={`w-[250px] h-[50px] ${
            chooseDate
              ? "outline outline-1 outline-gray-300"
              : "bg-primary text-secondary bg-opacity-20"
          } rounded-full`}
          onClick={() => {
            setChooseDate(false);
          }}
        >
          After {defaultHours} hours
        </button>
        <button
          className={`w-[250px] h-[50px]  ${
            !chooseDate
              ? "outline outline-1 outline-gray-300"
              : "bg-primary text-secondary bg-opacity-20"
          }  rounded-full`}
          onClick={() => {
            setChooseDate(true);
          }}
        >
          Choose Date and Time
        </button>
      </div>
      {chooseDate && (
        <div className="flex items-center justify-center space-x-12 rounded-full p-1 w-max mx-auto">
          <input
            type="datetime-local"
            className="w-[250px] text-base rounded-full"
            value={expiryDate.toISOString().slice(0, 19)}
            onChange={(e) => {
              let newDate = new Date(e.target.value);
              setExpiryDate(newDate);
            }}
          ></input>
        </div>
      )}
      <div className="text-lg  font-semibold">
        Who will pickup the package for you?
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center w-full justify-around rounded-full p-1">
        <UserSearchBar
          className="w-full p-3"
          setSelectedUser={handleSelectUser}
        />
        <div className="flex md:flex-col items-center w-full md:w-1/2">
          <div className="hidden md:block border-l border-gray-400 h-12"></div>
          <hr className="md:hidden w-full"></hr>
          <span className="text-gray-500 my-2">OR</span>
          <hr className="md:hidden w-full"></hr>
          <div className="hidden md:block border-l border-gray-400 h-12"></div>
        </div>
        <button
          className={`w-full h-[100px]  rounded-full border ${
            isChooseMannually
              ? "border-solid text-secondary font-bold"
              : "border-dashed"
          } border-2 rounded-lg`}
          onClick={() => {
            if (isChooseMannually) {
              setChooseMannually(false);
            } else {
              setSelectedUser(null);
              setChooseMannually(true);
            }
          }}
        >
          {isChooseMannually ? "Cancel Type Mannually" : "Type Manually"}
        </button>
      </div>

      <form className="flex flex-col items-center justify-center space-x-12 rounded-full p-1 w-full">
        {isChooseMannually && !selectedUser && (
          <div className="w-full md:w-[416px]">
            <label className="block">Full Name</label>
            <input
              required
              type="text"
              placeholder="First Name"
              value={fullName.firstName}
              onChange={(e) =>
                setFullName({ ...fullName, firstName: e.target.value })
              }
              name="firstName"
              className="txt-field-primary block mt-4 w-full"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={fullName.lastName}
              onChange={(e) =>
                setFullName({ ...fullName, lastName: e.target.value })
              }
              name="lastName"
              className="txt-field-primary block mt-2  w-full"
            />
            <label required className="block mt-4">
              Date of Birth
            </label>
            <div className="flex justify-between w-full mt-4">
              <DateSelector
                day={dateOfBirth.day}
                setDay={(day) => setDateOfBirth({ ...dateOfBirth, day })}
                month={dateOfBirth.month}
                setMonth={(month) => setDateOfBirth({ ...dateOfBirth, month })}
                year={dateOfBirth.year}
                setYear={(year) => setDateOfBirth({ ...dateOfBirth, year })}
              />
            </div>
            <label required className="block mt-4">
              Personal Info
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="txt-field-primary block mt-4 w-full mb-4"
            />
            <PhoneInput
              placeholder="Phone Number"
              value={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onCountryCodeChange={handleCountryCodeChange}
            />
          </div>
        )}
        <div className="flex w-full justify-center items-center mt-4 gap-3 flex-col md:flex-row ">
          <button
            className={`order-last md:order-first w-[250px] h-[50px] outline outline-1 outline-gray-300 rounded-lg font-bold`}
            onClick={() => {}}
          >
            Cancel
          </button>
          {isRequest ? (
            <button
              type="button"
              className={`w-[250px] h-[50px] rounded-lg font-semibold text-white bg-primary`}
              onClick={handleSignatureSave}
            >
              Send request
            </button>
          ) : (
              (credentials.company)?
              <button
                type="button"
                className={`w-full md:w-[335px] h-[86px] rounded-lg outline outline-1 outline-gray-300`}
                onClick={() => setIsSignatureOpen(true)}
              >
                <div className="flex h-full">
                {credentials.selected == "user"?
                    <div className="w-[107px]">
                      <div className="flex flex-col justify-center items-center h-[57px] w-full bg-primary bg-opacity-20">
                        <img src={credentials.user.image} className="w-[27px] h-[27px] rounded-full object-cover"></img>
                        <p className="text-xs">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</p>
                      </div>
                      {credentials.company &&
                        <div className="flex flex-col justify-center items-center w-full h-[29px]">
                          <p className="text-[8px]">{credentials.company.companyName}</p>
                        </div>
                      }
                      
                    </div>:
                    <div className="w-[107px]">
                      <div className="flex flex-col justify-center items-center w-full h-[29px]">
                        <p className="text-[8px]">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</p>
                      </div>
                      <div className="flex flex-col justify-center items-center h-[57px] w-full bg-primary bg-opacity-20">
                        <img src={credentials.company.image} className="w-[27px] h-[27px] rounded-full object-cover"></img>
                        <p className="text-xs">{credentials.company.companyName}</p>
                      </div>
                    </div>
                }
                  <div className="flex w-full text-center h-full bg-primary rounded-r-lg items-center justify-center text-md font-bold text-white">
                    Sign Now
                  </div>
                </div>
              </button>:
              <button
                type="button"
                className={`w-[250px] h-[50px] rounded-lg font-semibold text-white bg-primary`}
                onClick={handleSignatureSave}
              >
                Sign Now
              </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PackageCollectionRequest;
