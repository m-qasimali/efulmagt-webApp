import React, { useEffect, useState } from "react";
import PackageCollectionToken from "../../components/UIElements/packageCollection/PackageCollectionToken";
import ExpiryBox from "../../components/UIElements/packageCollection/ExpiryBox";
import "reactjs-popup/dist/index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCredentials } from "../../context/CrendentialsContext";
import {
  approveFuldmagtRequest,
  rejectFuldmagt,
} from "../../services/fuldmagt.services";
import { formatToDateOnly } from "../../utils/datefunctions";
import { toast } from "react-toastify";
import SignaturePopup from "../../components/UIElements/popups/SignaturePopup";
import Payment from "../../components/UIElements/popups/Payment";
import {handlePayment, verifyPayment} from "../../services/payment.service";

const EFuldmagtRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);
  const [credentials, setCredentials] = useCredentials();
  const [fuldmagt, setFuldmagt] = useState({});
  const [isFuldmagtPending, setFuldmagtPending] = useState(false);
  const [isSignatureOpen, setSignatureOpen] = useState(false);
  const [paymentPopupOpen, setPaymentPopup] = useState(false);

  const handleSignatureSave = (signature) => {
    const formData = new FormData();
    formData.append("signature", signature);
    approveFuldmagtRequest(credentials.authToken, id, formData)
      .then((res) => {
        toast.success("Request has been approved successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handlePayments = async (amount, currency) => {
    const success = handlePayment(amount, currency)
    if (success) setSignatureOpen(true);
    setPaymentPopup(false)
  }
  // useEffect(()=>{
  //     getSpecificFuldmagtRequest(credentials.authToken, id).then((res)=>{
  //         let fuldmagtRequestData = res.data.data.fuldmagtRequest;

  //         setFuldmagt({
  //             ...fuldmagtRequestData,
  //             expiry: new Date(fuldmagtRequestData.expiry),
  //             createdAt: new Date(fuldmagtRequestData.createdAt),
  //             agentDOB: formatToDateOnly(fuldmagtRequestData.agentDOB),

  //         })
  //     }).catch((err)=>{
  //       console.log("elmao");
  //         toast.error((err.response.data.message))
  //     })
  // },[])

  const closePopup = () => {
    setSignatureOpen(false);
  };

  const rejectFuldmagtRequest = async () => {
    await rejectFuldmagt(credentials.authToken, fuldmagt._id)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Error Rejecting Request!");
      });
  };

  const approveFuldmagt = async (signature) => {
    await approveFuldmagtRequest(credentials.authToken, fuldmagt._id, {
      signature,
    })
      .then((res) => {
        setFuldmagtPending(false);
        setFuldmagt(res.data.data.fuldmagt);
        localStorage.removeItem("orderId");
        localStorage.removeItem("paymentUrl");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Approving Fuldmagt!");
      })
      .finally(() => {
        setSignatureOpen(false);
      });
  };

  // const approveFuldmagt = async (signature) => {
  //   console.log(fuldmagt, signature);

  //   await approveFuldmagtRequest(
  //     credentials.authToken,
  //     fuldmagt._id,
  //     { signature }
  //   )
  //     .then((res) => {
  //       //console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setSignatureOpen(false);
  //     });
  // };

  useEffect(() => {
    if (state?.item) {
      let fuldmagtData = {
        ...state.item,
        expiry: new Date(state.item.expiry),
        createdAt: new Date(state.item.createdAt),
        agentDOB: formatToDateOnly(state.item.agentDOB),
      };

      if (fuldmagtData.expiry < new Date() && !fuldmagtData.revoked) {
        setExpired(true);
      }

      if (fuldmagtData.revoked) {
        setRevoked(true);
      }
      if (fuldmagtData.requestStatus === "pending") {
        setFuldmagtPending(true);
      }
      setFuldmagt(fuldmagtData);
    }
  }, [state]);

  const handleRejectionCLick = () => {
    navigate("/e-fuldmagts/request", { state: { state } });
  };

  console.log(credentials, fuldmagt);

  const data = {
    expiryDate: new Date("8-24-2024"),
    issuedDate: new Date("8-19-2024"),
    userName: "Khalil Ahmed",
    fullNameToPick: "Murtaza Ahmed",
    dobToPick: "5-10-2000",
    imageUrl:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    signatureUrl:
      "https://signaturely.com/wp-content/uploads/2020/04/unreadable-letters-signaturely.svg",
    status: "active",
  };
  return (
    <div className="flex flex-col space-y-4 w-full justify-center items-center">
      {isFuldmagtPending &&
        fuldmagt.agentName !==
          credentials.user.name.firstName +
            " " +
            credentials.user.name.lastName && (
          <div className="w-full min-h-screen bg-black bg-opacity-25 inset-0 fixed z-50 flex justify-center items-center">
            <div className="bg-white p-10 flex flex-col">
              <p className="text-black">
                Do you approve {fuldmagt.agentName} to pick up the fuldmagt?
              </p>
              <div className="flex w-full justify-around mt-5">
                <button
                  className="px-3 py-2 bg-red-500 rounded text-primary font-medium"
                  onClick={rejectFuldmagtRequest}
                >
                  Reject
                </button>
                <button
                  className="px-3 py-2 bg-green-500 rounded text-primary font-medium"
                  onClick={async () => {
                    let orderId = localStorage.getItem("orderId");
                    if (!orderId){
                      handlePayment(state.item.price, "DKK");
                      return;
                    }
                    let paymentStatus = await verifyPayment(orderId);
                    if (paymentStatus.status == "Paid"){
                      setSignatureOpen(true);
                    }
                    else if(paymentStatus.status == "Pending"){
                      window.open(localStorage.getItem("paymentUrl"), "_blank");
                    }        
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      <SignaturePopup
        isOpen={isSignatureOpen}
        onClose={() => setSignatureOpen(false)}
        onSave={approveFuldmagt}
        selectedUser={credentials}
      />
      <ExpiryBox
        revoked={fuldmagt.revoked}
        expiryDate={fuldmagt.expiry}
        issuedDate={fuldmagt.createdAt}
        rejected={fuldmagt.requestStatus}
      />
      <PackageCollectionToken
        userName={fuldmagt.fuldmagtGiverName}
        fullNameToPick={fuldmagt.agentName}
        dobToPick={fuldmagt.agentDOB}
        date={fuldmagt.createdAt || ""}
        expiry={fuldmagt.expiry}
        imageUrl={data.imageUrl}
        signatureUrl={fuldmagt.signature}
      />

      <Payment isOpen={paymentPopupOpen} onClose={handlePayments} />

      {fuldmagt.requestStatus === "pending" && <p>Pending Approval</p>}

      {!fuldmagt.requestStatus &&
        fuldmagt.fuldmagtGiverId !== credentials.user._id && (
          <button
            className="btn-primary w-[150px] h-[60px]"
            onClick={() => {
              if (fuldmagt.isAgentSignRequired) {
                setSignatureOpen(true);
              }
            }}
            disabled={fuldmagt.acknowledged ? true : false}
          >
            Sign Now
          </button>
        )}
      {fuldmagt.requestStatus === "rejected" &&
        fuldmagt.fuldmagtGiverId !== credentials.user._id && (
          <button
            onClick={() => {
              handleRejectionCLick();
            }}
            className="bg-red-400 w-[150px] h-[60px] rounded text-white"
          >
            Request Again
          </button>
        )}
    </div>
  );
};

export default EFuldmagtRequest;
