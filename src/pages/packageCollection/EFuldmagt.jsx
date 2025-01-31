import React, { useEffect, useState } from "react";
import PackageCollectionToken from "../../components/UIElements/packageCollection/PackageCollectionToken";
import ExpiryBox from "../../components/UIElements/packageCollection/ExpiryBox";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useLocation, useParams } from "react-router-dom";
import { useCredentials } from "../../context/CrendentialsContext";
import {
  acknowlegeFuldmagtRequest,
  getSpecificFuldmagt,
  issueAgainFuldmagt,
  revokeFuldmagt,
} from "../../services/fuldmagt.services";
import { formatToDateOnly } from "../../utils/datefunctions";
import { toast } from "react-toastify";
import SignaturePopup from "../../components/UIElements/popups/SignaturePopup";

const formatDate = (date) => {
  date = new Date(date);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date
    .toLocaleString("en-US", options)
    .replace(",", "")
    .replace(" ", ". ");
};

const ExpiredModal = ({ expiredDate, isOpen, setIsOpen, callBackFunction }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm w-full space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg ">
              <div className="flex justify-end"></div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">Expired</h2>
                <div className="flex items-center justify-center mt-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">
                    {formatDate(expiredDate)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    callBackFunction();
                  }}
                  className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Issue Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const RevokeModal = ({
  revokedDate,
  isOpen,
  setIsOpen,
  callBackFunction,
  fuldmagt,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="max-w-sm w-full space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <div className="flex justify-end"></div>
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800">Revoke</h2>
              <div className="flex items-center justify-center mt-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6"
                    />
                  </svg>
                </div>
                <span className="ml-3 text-gray-600">
                  {formatDate(revokedDate)}
                </span>
              </div>
              <button
                onClick={() => {
                  callBackFunction();
                }}
                className="mt-6 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Issue Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const RevokeConfirmationModal = ({
  isOpen,
  setIsOpen,
  callBackFunction,
  fuldmagt,
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="max-w-sm w-full space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <div className="flex justify-end"></div>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center space-x-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3M16 7V3M4 11h16M4 19h16m-7-6h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6m-4 0H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6"
                  />
                </svg>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="ml-3 text-gray-600">
                  Are you sure you want to revoke “{fuldmagt.agentName}” before
                  it expired? Your revoke will take effect immediately
                </span>
              </div>
              <div className="flex items-center justify-center space-x-4 ">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="mt-6 w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  No
                </button>
                <button
                  onClick={callBackFunction}
                  className="bg-primary w-full mt-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
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

const EFuldmagt = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [credentials, setCredentials] = useCredentials();
  const [fuldmagt, setFuldmagt] = useState({});
  const [openRevoke, setOpenRevoke] = useState(false);
  const [isExpired, setExpired] = useState(false);
  const [isRevoked, setRevoked] = useState(false);
  const [isSignatureOpen, setSignatureOpen] = useState(false);

  const updateFulmagtInformation = () => {
    getSpecificFuldmagt(credentials.authToken, id).then((res) => {
      let fuldmagtData = res.data.data.fuldmagt;
      fuldmagtData = {
        ...fuldmagtData,
        expiry: new Date(fuldmagtData.expiry),
        createdAt: new Date(fuldmagtData.createdAt),
        agentDOB: formatToDateOnly(fuldmagtData.agentDOB),
      };
      if (fuldmagtData.expiry < new Date() && !fuldmagtData.revoked) {
        setExpired(true);
      }
      if (fuldmagtData.revoked) {
        setRevoked(true);
      }
      setFuldmagt(fuldmagtData);
    });
  };
  // useEffect(()=>{
  //     updateFulmagtInformation();
  // },[])

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
      setFuldmagt(fuldmagtData);
    }
  }, [state]);

  const issueAgainCall = () => {
    issueAgainFuldmagt(credentials.authToken, id).then((res) => {
      toast.success("Issued Again Successfully");
      updateFulmagtInformation();
      setExpired(false);
      setRevoked(false);
    });
  };

  const revokeCall = () => {
    revokeFuldmagt(credentials.authToken, id).then((res) => {
      toast.success("Fuldmagt has been Revoked");
      updateFulmagtInformation();
      setOpenRevoke(false);
      setFuldmagt(res.data.data.fuldmagt);
    });
  };

  const handleFuldmagtPickup = async (signature) => {
    await acknowlegeFuldmagtRequest(
      credentials.authToken,
      fuldmagt._id,
      signature
    )
      .then((res) => {
        toast.success("Fuldmagt Signed Successfully!");
        const updatedFuldmagt = res.data.data.fuldmagt;
        updatedFuldmagt.expiry = new Date(updatedFuldmagt.expiry);
        setFuldmagt(updatedFuldmagt);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setSignatureOpen(false);
      });
  };

  const closePopup = () => {
    setSignatureOpen(false);
  };

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
      <ExpiryBox
        revoked={fuldmagt.revoked}
        expiryDate={fuldmagt.expiry}
        issuedDate={fuldmagt.createdAt}
        rejected={fuldmagt.requestStatus}
      />
      {fuldmagt.acknowledged && <p>Fuldmagt has been acknowledged!</p>}
      <PackageCollectionToken
        userName={fuldmagt.fuldmagtGiverName}
        fullNameToPick={fuldmagt.agentName}
        dobToPick={fuldmagt.agentDOB}
        date={fuldmagt.createdAt || ""}
        expiry={fuldmagt.expiry}
        imageUrl={data.imageUrl}
        signatureUrl={fuldmagt.signature}
      />

      {(fuldmagt.fuldmagtGiverId == credentials.user._id ||
        (credentials.company &&
          fuldmagt.fuldmagtGiverId == credentials.company._id)) && (
        <>
          {!fuldmagt.revoked && !fuldmagt.acknowledged&& (
            <button
              className="btn-primary w-[150px] h-[60px]"
              onClick={() => {
                if (fuldmagt.expiry > new Date()) {
                  setOpenRevoke(true);
                } else {
                  revokeCall();
                }
              }}
            >
              Revoke
            </button>
          )}
          <ExpiredModal
            key={fuldmagt.acknowledged}
            expiredDate={fuldmagt.expiry}
            isOpen={isExpired}
            setIsOpen={setExpired}
            callBackFunction={issueAgainCall}
          />
          <RevokeModal
            revokedDate={fuldmagt.revokedDate}
            isOpen={isRevoked}
            setIsOpen={setRevoked}
            callBackFunction={issueAgainCall}
            fuldmagt={fuldmagt}
          />

          {new Date() < fuldmagt.expiry && (
            <RevokeConfirmationModal
              isOpen={openRevoke}
              setIsOpen={setOpenRevoke}
              callBackFunction={revokeCall}
              fuldmagt={fuldmagt}
            />
          )}

          {new Date() > fuldmagt.expiry ||
            (fuldmagt.revoked && (
              <button
                className="btn-primary w-[150px] h-[60px]"
                onClick={() => issueAgainCall()}
              >
                Issue Again
              </button>
            ))}
        </>
      )}
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
            {fuldmagt.acknowledged ? "Signed" : "Sign Now"}
          </button>
        )}

      {isSignatureOpen && (
        <SignaturePopup
          isOpen={isSignatureOpen}
          onClose={closePopup}
          onSave={handleFuldmagtPickup}
          selectedUser={credentials}
        />
      )}
    </div>
  );
};

export default EFuldmagt;
