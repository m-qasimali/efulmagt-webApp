import React, { useState, useContext, useEffect } from "react";
import logo from "../../assets/dashboard/logo.png";
import "reactjs-popup/dist/index.css";
import UserSearchBar from "../../components/UIElements/searchBars/UserSearchBar.jsx";
import DateSelector from "../../components/UIElements/dateSelectors/dateSelector.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "../../components/UIElements/inputs/PhoneInput.jsx";
import SignaturePopup from "../../components/UIElements/popups/SignaturePopup.jsx";
import axios from "axios";
import { useCredentials } from "../../context/CrendentialsContext.jsx";
import { toast } from "react-toastify";
import {
  createFuldmagt,
  requestFuldmagt,
  getFuldmagtSpecified,
} from "../../services/fuldmagt.services.js";
import Payment from "../../components/UIElements/popups/Payment.jsx";
import { handlePayment, verifyPayment } from "../../services/payment.service.js";

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
  const [additionalFormData, setAdditionalFormData] = useState([]);
  const [openedFuldmagt, setOpenedFulgmagt] = useState();
  const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const location = useLocation();
  const [paymentPopupOpen, setPaymentPopup] = useState(false);
  const [fuldmagtPrice, setFuldmagtPrice] = useState(null);

  const getASpecificFuldmagt = async () => {
    const res = await getFuldmagtSpecified(
      credentials.authToken,
      location.state.state.item.fuldmagtFormId
    );
    setOpenedFulgmagt(res.data.data.fuldmagtForm);
    setAdditionalFormData(location.state.state.item.additionalFieldsData);
    setIsRequest(true);
  };
  useEffect(() => {
    if (location.state && location.state.fuldmagt) {
      setFuldmagtPrice(location.state.fuldmagt.price);
      setOpenedFulgmagt(location.state.fuldmagt);
    } else if (location.state.state.item) {
      getASpecificFuldmagt();
    }
  }, [location]);

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setChooseMannually(false);
  };

  const handleSignatureSave = async (signature) => {
    setSignatureData(signature);

    let expiry = null;
    let currentDate = new Date();
    if (!chooseDate) {
      expiry = new Date(currentDate.getTime() + defaultHours * 60 * 60 * 1000);
    } else {
      expiry = new Date(expiryDate);
    }

    if (expiry < new Date()) {
      toast.error("Expiry Date must be greater than issue date");
      return;
    }

    if (additionalFormData.length !== openedFuldmagt.additionalFields.length) {
      toast.error("Fill all form fields!");
      return;
    }

    if (!isRequest) {
      setIsSignatureOpen(true);
    }
    const formattedExpiry = expiry.toISOString().replace(/\.\d{3}Z$/, "+0000");

    let user = null;
    if (isChooseMannually) {
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

    if (!user) {
      toast.error("User not selected");
      return;
    }

    const formData = new FormData();
    let body = {};

    if (!isRequest) {
      // user selected from dropdown
      // formData.append("fuldmagtFormId", openedFuldmagt._id);
      // formData.append("accountType", credentials.selected);
      // formData.append("expiry", formattedExpiry);
      // formData.append("fuldmagtGiverSignature", signature);
      body = {
        fuldmagtFormId: openedFuldmagt._id,
        accountType: credentials.selected,
        expiry: formattedExpiry,
        fuldmagtGiverSignature: signature,
        additionalFieldsData: additionalFormData,
        agentId: isChooseMannually ? "" : selectedUser._id,
      };

      // custom user selected for send request
      if (isChooseMannually) {
        body = {
          ...body,
          agentName: user.fullName,
          agentDOB: user.dateOfBirth,
          agentEmail: user.email,
          agentCountryCode: user.countryCode,
          agentPhoneNumber: user.phoneNumber,
        };
      } else {
        formData.append("agentId", user._id || "");
      }
    } else {
      // formData.append("fuldmagtFormId", openedFuldmagt._id);
      // formData.append("accountType", "user");
      // formData.append("expiry", formattedExpiry);
      // formData.append("fuldmagtGiverId", "")
      body = {
        fuldmagtFormId: openedFuldmagt._id,
        accountType: credentials.selected,
        expiry: formattedExpiry,
        fuldmagtGiverId: selectedUser._id,
        additionalFieldsData: additionalFormData,
      };

      if (isChooseMannually) {
        formData.append("fuldmagtGiverName", user.fullName);
        formData.append("fuldmagtGiverDOB", user.dateOfBirth);
        formData.append("fuldmagtGiverEmail", user.email);
        formData.append("fuldmagtGiverPhoneNumber", user.phoneNumber);
        formData.append("fuldmagtGiverCountryCode", user.countryCode);
        body = {
          ...body,
          fuldmagtGiverName: user.fullName,
          fuldmagtGiverDOB: user.dateOfBirth,
          fuldmagtGiverEmail: user.email,
          fuldmagtGiverPhoneNumber: user.countryCode,
          fuldmagtGiverCountryCode: user.phoneNumber,
        };
      } else {
        formData.append("fuldmagtGiverId", user._id || "");
      }
    }
    formData.append("additionalFieldsData", JSON.stringify(additionalFormData));
    try {
      let response = null;
      if (!isRequest) {
        response = await createFuldmagt(credentials.authToken, body);
      } else {
        response = await requestFuldmagt(credentials.authToken, body);
      }
      localStorage.removeItem("paymentUrl");
      localStorage.removeItem("orderId")
      toast.success(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  const handlePayments = async (amount, currency) => {
    setPaymentPopup(false);

    // const orderId = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

    // try {
    //   const response = await axios.post("http://localhost:3000/create-quickpay-link", {
    //     orderId,
    //     amount: amount * 100,
    //     currency
    //   });

    //   // Open the payment URL in a new tab
    //   if (response.data.paymentUrl) {
    //     window.open(response.data.paymentUrl, '_blank');

    //     setIsSignatureOpen(true)
    //   }
    // } catch (error) {
    //   console.error("Payment link creation failed:", error);
    //   toast.error("Failed to create payment link");
    // }
    let success, paymentStaus;
    if (!orderId){
      success = handlePayment(fuldmagtPrice, currency);
    }
    
  };

  const onCancel = () => {
    setPaymentPopup(false);
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <SignaturePopup
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onSave={handleSignatureSave}
        selectedUser={credentials}
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
      <div className="w-full flex justify-center">
        {openedFuldmagt && (
          <div className="w-full lg:w-[50%] md:w-[75%] rounded-md shadow-lg p-4 space-y-3 border border-black border-opacity-15 mb-5">
            <p className="text-2xl font-bold">{openedFuldmagt.title}</p>
            {openedFuldmagt.additionalFields.map((field, index) => (
              <>
                <p className="text-lg font-bold">{field}</p>
                {openedFuldmagt.additionalFieldsType[index] === "date" ? (
                  <>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="w-full"
                      onChange={(e) => {
                        const updatedFormData = [...additionalFormData];
                        updatedFormData[index] = new Date(
                          e.target.value
                        ).toISOString();
                        setAdditionalFormData(updatedFormData);
                      }}
                    />
                  </>
                ) : (
                  <>
                    {openedFuldmagt.additionalFieldsType[index] ===
                    "radioButtons" ? (
                      <div className="flex w-full justify-between">
                        {openedFuldmagt.additionalFieldsObject[
                          index
                        ].options.map((obj) => (
                          <div className="space-x-3">
                            <input
                              type="radio"
                              name={
                                openedFuldmagt.additionalFieldsObject[index]
                                  .heading
                              }
                              value={obj}
                              onChange={(e) => {
                                const updatedFormData = [...additionalFormData];
                                updatedFormData[index] = e.target.value;
                                setAdditionalFormData(updatedFormData);
                              }}
                            />
                            <label>{obj}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {openedFuldmagt.additionalFieldsType[index] ===
                        "checkBoxes" ? (
                          <>
                            <div className="flex w-full justify-between">
                              {openedFuldmagt.additionalFieldsObject[
                                index
                              ].options.map((obj, optionIndex) => (
                                <div className="space-x-3" key={optionIndex}>
                                  <input
                                    type="checkbox"
                                    value={obj}
                                    onChange={(e) => {
                                      const updatedFormData = [
                                        ...additionalFormData,
                                      ];
                                      if (e.target.checked) {
                                        updatedFormData[index] = [
                                          ...(updatedFormData[index] || []),
                                          e.target.value,
                                        ];
                                      } else {
                                        updatedFormData[index] =
                                          updatedFormData[index].filter(
                                            (item) => item !== e.target.value
                                          );
                                      }
                                      setAdditionalFormData(updatedFormData);
                                    }}
                                  />
                                  <label>{obj}</label>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            {openedFuldmagt.additionalFieldsType[index] ===
                            "textArea" ? (
                              <>
                                <textarea
                                  className="resize-none w-full"
                                  rows={5}
                                  name=""
                                  id=""
                                  placeholder={
                                    openedFuldmagt.additionalFieldsObject[index]
                                      .placeholder
                                      ? openedFuldmagt.additionalFieldsObject[
                                          index
                                        ].placeholder
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const updatedFormData = [
                                      ...additionalFormData,
                                    ];
                                    updatedFormData[index] = e.target.value;
                                    setAdditionalFormData(updatedFormData);
                                  }}
                                ></textarea>
                              </>
                            ) : (
                              <>
                                <input
                                  className="w-full"
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder={
                                    openedFuldmagt.additionalFieldsObject[index]
                                      .placeholder
                                      ? openedFuldmagt.additionalFieldsObject[
                                          index
                                        ].placeholder
                                      : ""
                                  }
                                  value={additionalFormData[index] || ""}
                                  onChange={(e) => {
                                    const updatedFormData = [
                                      ...additionalFormData,
                                    ];
                                    updatedFormData[index] = e.target.value;
                                    setAdditionalFormData(updatedFormData);
                                  }}
                                />
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg  font-semibold">
        Who will pickup the package for you?
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center w-full justify-around rounded-full p-1 outline-none">
        <UserSearchBar
          className="w-full p-3 outline-none"
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
          ) : credentials.company ? (
            <button
              type="button"
              className={`w-full md:w-[335px] h-[86px] rounded-lg outline outline-1 outline-gray-300`}
              onClick={async() => {
                const paymentUrl = localStorage.getItem("paymentUrl");
                const orderId = localStorage.getItem("orderId");

                if (paymentUrl) {
                  const paid = await verifyPayment(orderId);
                  if (paid.status === "Paid"){
                    setIsSignatureOpen(true)
                  }
                  else if (paid.status == "Pending"){
                    window.open(localStorage.getItem("paymentUrl"), "_blank")
                  }
                  // if (paid?.status != "Paid"){
                  //   window.open(paymentUrl, '_blank');
                  // }
                  // else {
                  //   setIsSignatureOpen(true);
                  // }
                }
                else {
                  setPaymentPopup(true);
                }
              }}
            >
              <div className="flex h-full">
                {credentials.selected == "user" ? (
                  <div className="w-[107px]">
                    <div className="flex flex-col justify-center items-center h-[57px] w-full bg-primary bg-opacity-20">
                      <img
                        src={credentials.user.image}
                        className="w-[27px] h-[27px] rounded-full object-cover"
                      ></img>
                      <p className="text-xs">
                        {credentials.user.name.firstName +
                          " " +
                          credentials.user.name.lastName}
                      </p>
                    </div>
                    {credentials.company && (
                      <div className="flex flex-col justify-center items-center w-full h-[29px]">
                        <p className="text-[8px]">
                          {credentials.company.companyName}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[107px]">
                    <div className="flex flex-col justify-center items-center w-full h-[29px]">
                      <p className="text-[8px]">
                        {credentials.user.name.firstName +
                          " " +
                          credentials.user.name.lastName}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center h-[57px] w-full bg-primary bg-opacity-20">
                      <img
                        src={credentials.company.image}
                        className="w-[27px] h-[27px] rounded-full object-cover"
                      ></img>
                      <p className="text-xs">
                        {credentials.company.companyName}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex w-full text-center h-full bg-primary rounded-r-lg items-center justify-center text-md font-bold text-white">
                  Sign Now
                </div>
              </div>
            </button>
          ) : (
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
      <Payment isOpen={paymentPopupOpen} onClose={handlePayments} onCancel={onCancel}/>
    </div>
  );
};

export default PackageCollectionRequest;
