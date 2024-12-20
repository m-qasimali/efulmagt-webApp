import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePopup = ({ isOpen, onClose, onSave }) => {
  const sigCanvas = useRef({});
  const [showSignatureOptions, setShowSignatureOptions] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState(null);

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    
    const trimmedData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    onSave(trimmedData);
  };

  if (!isOpen) return null;

  const handleSavedSignatureClick = () => {
    setShowSignatureOptions(true);
  };

  return (
    <>
      {!showSignatureOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex justify-start space-x-4">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={clear}
                  className="flex items-center text-sm text-gray-600 font-bold border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100"
                >
                  Clear
                </button>
              </div>
              <button
                onClick={save}
                className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-lg"
              >
                Done
              </button>
            </div>

            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 400,
                height: 200,
                className: "border border-gray-300 rounded-lg",
              }}
              ref={sigCanvas}
            />

            {/* Signature text */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 font-semibold">
                Your Signature
              </p>
              <p className="text-xs text-gray-400 mt-1">
                If you already have a saved signature,{" "}
                <button
                  className="text-blue-500 underline"
                  onClick={handleSavedSignatureClick}
                >
                  click here to use it.
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {showSignatureOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowSignatureOptions(false)}
                className="text-gray-500 hover:text-gray-700 text-sm font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (selectedSignature) {
                    onSave(selectedSignature);
                    setShowSignatureOptions(false);
                  }
                }}
                className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-4 py-2 rounded-lg"
              >
                Done
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">User [If Any]</p>
                  <img
                    src="/images/sign.png"
                    alt={`Signature`}
                    className="w-11/12"
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <input type="radio" name="signature" value={`Signature`} />
                  <label className=" text-blue-500 cursor-pointer">
                    Change
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-gray-500">Company [If Any]</p>
                  <img
                    src="/images/sign.png"
                    alt={`Signature`}
                    className="w-11/12"
                  />
                </div>
                <div className="flex justify-between space-x-4">
                  <input type="radio" name="signature" value={`Signature`} />
                  <label className="ml-2 text-blue-500 cursor-pointer">
                    Change
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignaturePopup;
