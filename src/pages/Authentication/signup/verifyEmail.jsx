import React, { useEffect, useState } from "react";
import OTPInput from "../../../components/UIElements/inputs/OTPInput";
import PhoneInput from "../../../components/UIElements/inputs/PhoneInput";
import {
  sendOTP,
  verifySignupOTP,
} from "../../../services/authentication.services";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = ({
  className,
  setStep,
  setJWTCode,
  toggleService,
  togglePrivacy,
}) => {
  const [time, setTime] = useState(10);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [encryptedOTPToken, setEncryptedOTPToken] = useState(null);
  const [email, setEmail] = useState("");
  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setTimeout(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!encryptedOTPToken) {
      let credentials = {
        email: e.target.email.value,
      };
      setEmail(e.target.email.value);

      let response = await sendOTP(credentials);
      console.log(response);
      let payload = response.data.data;
      //Once Credentials are Sent, You will Receive a JWT of OTP Verification//
      // console.log(payload);
      setEncryptedOTPToken(payload.encryptedOTPToken);
      setTime(600);
    } else {
      //User is supposed to enter the OTP Code and get another JWT//
      // console.log(otp, encryptedOTPToken)//Send this otp along with otpVerification to Backend

      let otpRefined = otp.join("");
      try {
        let res = await verifySignupOTP({ encryptedOTPToken, otp: otpRefined });

        setJWTCode(res.data.data.credentialsToken);
        setStep(2);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };
  const cancelOtp = () => {
    setEncryptedOTPToken(null);
  };
  const resendCode = async () => {
    // console.log("Resend Code");
    setTime(0);
    let response = await sendOTP({ email });
    setTime(600);
    setEncryptedOTPToken(response.data.data.encryptedOTPToken);
    toast.success("New OTP sent!");
  };
  return (
    <form className={className} onSubmit={handleSubmit}>
      <div>
        <label className="block text-md font-semibold">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-full mt-2 txt-field-primary"
          required
        />
      </div>

      <p className="text-xs text-muted mt-2">
        We will send you an email with a code to verify youremail address".
      </p>
      <Link to="/signin" className="text-xs text-muted mt-2 text-secondary">
        Already have an account?
      </Link>

      {encryptedOTPToken ? (
        <div className="flex flex-col items-center mt-4">
          <p className="text-center font-bold text-xl m-1">OTP Verification</p>
          <p className="text-center text-sm m-1">
            Please enter the OTP sent to your registered email
          </p>
          <OTPInput className="my-3" otp={otp} setOtp={setOtp} />
          <p className="text-center text-xs display:inline">
            Remaining time:{" "}
            <span className="text-secondary">
              {String(parseInt(time / 60)).padStart(2, "0")}:
              {String(time % 60).padStart(2, "0")}
            </span>
          </p>
          <p className="text-center text-xs mt-2">
            didn't get the code?{" "}
            <a href="#" onClick={resendCode} className="text-secondary">
              Resend
            </a>
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-4">
        <div className="text-sm inline-flex items-center mt-2">
          <input type="checkbox" required className="checkbox-custom" />
          <span className="ml-2 text-muted">
            By signing up, you agree to our{" "}
            <a
              href="https://www.e-fuldmagt.dk/en/privatliv/handelsbetingelser"
              target="_blank"
            >
              <span className="text-black font-bold cursor-pointer z-50">
                Terms of Service
              </span>{" "}
            </a>
            and{" "}
            <a
              href="https://www.e-fuldmagt.dk/en/privatliv/handelsbetingelser"
              target="_blank"
            >
              <span
                className="text-black font-bold cursor-pointer z-50"
                onClick={togglePrivacy}
              >
                Privacy Policy
              </span>
            </a>
            .
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="w-[180px] mt-6 btn-primary">
          {encryptedOTPToken ? "Continue" : "Verify"}
        </button>
      </div>

      {encryptedOTPToken && (
        <div className="flex justify-center">
          <button
            onClick={cancelOtp}
            className="w-[180px] mt-6 btn-primary-outline"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default VerifyEmail;
