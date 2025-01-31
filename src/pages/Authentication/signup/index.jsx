import React, { useEffect, useState } from "react";
import topImage from "../../../assets/registration/Vector.png";
import UserForm from "./userInformationForm";
import VerifyPhone from "./verifyPhone";
import VerifyEmail from "./verifyEmail";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [emailCredentialsToken, setEmailCredentialsToken] = useState(null);
  const [phoneCredentialsToken, setPhoneCredentialsToken] = useState(null);
  const [isServiceOpen, setServiceOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const { t } = useTranslation();

  const toggleService = () => {
    setServiceOpen((prev) => !prev);
  };

  const togglePrivacy = () => {
    setPrivacyOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col py-12 align-middle w-full md:w-1/2 overflow-auto	">
      <img className="absolute z-[0] top-0 right-0 w-4/5" src={topImage}></img>
      <div className="flex justify-center">
        <div className="z-[1] h-1/2 align-middle w-9/12 md:w-8/12 lg:w-7/12">
          <h2 className="text-sm font-semibold text-muted">
            Welcome to Attorney
          </h2>
          <h3 className="text-lg font-bold mt-0 text-primary">Sign Up</h3>
          {(step == 1 && (
            <VerifyEmail
              className="mt-6"
              setStep={setStep}
              setJWTCode={setEmailCredentialsToken}
              toggleService={toggleService}
              togglePrivacy={togglePrivacy}
            />
          )) ||
            (step == 2 && (
              <VerifyPhone
                className="mt-6"
                setStep={setStep}
                setJWTCode={setPhoneCredentialsToken}
                toggleService={toggleService}
                togglePrivacy={togglePrivacy}
              />
            )) ||
            (step == 3 && (
              <UserForm
                className="mt-6"
                emailCredentialsToken={emailCredentialsToken}
                phoneCredentialsToken={phoneCredentialsToken}
                toggleService={toggleService}
                togglePrivacy={togglePrivacy}
              />
            ))}
        </div>
      </div>

      {isServiceOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-3xl p-5 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            {/* Close Button */}
            <button
              onClick={() => setServiceOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <span className="text-xl font-bold">×</span>
            </button>

            {/* Header Section */}
            <div className="flex items-center space-x-2 my-3">
              <p className="text-lg md:text-3xl font-bold">
                {t("Terms of Service")}
              </p>
            </div>

            {/* Content Section */}
            <h2 className="mt-6 text-lg font-bold">{t("Introduction")}</h2>
            <p className="mt-3 font-md">
              {t(
                "Thank you for using e-fuldmagt, a Power of Attorney application designed to facilitate the creation and management of Power of Attorney documents. The following terms of service govern your use of the app."
              )}
            </p>
            <h2 className="mt-6 text-lg font-bold">
              {t("Accepting of Terms")}
            </h2>
            <p className="mt-3 font-md">
              {t(
                "By accessing or using e-fuldmagt, you agree to comply with and be bound by these terms of service. If you do not agree with any part of these terms, you may not use the app."
              )}
            </p>
            <h2 className="mt-6 text-lg font-bold">{t("Use Of the App")}</h2>
            <p className="mt-3 font-md">
              {t(
                "Eligibility: You must be of legal age and capacity in your jurisdiction to create and manage a Power of Attorney document. Account Creation: You may need to create an account to use certain features of the app. You are responsible for maintaining the security of your account and are liable for all activities that occur under your account."
              )}
            </p>
            <p className="mt-12 text-lg font-bold text-center">
              {t("Power of Attorney Documents")}
            </p>
            <div className="flex justify-center w-full space-x-6">
              <div>Hello</div>
              <div>Hello</div>
            </div>
          </div>
        </div>
      )}

      {isPrivacyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-3xl p-5 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            {/* Close Button */}
            <button
              onClick={togglePrivacy}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <span className="text-xl font-bold">×</span>
            </button>

            {/* Header Section */}
            <div className="flex items-center space-x-2 my-3">
              <p className="text-lg md:text-3xl font-bold">
                {t("Privacy Policy")}
              </p>
            </div>

            {/* Content Section */}
            <h2 className="mt-6 text-lg font-bold">{t("Introduction")}</h2>
            <p className="mt-3 font-md">
              {t(
                "Welcome to the Privacy Policy for e- fuldmagt. This policy explains how we collect, use, and protect your personal information when you use our Power of Attorney application."
              )}
            </p>
            <h2 className="mt-6 text-lg font-bold">
              {t("Information we Collect")}
            </h2>
            <p className="mt-3 font-md">
              <span className="font-bold">{t("Personal Information")}:</span>{" "}
              {t(
                "We may collect personal information, such as your name, contact details, and other identifying information necessary for creating and managing Power of Attorney documents"
              )}
            </p>
            <p className="mt-3 font-md">
              <span className="font-bold">{t("Usage Information")}:</span>{" "}
              {t(
                "We may collect data about how you use the e-fuldmagt, including log data, device information, and cookies."
              )}
            </p>
            <h2 className="mt-6 text-lg font-bold">
              {t("How we use your Information")}
            </h2>
            <p className="mt-3 font-md">
              <span className="font-bold">{t("Providing Services")}: </span>{" "}
              {t(
                "We use the collected information to provide, maintain, and improve our services, including creating Power of Attorney documents and managing user accounts."
              )}
            </p>
            <p className="mt-3 font-md">
              <span className="font-bold">{t("Communication")}: </span>{" "}
              {t(
                "We may use your information to communicate with you, respond to inquiries, and provide customer support."
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
