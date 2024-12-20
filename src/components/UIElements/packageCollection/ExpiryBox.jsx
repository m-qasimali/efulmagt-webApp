import React, { useEffect, useState } from 'react';
import PackageSVG from "../../../assets/icons/package.svg?react"
import { CircularProgressbar } from 'react-circular-progressbar';
function timeLeftFormat(timeLeft){
    timeLeft = Math.floor(timeLeft/1000);
    const days = Math.floor(timeLeft / (3600 * 24));
    const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${days}d ${hours}h ${minutes}mins ${seconds}secs`
}

const ExpiryBox = ({expiryDate, issuedDate, revoked}) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - new Date())
  const [timeOutID, setTimeOutID] = useState(null);
  const [totalTime, setTotalTime] = useState(issuedDate - expiryDate);
  const [percentage, setPercentage] = useState(0);
  useEffect(()=>{
    if(isNaN(timeLeft))
      return
    let thisTimeOutId = setTimeout(()=>{
      setTimeLeft(timeLeft - 1000);
      
      setPercentage((timeLeft<0 || revoked)?0:100*timeLeft/totalTime)
    }, 1000)

    setTimeOutID(thisTimeOutId);
  },[timeLeft])
  useEffect(()=>{
    clearTimeout(timeOutID);
    setTimeLeft(expiryDate - new Date());
    setTotalTime(expiryDate - issuedDate);
  },[expiryDate])

  return (
    <div className="w-full flex items-center justify-between bg-black text-white p-4 rounded-lg md:w-[500px]">
      <div className="flex items-center">
        <div className="p-2 bg-gray-800 rounded-lg">
          {/* Box Icon */}
          <PackageSVG className="text-white fill-current stroke-current mb-2 h-[40px] w-[40px]"/>
        </div>
        {
          (revoked)?
          <div className="ml-4">
            <span className="text-gray-400">Revoked</span>
          </div>
          :(timeLeft>0)?
          <div className="ml-4">
            <span className="text-gray-400">Expires in</span>
            <div className="">{timeLeftFormat(timeLeft)}</div>
          </div>:
          <div className="ml-4">
            <span className="text-gray-400">Expired</span>
          </div>
        }
        
      </div>
      <div className="flex items-center justify-center h-10 w-10 text-secondary">
        <CircularProgressbar value={percentage} text={""} />
      </div>
    </div>
  );
};

export default ExpiryBox;