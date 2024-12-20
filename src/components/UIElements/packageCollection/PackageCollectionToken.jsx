

import CalenderSVG from '../../../assets/icons/calendar.svg?react';
import 'react-circular-progressbar/dist/styles.css';
import { timeDiff } from '../../../utils/datefunctions';

const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options).replace(',', '').replace(' ', '. ');
  };

  
export default function PackageCollectionToken({userName, fullNameToPick, dobToPick, expiry, signatureUrl, imageUrl, date}){
    const expiriesIn = timeDiff(expiry, date);
    return (
        <div className='flex flex-col md:flex-row relative drop-shadow-md p-1 py-10 md:py-1 w-full  h-[512px] max-w-[300px] md:max-w-full md:h-[315px] md:w-[734px]'>
        <div className="absolute top-0 left-0 test-token hidden md:block"></div>
        <img src="/images/sm-token.png" className="absolute md:hidden top-1 left-1 w-[99%] h-[99%]"></img>
        <div className='flex flex-col items-center justify-center z-20 md:w-1/2 px-6'>
          <img src={imageUrl} className='w-[56px] h-[56px] rounded-full object-cover'>
          </img>
          <p className='text-md mt-2 text-justify'>
          I, {userName}, hereby authorize {fullNameToPick} born {dobToPick} to collect my packages from the
post office.</p>
        </div>
        <hr className='h-full border-t-dashed md:hidden'/>
        <div className='flex flex-col items-center justify-center px-6  z-20 md:w-1/2 md:border-l-2 border-dashed border-gray-400 flex flex-col items-center justify-center '>
          <p className='text-md mt-2 text-center'>This authorization expires {expiriesIn} after issuance.</p>
          <span>
            <CalenderSVG className="inline"/>
            <span className='text-sm'>{" "}{formatDate(date)}</span>
          </span>
          <img
          src={signatureUrl} className='w-[100px] h-[56px] mt-4 border-b-2 border-gray-600 border-solid'
          
          >
          </img>
        </div>
      </div>
    )
}