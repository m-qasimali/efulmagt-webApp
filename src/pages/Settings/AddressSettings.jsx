import { useEffect, useRef, useState } from "react"
import CustomInput from "../../components/UIElements/inputs/CustomInput";
import { useCredentials } from "../../context/CrendentialsContext";
import { updateCompanyInfo } from "../../services/company.services";
import { toast } from "react-toastify";
import { updateUserInfo } from "../../services/user.services";

export default function AddressSettings(){
    const [isCompany, setIsCompany] = useState(false);
    const userFormRef = useRef(null);
    const companyFormRef = useRef(null);
    const [credentials, setCredentials] = useCredentials();
    const handlePrivateSubmit = (e)=>{
        e.preventDefault()
        let userUpdateObject= {
            name: {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value
            },
            address: {
                address: e.target.address.value,
                addressLine: e.target.addressLine.value,
                postalCode: e.target.postalCode.value,
                city: e.target.city.value,
                country: e.target.country.value
            }
        }
        
        updateUserInfo(credentials.authToken, userUpdateObject).then((res)=>{
            let user = res.data.data.updatedUser;
            setCredentials((oldValues)=>{
                return {
                    ...oldValues,
                    user: user
                }
            })
            toast.success("User Information has been updated successfully");
        }).catch((err)=>{
            toast.error(err.response.data.message || "An error occured while updating company info");
        })
    }

    const handleCompanySubmit = (e)=>{
        e.preventDefault();
        let companyUpdateObject = {
            companyName: e.target.companyName.value,
            cvr: e.target.vatNumber.value,
            address: {
                address: e.target.address.value,
                addressLine: e.target.addressLine.value,
                postalCode: e.target.postalCode.value,
                city: e.target.city.value,
                country: e.target.country.value
            }
        }
        updateCompanyInfo(credentials.authToken, companyUpdateObject).then((res)=>{
            let company = res.data.data.company;
            setCredentials((oldValues)=>{
                return {
                    ...oldValues,
                    company: company
                }
            })
            toast.success("Company information has been updated successfully");
        }).catch((err)=>{
            toast.error(err.response.data.message || "An error occured while updating company info");
        })
    }
    useEffect(()=>{
        if(companyFormRef.current){
            companyFormRef.current.companyName.value = credentials.company.companyName;
            companyFormRef.current.vatNumber.value = credentials.company.cvr;
            // companyFormRef.current.att.value = "";
            companyFormRef.current.address.value = credentials.company.address.address;
            companyFormRef.current.addressLine.value = credentials.company.address.addressLine;
            companyFormRef.current.postalCode.value = credentials.company.address.postalCode;
            companyFormRef.current.city.value = credentials.company.address.city;
            companyFormRef.current.country.value = credentials.company.address.country;
        }
        if(userFormRef.current){
            userFormRef.current.firstName.value = credentials.user.name.firstName;
            userFormRef.current.lastName.value = credentials.user.name.lastName;
            userFormRef.current.address.value = credentials.user.address.address;
            userFormRef.current.addressLine.value = credentials.user.address.addressLine;
            userFormRef.current.postalCode.value = credentials.user.address.postalCode;
            userFormRef.current.city.value = credentials.user.address.city;
            userFormRef.current.country.value = credentials.user.address.country;
        }
    },[credentials, isCompany])
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-4 rounded-full bg-[#246C89] p-1 w-max mx-auto">
                {
                isCompany?
                <button
                    className={`px-[40px] py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
                    onClick={() => {setIsCompany(false)}}
                >
                    Private
                </button>:
                <button
                    className={`px-[40px] py-3 rounded-full bg-white text-primary text-sm font-bold`}
                    onClick={() => {setIsCompany(false)}}
                >
                    Private
                </button>
                }
                {
                !isCompany?
                <button
                    className={`px-[40px] py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
                    onClick={() => {setIsCompany(true)}}
                >
                    Company
                </button>:
                <button
                    className={`px-[40px] py-3 rounded-full bg-white text-primary text-sm font-bold`}
                    onClick={() => {setIsCompany(true)}}
                >
                    Company
                </button>
                }
            </div>
            {
                (isCompany)?
                <form ref={companyFormRef} onSubmit={handleCompanySubmit} className="w-4/5 md:w-3/5 lg:w-2/5 space-y-2">
                    <CustomInput disabled header={"VAT Number"} type= {"number"} width={140} placeholder= {"Enter VAT Number"} name={"vatNumber"} required={true}/>
                    <CustomInput disabled header={"Company Name"} type= {"text"} width={140} placeholder= {"Enter Company Name"}  name={"companyName"} required={true}/>
                    {/* <CustomInput header={"Att."} type= {"text"} width={140} placeholder= {"Enter Your Address"}  name={"att"} required={true}/> */}
                    <CustomInput header={"Address"} type= {"text"} width={140} placeholder= {"Enter Address Line"}  name={"address"} required={true}/>
                    <CustomInput header={"Address Line"} type= {"text"} width={140} placeholder= {"Enter Address Line"}  name={"addressLine"} required={true}/>
                    <CustomInput header={"Postal Code"} type= {"number"} width={140}  placeholder= {"Enter Postal Code"}  name={"postalCode"} required={true}/>
                    <CustomInput header={"City"} type= {"text"} width={140}  placeholder= {"Enter City"}  name={"city"} required={true}/>
                    <CustomInput header={"Country"} type= {"text"}  width={140} placeholder= {"Enter Country"} name={"country"} required={true}/>

                    <div className="flex justify-center w-full">
                        <button
                        className="btn-primary w-3/5 md:w-2/5 h-[50px]"
                        type="submit"
                        >Save</button>
                    </div>
                </form>:
                <form ref = {userFormRef} onSubmit={handlePrivateSubmit} className="flex-col w-4/5 md:w-3/5 lg:w-2/5  space-y-2">
                    <CustomInput header={"First Name"} type= {"text"} width={120} placeholder= {"Enter First Name"} name={"firstName"} required={true}/>
                    <CustomInput header={"Last Name"} type= {"text"} width={120} placeholder= {"Enter Last Name"}  name={"lastName"} required={true}/>
                    <CustomInput header={"Address"} type= {"text"} width={120} placeholder= {"Enter Your Address"}  name={"address"} required={true}/>
                    <CustomInput header={"Address Line"} type= {"text"} width={120} placeholder= {"Enter Address Line"}  name={"addressLine"} required={true}/>
                    <CustomInput header={"Postal Code"} type= {"number"} width={120}  placeholder= {"Enter Postal Code"}  name={"postalCode"} required={true}/>
                    <CustomInput header={"City"} type= {"text"} width={120}  placeholder= {"Enter City"}  name={"city"} required={true}/>
                    <CustomInput header={"Country"} type= {"text"}  width={120} placeholder= {"Enter Country"} name={"country"} required={true}/>

                    <div className="flex justify-center w-full">
                        <button
                        className="btn-primary w-3/5 md:w-2/5 h-[50px]"
                        type="submit"
                        >Save</button>
                    </div>
                </form>
            }
            
        </div>
    )
}