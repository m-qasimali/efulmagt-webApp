import { useEffect, useRef, useState } from "react"
import OTPInput from "./OTPInput";
import { useCountries } from "use-react-countries";
import CloseSVG from "../../../assets/icons/close.svg?react"
import { toast } from "react-toastify";

function PhoneInput({phoneNumber, setPhoneNumber, disabled=false}){
    const { countries } = useCountries()
    const [postalCode, setPostalCode] = useState(phoneNumber.split("-")[0] || "");
    const [number, setNumber] = useState(phoneNumber.split("-")[1] || "");
    useEffect(()=>{
        setPostalCode(phoneNumber.split("-")[0] || "")
        setNumber(phoneNumber.split("-")[1] || "")
    },[phoneNumber])
    const handlePostalCodeChange = (newPostalCode)=>{
        setPostalCode(newPostalCode);
        setPhoneNumber(newPostalCode+"-"+number)
    }
    const handleNumberChange = (newNumber)=>{
        setNumber(newNumber);
        setPhoneNumber(postalCode+"-"+newNumber)
    }
    return(
        <div className="flex p-1 border rounded-lg text-base inline">
            <select value={postalCode} onChange={(e)=>{
                handlePostalCodeChange(e.target.value);
            }} disabled={disabled} className="pr-0 border-y-0 border-l-0 focus:border-black focus:outline-none focus:ring-0 text-base border-black">
                {
                    countries.filter(({countryCallingCode})=>countryCallingCode.length<=4).map(({countryCallingCode, flags})=>{
                       return <option value={countryCallingCode}>{countryCallingCode} 
                       {/* <object
                       type="image/svg+xml"
                       data="https://flagcdn.com/ke.svg"
                       style={{ width: '20px', height: 'auto' }}
                        >
                        </object> */}
                     </option>
                    })
                }
            </select>
            <input
                value={number}
                disabled={disabled}
                onChange={(e)=>{
                    handleNumberChange(e.target.value);
                }}
                type="text"
                className='border-0 w-full focus:border-0 focus:outline-none focus:ring-0 text-base'
            />
        </div>
    )
}


export default function SettingsPhoneInput({input, disabled=false, type="number", placeholder="", setInput, className="", sendOTPToPhone, verifyOTP}){
    const [update, setUpdate] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""))
    const [prevInput, setPrevInput] = useState("");
    const handleOTPToPhone = ()=>{
        sendOTPToPhone(input);
        setOtpSent(true);
    }
    const handleVerifyOTP = async ()=>{
        setOtpSent(false);
        setUpdate(false);
        await verifyOTP(otp.join(""))
    }
    const textInputRef = useRef(null);
    return(
        <div className={"relative" + className}>
            <p className={`my-1 ${update?"":"hidden"}`}>
                We will send you phone to verify  your new phone 
                address.
            </p>
            {/* <input
                type={type}
                value={input}
                ref={textInputRef}
                onChange={(e)=>{
                    setInput(e.target.value)
                }}
                className={`h-[54px] rounded-lg w-full text-base`}
                
                disabled={!(update && !otpSent)}
                placeholder={placeholder}
            /> */}
            <PhoneInput phoneNumber={input} setPhoneNumber={setInput} disabled={!(update && !otpSent)}/>
            <p 
            onClick={()=>{
                setUpdate(true);
                console.log(input);
                setPrevInput(input);
            }}
            className={`absolute right-4 top-[18px] text-sm underline hover:cursor-pointer text-secondary font-semibold ${update || disabled?"hidden":""}`}
            >
                Change
            </p>
            
            <div className={`flex w-full space-x-2 justify-between my-4 ${update && !otpSent?"hidden md:flex":"hidden"}`}>
                <button className="h-[46px] w-1/2 text-base font-bold text-black bg-[#F3F3F3] rounded-lg border border-solid"
                onClick={()=>{
                    setUpdate(false);
                    console.log(prevInput);
                    setInput(prevInput);
                }}>Decline</button>
                <button 
                onClick={()=>{
                    handleOTPToPhone();
                }}
                className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Update</button>
            </div>
            <div className={`w-full my-4 ${otpSent?"hidden md:block":"hidden"}`}>
                <p>
                    Please type the 4-digit number we have sent you on Phone to verify your new Phone.
                </p>
                <div className="flex flex-col w-full justify-center items-center">
                    <OTPInput otp={otp} setOtp={setOtp}/>
                    <button 
                    onClick={()=>{
                        handleVerifyOTP().catch((err)=>{
                            console.log(err);
                            toast.error(err.response.data.message || err.message);
                            setInput(prevInput);
                        });
                    }}
                    className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Save</button>
                </div>
            </div>
            {
                update && (
                <div className='z-[40] md:hidden fixed top-0 left-0 h-screen w-screen'>
                    <div className='flex flex-col justify-end h-full'>
                    <div className='w-full h-full bg-white bg-opacity-40'
                    onClick={()=>{setUpdate(false); setOtpSent(false); setInput(prevInput)}}>
                        {/* Giving White Space */}
                    </div>
                    <div className="py-8 w-full border border-solid bg-white rounded-t-[30px]">
                        <div className='relative'>
                        <div className='absolute top-2 left-4 hover:cursor-pointer'
                            onClick={()=>{setUpdate(false);  setOtpSent(false); setInput(prevInput)}}
                        >
                            <CloseSVG/>
                        </div>
                        <div className="text-center m-3 mx-6 space-y-5">
                            <div className='text-md font-semibold'>Update Email</div>
                            <p className={`my-1 ${update && !otpSent?"":"hidden"}`}>
                                We will send you phone to verify  your new phone 
                                address.
                            </p>
                            <PhoneInput phoneNumber={input} setPhoneNumber={setInput} disabled={!(update && !otpSent)}/>
                            <div className={`flex w-full space-x-2 justify-between my-4 ${update && !otpSent?"":"hidden"}`}>
                                <button className="h-[46px] w-1/2 text-base font-bold text-black bg-[#F3F3F3] rounded-lg border border-solid"
                                onClick={()=>{
                                    setUpdate(false);
                                    setInput(prevInput);
                                }}>Decline</button>
                                <button 
                                onClick={()=>{
                                    handleOTPToPhone();
                                }}
                                className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Update</button>
                            </div>
                            <div className={`w-full my-4 ${otpSent?"":"hidden"}`}>
                                <p>
                                    Please type the 4-digit number we have sent you on Email to verify your new Email.
                                </p>
                                <div className="flex flex-col w-full justify-center items-center">
                                    <OTPInput otp={otp} setOtp={setOtp}/>
                                    <button 
                                    onClick={()=>{
                                        handleVerifyOTP().catch((err)=>{
                                            console.log(err);
                                            toast.error(err.response.data.message || err.message);
                                            setInput(prevInput);
                                        });
                                    }}
                                    className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Save</button>
                                </div>
                            </div>
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