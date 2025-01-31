import React from "react";
import CustomInput from "../../../components/UIElements/inputs/CustomInput";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/authentication.services";

const UserForm = ({className, emailCredentialsToken, phoneCredentialsToken}) => {
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    //let nameList = e.target.name.value.split(" ");
    let reqBody = {
      emailCredentialsToken: emailCredentialsToken,
      phoneCredentialsToken: phoneCredentialsToken,
      name: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value
      },
      address:{
        address: e.target.address.value,
        addressLine: e.target.addressLine.value,
        postalCode: e.target.postalCode.value,
        city: e.target.city.value,
        country: e.target.country.value
      },
      dateOfBirth: e.target.dateOfBirth.value
    }
console.log(reqBody);

   let res = await registerUser(reqBody);
    
   // Send Request and at this point your account will be created, you will be returned with a jwt for creating password
    let createPasswordToken = res.data.data.createPasswordToken;

    navigate('/create-passcode', {state:{createPasswordToken}})
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
        <label className="block text-md font-semibold">First Name</label>
        <input
            className="mt-2 w-full txt-field-primary"
            name="firstName"
            required
            placeholder="Enter Your First Name"
        />
        <label className="block text-md font-semibold">Last Name</label>
        <input
            className="mt-2 w-full txt-field-primary"
            name="lastName"
            required
            placeholder="Enter Your Last Name"
        />
        <label className="block text-md font-semibold mt-6">Address</label>
        <CustomInput name="address" required={true} header={"Address"} width="120" className="mt-2 w-full"/>
        <CustomInput name="addressLine" required={true} header={"Address Line"} width={120} className="mt-2 w-full"/>
        <CustomInput name="postalCode" required={true} header={"Postal Code"} width={120} className="mt-2 w-full"/>
        <CustomInput name="city" required={true} header={"City"} width={120} className="mt-2 w-full"/>
        <CustomInput name="country" required={true} header={"Country"} width={120} className="mt-2 w-full"/>
        
        <label className="block text-md font-semibold mt-6">Date of Birth</label>
        <input
            type="date" // Set input type to date
            className="mt-2 w-full txt-field-primary"
            name="dateOfBirth" // Name for the date of birth field
            required
        />
        
        <div className="flex justify-center">
            <button
            type="submit"
            className="w-[180px] mt-6 btn-primary"
            >
                Create Account
            </button>
        </div>
    </form>
  );
};

export default UserForm;
