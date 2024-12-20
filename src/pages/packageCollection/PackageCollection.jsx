import React, { useState } from 'react';
import PackageCollectionToken from '../../components/UIElements/packageCollection/PackageCollectionToken';
import ExpiryBox from '../../components/UIElements/packageCollection/ExpiryBox';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ExpiredModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className='max-w-sm w-full space-y-4'>
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg ">
          <div className="flex justify-end">
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Expired</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
              <span className="ml-3 text-gray-600">16. Feb 2023, 10:23AM</span>
            </div>
            <button className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
              Issue Again
            </button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

const RevokeModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className='max-w-sm w-full space-y-4'>
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg ">
          <div className="flex justify-end">
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Revoke</h2>
            <div className="flex items-center justify-center mt-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6" />
                </svg>
              </div>
              <span className="ml-3 text-gray-600">16. Feb 2023, 10:23AM</span>
            </div>
            <button className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
              Issue Again
            </button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

const RevokeConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className='max-w-sm w-full space-y-4'>
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg ">
          <div className="flex justify-end">
          </div>
          <div className="text-center mt-4">
            <div className="flex items-center justify-center space-x-4 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6" />
              </svg>
            </div>
            <div className="flex items-center justify-center mt-2">
              <span className="ml-3 text-gray-600">Are you sure you want to revoke “name of e-fuldmagt” before it expired? Your revoke will take effect immediately</span>
            </div>
            <div className="flex items-center justify-center space-x-4 ">
              <button className="mt-6 w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                No
              </button>
              <button className="bg-primary w-full mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                Yes
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

const PackageCollection = () => {
  const data = {
    expiryDate: new Date('8-24-2024'),
    issuedDate: new Date('8-19-2024'),
    userName: "Khalil Ahmed",
    fullNameToPick: "Murtaza Ahmed",
    dobToPick: "5-10-2000",
    imageUrl: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    signatureUrl: "https://signaturely.com/wp-content/uploads/2020/04/unreadable-letters-signaturely.svg",
    status: "active"
  }
  return (
    <div className="flex flex-col space-y-4 w-full justify-center items-center">
      <ExpiryBox expiryDate = {data.expiryDate} issuedDate={data.issuedDate}/>
      <PackageCollectionToken userName={data.userName} fullNameToPick={data.fullNameToPick} dobToPick={data.dobToPick} date={data.issuedDate} imageUrl={data.imageUrl} signatureUrl={data.signatureUrl}/>
      <button className='btn-primary w-[150px] h-[60px]'>
        Revoke
      </button>
      <ExpiredModal/> 
      <RevokeModal/>
      <RevokeConfirmationModal/>
    </div>
  );
};

export default PackageCollection;