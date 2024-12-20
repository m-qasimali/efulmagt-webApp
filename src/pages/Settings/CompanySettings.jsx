import { useEffect, useState } from "react"
import SettingsInput from "../../components/UIElements/inputs/SettingsInput"
import SettingsEmailInput from "../../components/UIElements/inputs/SettingsEmailInput"
import SettingsPhoneInput from "../../components/UIElements/inputs/SettingsPhoneInput"
import { useCredentials } from "../../context/CrendentialsContext"
import { updateCompanyEmail, updateCompanyPhoneNumber } from "../../services/company.services"
import { sendOTP } from "../../services/authentication.services"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"


export default function CompanySettings(){
    const {t} = useTranslation();
    const user = {
        "imageUrl": "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6"
    }
    const [credentials, setCredentials] = useCredentials();
    const[emailEncryptedOtpToken, setEmailEncryptedOtpToken] = useState(null);
    const[phoneEncryptedOtpToken, setPhoneEncryptedOtpToken] = useState(null);
    useEffect(()=>{
        console.log(credentials.company);
        setCompany(
            {
                "cvr": credentials.company.cvr,
                "companyName": credentials.company.companyName,
                "email":credentials.company.email, 
                "phone":credentials.company.phone.countryCode + "-" +credentials.company.phone.number,
                "address": credentials.company.address.address + ", " +  credentials.company.address.city
            }
        )
    }, [])
    const [company, setCompany] = useState({
        "cvr": "",
        "companyName": "",
        "email": "",
        "phone": "",
        "address": ""
    })
    //Concept of Currying
    const fieldHandler = (field)=>{
        return (value)=>{
            let newCompany = {...company};
            newCompany[field] = value;
            setCompany(newCompany)
        }
    }
    const changeCVR = (value)=>{
        //Implement Logic of Changing CVR here//
        console.log(value)
    }
    const changeName = (value)=>{
        //Implement Logic of Changing Name here//
        console.log(value);
    }
    const sendOTPToEMail = async (value)=>{
        let response = await sendOTP({
            email: value
        })
        setEmailEncryptedOtpToken(response.data.data.encryptedOTPToken);
    }
    const verifyEmailOTP = async (otp)=>{
        let response = await updateCompanyEmail(credentials.authToken, {encryptedOTPToken:emailEncryptedOtpToken, otp})
        console.log(response);
        setCredentials(oldValue => {
            return {
                ...oldValue,
                user: response.data.data.updatedUser
            }
        })
    }
    const sendOTPToPhone = async (value)=>{
        let countryCode = value.split("-")[0];
        let number = value.split("-")[1];
        let response = await sendOTP({
            phone: {
                countryCode,
                number
            }
        })
        setPhoneEncryptedOtpToken(response.data.data.encryptedOTPToken);
    }
    const verifyPhoneOTP = async (otp)=>{
        let response = await updateCompanyPhoneNumber(credentials.authToken, {encryptedOTPToken:phoneEncryptedOtpToken, otp})

        setCredentials(oldValue => {
            return {
                ...oldValue,
                user: response.data.data.updatedUser
            }
        })
    }
    return(
    <div className="flex flex-col w-full items-center justify-center">
        {/* <p className="text-md text-gray-500 font-bold">{t("Profile Picture")}</p> */}
        {/* <img src={user.imageUrl} className="w-[163px] h-[163px] rounded-full"></img> */}
        <div className="w-full md:w-[400px]">
            <div>
                <p className="text-md font-bold mt-4 mb-2">
                    {t("CVR")}
                </p>
                <SettingsInput disabled input={company.cvr} type={"text"} setInput={fieldHandler("cvr")} updateFunction={changeCVR}/>
                <p className="text-md font-bold mt-4 mb-2">
                    {t("Company Name")}
                </p>
                <SettingsInput disabled input={company.companyName} type={"text"} setInput={fieldHandler("companyName")} updateFunction={changeName}/>
                <p className="text-md font-bold mt-4 mb-2">
                    {t("Email")}
                </p>
                <SettingsEmailInput disabled input={company.email} type={"text"} setInput={fieldHandler("email")} sendOTPToEMail={sendOTPToEMail} verifyOTP={verifyEmailOTP}/>
                <p className="text-md font-bold mt-4 mb-2">
                    {t("Phone")}
                </p>
                <SettingsPhoneInput disabled  input={company.phone} setInput={fieldHandler("phone")} sendOTPToPhone={sendOTPToPhone} verifyOTP={verifyPhoneOTP}/>
                <p className="text-md font-bold mt-4 mb-2">
                    {t("Address")}
                </p>
                <div className="flex relative w-full h-[54px] px-2 border border-solid items-center rounded-lg">
                    <div className="text-base font-bold">{company.address}</div>
                    <Link
                    to="/settings/address"
                    className={`absolute right-4 top-[18px] text-sm underline hover:cursor-pointer text-secondary font-semibold`}>
                        {t("Change")}
                    </Link>
                </div>
            </div>
        </div>
    </div>
    )
}