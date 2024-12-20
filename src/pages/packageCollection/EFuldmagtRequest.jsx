import React, { useEffect, useState } from 'react';
import PackageCollectionToken from '../../components/UIElements/packageCollection/PackageCollectionToken';
import ExpiryBox from '../../components/UIElements/packageCollection/ExpiryBox';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCredentials } from '../../context/CrendentialsContext';
import { approveFuldmagtRequest, getSpecificFuldmagt, getSpecificFuldmagtRequest, issueAgainFuldmagt, revokeFuldmagt } from '../../services/fuldmagt.services';
import { formatToDateOnly } from '../../utils/datefunctions';
import { toast } from 'react-toastify';
import SignaturePopup from '../../components/UIElements/popups/SignaturePopup';

const EFuldmagtRequest = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [credentials, setCredentials] = useCredentials();
    const [fuldmagt, setFuldmagt] = useState({});
    const [isSignatureOpen, setIsSignatureOpen] = useState(false);
    const handleSignatureSave = (signature)=>{
        const formData = new FormData();
        formData.append("signature", signature);
        approveFuldmagtRequest(credentials.authToken, id, formData).then((res)=>{
            toast.success("Request has been approved successfully");
            navigate("/home")
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.message)
        })
    }
    useEffect(()=>{
        getSpecificFuldmagtRequest(credentials.authToken, id).then((res)=>{
            let fuldmagtRequestData = res.data.data.fuldmagtRequest;
            
            setFuldmagt({
                ...fuldmagtRequestData,
                expiry: new Date(fuldmagtRequestData.expiry),
                createdAt: new Date(fuldmagtRequestData.createdAt),
                agentDOB: formatToDateOnly(fuldmagtRequestData.agentDOB),

            })
        }).catch((err)=>{
            toast.error((err.response.data.message))
        })
    },[])
    
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
      <SignaturePopup
        isOpen={isSignatureOpen}
        onClose={() => setIsSignatureOpen(false)}
        onSave={handleSignatureSave}
      />
      <ExpiryBox revoked = {fuldmagt.revoked} expiryDate = {fuldmagt.expiry} issuedDate={fuldmagt.createdAt}/>
      <PackageCollectionToken 
      userName={fuldmagt.fuldmagtGiverName} 
      fullNameToPick={fuldmagt.agentName} 
      dobToPick={fuldmagt.agentDOB} 
      date={fuldmagt.createdAt || ""}
      expiry={fuldmagt.expiry} 
      imageUrl={data.imageUrl}
      signatureUrl={fuldmagt.signature}/>

      { (fuldmagt.fuldmagtGiverId == credentials.user._id || (credentials.company && fuldmagt.fuldmagtGiverId == credentials.company._id)) &&
        <> 
            {                
            <button className='btn-primary w-[150px] h-[60px]'
                onClick={()=>{
                    setIsSignatureOpen(true);
                }}
            >
                Sign Now
            </button>
            }
        </>
      }
    </div>
  );
};

export default EFuldmagtRequest;