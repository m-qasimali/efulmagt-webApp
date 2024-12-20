import { useRef, useState } from "react"
import CloseSVG from "../../../assets/icons/close.svg?react"
import { toast } from "react-toastify";

export default function SettingsInput({input, disabled=false, setInput, type="text", placeholder="", updateFunction, className=""}){
    const [update, setUpdate] = useState(false);
    const [prevInput, setPrevInput] = useState("");
    const textInputRef = useRef(null);
    return(
        <div className={"relative" + className}>
            <input
                type={type}
                value={input}
                ref={textInputRef}
                onChange={(e)=>{
                    setInput(e.target.value)
                }}
                className={`h-[54px] rounded-lg w-full text-base`}
                
                disabled={!update}
                placeholder={placeholder}
            />
            <p 
            onClick={()=>{
                setUpdate(true);
                setPrevInput(input);
            }}
            className={`absolute right-4 top-[18px] text-sm underline hover:cursor-pointer text-secondary font-semibold ${update || disabled ?"hidden":""}`}
            >
                Change
            </p>
            
            <div className={`flex w-full space-x-2 justify-between my-4 ${update?"hidden md:flex":"hidden"}`}>
                <button className="h-[46px] w-1/2 text-base font-bold text-black bg-[#F3F3F3] rounded-lg border border-solid"
                onClick={()=>{
                    setInput(prevInput);
                    setUpdate(false);
                }}>Decline</button>
                <button 
                onClick={()=>{
                    setUpdate(false);
                    updateFunction(textInputRef.current.value).catch((err)=>{
                        toast.error(err.response.data.message || err.message);
                        setInput(prevInput);
                    });
                }}
                className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Update</button>
            </div>
            
            {
                update && (
                <div className='z-[40] md:hidden fixed top-0 left-0 h-screen w-screen'>
                    <div className='flex flex-col justify-end h-full'>
                    <div className='w-full h-full bg-white bg-opacity-40'
                    onClick={()=>{setUpdate(false); setInput(prevInput)}}>
                        {/* Giving White Space */}
                    </div>
                    <div className="py-8 w-full border border-solid bg-white rounded-t-[30px]">
                        <div className='relative'>
                        <div className='absolute top-2 left-4 hover:cursor-pointer'
                            onClick={()=>{setUpdate(false); setInput(prevInput)}}
                        >
                            <CloseSVG/>
                        </div>
                        <div className="text-center m-3 mx-6 space-y-5">
                            <div className='text-md font-semibold'>Update Field</div>
                            
                        {/* Email Toggle here */}
                            <input
                                type={type}
                                value={input}
                                ref={textInputRef}
                                onChange={(e)=>{
                                    setInput(e.target.value)
                                }}
                                className={`h-[54px] rounded-lg w-full text-base`}
                                
                                disabled={!update}
                                placeholder={placeholder}
                            />
                            
                            <div className={`flex w-full space-x-2 justify-between my-4 `}>
                                <button className="h-[46px] w-1/2 text-base font-bold text-black bg-[#F3F3F3] rounded-lg border border-solid"
                                onClick={()=>{
                                    setInput(prevInput);
                                    setUpdate(false);
                                }}>Decline</button>
                                <button 
                                onClick={()=>{
                                    setUpdate(false);
                                    updateFunction(textInputRef.current.value).catch((err)=>{
                                        toast.error(err.response.data.message || err.message);
                                        setInput(prevInput);
                                    });
                                }}
                                className="h-[46px] w-1/2 text-base font-bold text-white bg-primary rounded-lg  border border-solid">Update</button>
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