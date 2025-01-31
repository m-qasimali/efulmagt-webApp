import { useEffect, useState } from "react";
import SettingsInput from "../../components/UIElements/inputs/SettingsInput";
import SettingsEmailInput from "../../components/UIElements/inputs/SettingsEmailInput";
import SettingsPhoneInput from "../../components/UIElements/inputs/SettingsPhoneInput";
import AddressChange from "../../components/UIElements/settings/AddressChange";
import { useCredentials } from "../../context/CrendentialsContext";
import { updateProfileImage, updateUserInfo } from "../../services/user.services";
import {
  sendOTP,
  updateEmail,
  updatePhoneNumber,
} from "../../services/authentication.services";
import ProfileImageInput from "../../components/UIElements/inputs/ProfileImageInput";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function UserSettings() {
  const [credentials, setCredentials] = useCredentials();
  console.log(credentials);
  
  const [emailEncryptedOtpToken, setEmailEncryptedOtpToken] = useState(null);
  const [phoneEncryptedOtpToken, setPhoneEncryptedOtpToken] = useState(null);
  useEffect(() => {
    setUser({
      firstName: credentials.user.name.firstName,
      lastName: credentials.user.name.lastName,
      email: credentials.user.email, 
      phoneNumber:
        credentials.user.phone.countryCode +
        "-" +
        credentials.user.phone.number,
      address:
        credentials.user.address.address + ", " + credentials.user.address.city,
      image: credentials.user.image,
    });
  }, [credentials]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    imageUrl: "",
  });
  //Concept of Currying
  const fieldHandler = (field) => {
    return (value) => {
      let newUser = { ...user };
      newUser[field] = value;
      setUser(newUser);
    };
  };
  const changeFirstName = async (value) => {
    let response = await updateUserInfo(credentials.authToken, {
      name: {
        firstName: value,
        lastName: credentials.user.name.lastName,
      },
    });
    console.log(response);
    

    setCredentials((oldValue) => {
      return {
        ...oldValue,
        user: response.data.data.user,
      };
    });
  };
  const changeLastName = async (value) => {
    let response = await updateUserInfo(credentials.authToken, {
      name: {
        firstName: credentials.user.name.firstName,
        lastName: value,
      },
    });

    setCredentials((oldValue) => {
      return {
        ...oldValue,
        user: response.data.data.user,
      };
    });
  };
  const sendOTPToEMail = async (value) => {
    let response = await sendOTP({
      email: value,
    });
    setEmailEncryptedOtpToken(response.data.data.encryptedOTPToken);
  };
  const verifyEmailOTP = async (otp) => {
    let response = await updateEmail(credentials.authToken, {
      encryptedOTPToken: emailEncryptedOtpToken,
      otp,
    });

    setCredentials((oldValue) => {
      return {
        ...oldValue,
        user: response.data.data.user,
      };
    });
  };
  const sendOTPToPhone = async (value) => {
    let countryCode = value.split("-")[0];
    let number = value.split("-")[1];
    let response = await sendOTP({
      phone: {
        countryCode,
        number,
      },
    });
    let phoneMessage = response.data.data.body;
    alert("As Phone API not Tested, " + phoneMessage);
    setPhoneEncryptedOtpToken(response.data.data.encryptedOTPToken);
  };
  const verifyPhoneOTP = async (otp) => {
    let response = await updatePhoneNumber(credentials.authToken, {
      encryptedOTPToken: phoneEncryptedOtpToken,
      otp,
    });

    setCredentials((oldValue) => {
      return {
        ...oldValue,
        user: response.data.data.user,
      };
    });
  };

  const handleProfileImageChange = (e)=>{
    if(e.target.files && e.target.files[0])
    {
      let formData = new FormData();
      formData.append("profileImage", e.target.files[0]);

      updateProfileImage(credentials.authToken, formData).then((res)=>{
        setCredentials((oldValue)=>{
          return {
            ...oldValue,
            user: {
              ...oldValue.user,
              image: res.data.data.profileImage
            }
          }
        })
      }).catch((err)=>{
        toast.error("An Error occurred while uploading the image")
      })
    }
  }
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <p className="text-md text-gray-500 font-bold">Profile Picture</p>
      <ProfileImageInput image={user.image} handleFileChange={handleProfileImageChange}/>
      <div className="w-full md:w-[400px]">
        <div>
          <p className="text-md font-bold mt-4 mb-2">First Name</p>
          <SettingsInput
            input={user.firstName}
            type={"text"}
            setInput={fieldHandler("firstName")}
            updateFunction={changeFirstName}
          />
          <p className="text-md font-bold mt-4 mb-2">Last Name</p>
          <SettingsInput
            input={user.lastName}
            type={"text"}
            setInput={fieldHandler("lastName")}
            updateFunction={changeLastName}
          />
          <p className="text-md font-bold mt-4 mb-2">Email</p>
          <SettingsEmailInput
            input={user.email}
            type={"text"}
            setInput={fieldHandler("email")}
            sendOTPToEMail={sendOTPToEMail}
            verifyOTP={verifyEmailOTP}
          />
          <p className="text-md font-bold mt-4 mb-2">Phone</p>
          <SettingsPhoneInput
            input={user.phoneNumber}
            setInput={fieldHandler("phoneNumber")}
            sendOTPToPhone={sendOTPToPhone}
            verifyOTP={verifyPhoneOTP}
          />
          <p className="text-md font-bold mt-4 mb-2">Address</p>
          <div className="hidden md:flex relative w-full h-[54px] px-2 border border-solid items-center rounded-lg">
            <div className="text-base font-bold">{user.address}</div>
            <Link
              to="/settings/address"
              className={`absolute right-4 top-[18px] text-sm underline hover:cursor-pointer text-secondary font-semibold`}
            >
              Change
            </Link>
          </div>
          <AddressChange className="md:hidden" address={user.address} />
        </div>
      </div>
    </div>
  );
}
