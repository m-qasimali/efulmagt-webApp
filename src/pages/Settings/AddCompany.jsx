import { useState } from "react";
import CustomInput from "../../components/UIElements/inputs/CustomInput";
import PhoneInput from "../../components/UIElements/inputs/PhoneInput";
import CompanySearchBar from "../../components/UIElements/searchBars/CompanySearchBar";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { addCompany, assignCompany } from "../../services/company.services";
import { useCredentials } from "../../context/CrendentialsContext";
import { useNavigate } from "react-router-dom";


export default function AddCompany(){
    const [addMannually, setAddMannually] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useCredentials();
    const addCompanyHandle = (e)=>{
        e.preventDefault();
        let reqBody = {
            email: e.target.email.value,
            phone: {
                countryCode: e.target.countryCode.value,
                number: e.target.phoneNumber.value
            },
            cvr: e.target.cvr.value,
            companyName: e.target.companyName.value,
            address: {
                "address":e.target.address.value,
                "addressLine":e.target.addressLine.value,
                "postalCode":e.target.postalCode.value,
                "city":e.target.city.value,
                "country":e.target.country.value
            }
        }
        addCompany(credentials.authToken, reqBody).then((res)=>{
            // console.log(res);
            navigate("/home")
        }).catch((err)=>{
            toast.error(err.response.data.message|| "something went wrong while adding company");
        })

    }
    const assignCompanyHandle=(e)=>{
        let companyId = company._id;
        assignCompany(credentials.authToken, companyId).then((res)=>{
            // console.log(res);
            navigate("/settings")
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message || "something went wrong while assigning company")
        })
        //Call Assign Company End Point
    }
    const [company, setCompany] = useState(null);
    return(
        <div className="flex flex-col items-center">
            {
                !addMannually && (
                    <div className="flex flex-col w-full md:w-3/5 lg:w-2/5 space-y-5 items-center">   
                        <CompanySearchBar className={"w-4/5"} setSelectedCompany={setCompany}/>
                        <button className="w-[200px] btn-primary" onClick={()=>{
                            if(!company)
                                return toast.error("Please select a company first");
                            assignCompanyHandle();
                        }}>Continue</button>
                        <hr className="w-full"></hr>
                        <div 
                        className="w-4/5 flex items-center justify-center text-md font-bold h-[100px] border-2 border-dashed rounded-lg hover:cursor-pointer"
                        onClick={
                            ()=>{setAddMannually(true)}
                        }>
                            Add Company Mannually
                        </div>
                    </div>
                )
            }
            {
                addMannually && (
                <form className="flex flex-col w-full md:w-3/5 lg:w-2/5  space-y-4" onSubmit={addCompanyHandle}>
                    <p className="text-lg font-bold">{t("Company")}</p>
                    <CustomInput header={t("CVR")} type= {"text"} width={120} placeholder= {"Enter First Name"} name={"cvr"} required={true}/>
                    <CustomInput header={t("Company Name")} type= {"text"} width={120} placeholder= {"Enter Last Name"}  name={"companyName"} required={true}/>
                    <CustomInput header={t("Address")} type= {"text"} width={120} placeholder= {"Enter Your Address"}  name={"address"} required={true}/>
                    <CustomInput header={t("Address Line")} type= {"text"} width={120} placeholder= {"Enter Address Line"}  name={"addressLine"} required={true}/>
                    <CustomInput header={t("Postal Code")} type= {"number"} width={120}  placeholder= {"Enter Postal Code"}  name={"postalCode"} required={true}/>
                    <CustomInput header={t("City")} type= {"text"} width={120}  placeholder= {"Enter City"}  name={"city"} required={true}/>
                    <CustomInput header={t("Country")} type= {"text"}  width={120} placeholder= {"Enter Country"} name={"country"} required={true}/>
                    <p className="text-lg font-bold">{t("Contact Details")}</p>
                    <p className="text-md font-bold">
                       { t("Email")}
                    </p>
                    <input type="email" name="email" required/>

                    <p  className="text-md font-bold">
                        {t("Contact Number")}
                    </p>
                    <PhoneInput/>
                    <div className="flex justify-center">
                        <button type="submit" 
                        className="btn-primary w-[200px]"
                        >{ t("Add Company")}</button>
                    </div>
                </form>
                )
            }
        </div>
    )
}