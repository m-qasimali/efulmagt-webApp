import SettingsItem from "../../components/UIElements/settings/SettingsItem";
import AboutSVG from "../../assets/icons/about.svg?react";
import CompanySVG from "../../assets/icons/company.svg?react";
import NotificationSVG from "../../assets/icons/notification.svg?react";
import PhoneSVG from "../../assets/icons/phone.svg?react";
import PolicySVG from "../../assets/icons/policies.svg?react";
import SecuritySVG from "../../assets/icons/security.svg?react";
import ServicesSVG from "../../assets/icons/services.svg?react";
import UserSVG from "../../assets/icons/user.svg?react";
import SignSVG from "../../assets/icons/sign.svg?react";
import PrivacyPolicy from "../Others/PrivacyPolicy";
import { useState } from "react";
import { useCredentials } from "../../context/CrendentialsContext";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useCredentials();

  const switchSelection = (selected) => {
    setCredentials((oldValues)=>{
      return {
        ...oldValues,
        selected: selected
      }
    })
  };
  return (
    <div className="md:flex md:space-x-12 w-full">
      <div className="flex flex-col md:items-center w-1/5">
        <h2 className="text-md font-bold  mb-4">{t("Accounts")}</h2>
        <div className="flex md:block p-1 md:border md:border-solid space-x-4 md:space-x-0 w-full md:h-[438px]  md:w-4/5 rounded-lg ">
          <div className="flex items-center justify-center w-[120px] h-[120px] md:w-full md:h-[215px]">
            <div
              onClick={() => {
                if (credentials.company) {
                  switchSelection("user");
                }
              }}
              className={`flex flex-col space-y-2 items-center justify-center w-[120px] h-[120px] md:w-[144px] md:h-[144px]  border rounded-lg border-solid hover:cursor-pointer ${
                credentials.selected == "user"
                  ? "bg-primary bg-opacity-20 border-primary"
                  : ""
              }`}
            >
              <img
                src={credentials.user.image}
                className="w-[64px] h-[64px] rounded-full object-cover"
              ></img>
              <p className="text-sm">
                {credentials.user.name.firstName +
                  " " +
                  credentials.user.name.lastName}
              </p>
            </div>
          </div>
          <hr className="hidden md:block border-dashed"></hr>
          <div className="flex items-center justify-center w-[120px] h-[120px] md:w-full md:h-[215px]">
            <div
              onClick={() => {
                if (credentials.company) {
                  switchSelection("company");
                }
              }}
              className={`flex flex-col space-y-2 items-center justify-center w-[120px] h-[120px] md:w-[144px] md:h-[144px]  border rounded-lg ${
                credentials.company
                  ? "border-solid hover:cursor-pointer"
                  : "border-dashed"
              } ${
                credentials.selected == "company"
                  ? "bg-primary bg-opacity-20 border-primary"
                  : ""
              }`}
            >
              {credentials.company?
                <img src={credentials.company.image} className="w-[64px] h-[64px] rounded-full object-cover"/>:
                <CompanySVG className="w-[64px] h-[64px]" />
              }
              
              <p className="text-sm">
                {credentials.company
                  ? credentials.company.companyName
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-8/12 lg:w-3/5">
        <h2 className="text-md font-bold mb-4">{t("Settings")}</h2>
        <SettingsItem
          SvgItem={UserSVG}
          text={t("Personal Information")}
          navigateTo={"/settings/user"}
          className={"mb-2"}
        />
        {
          (credentials.company)?
          <SettingsItem
          SvgItem={CompanySVG}
          text={t("Company Information")}
          navigateTo={"/settings/company"}
          className={"mb-2"}
        />:
        <SettingsItem
          SvgItem={CompanySVG}
          text={t("Add Company")}
          navigateTo={"/settings/add-company"}
          className={"mb-2"}
        />
        }
        
        <SettingsItem
          SvgItem={SignSVG}
          text={t("Signature")}
          navigateTo={"/settings/signatures"}
          className={"mb-2"}
        />
        <SettingsItem
          SvgItem={SecuritySVG}
          text={t("Login and Safety")}
          navigateTo={"/settings/login"}
          className={"mb-2"}
        />
        <SettingsItem
          SvgItem={NotificationSVG}
          text={t("Notifications")}
          navigateTo={"/notifications/settings"}
          className={"mb-2"}
        />
        <h2 className="text-md font-bold mb-4 mt-6">{t("Support")}</h2>
        <SettingsItem
          SvgItem={AboutSVG}
          text={t("How e-fuldmagt works")}
          navigateTo={"/works"}
          className={"mb-2"}
        />
        <SettingsItem
          SvgItem={PhoneSVG}
          text={t("Contact Us")}
          navigateTo={"/contactus"}
          className={"mb-2"}
        />
        <h2 className="text-md font-bold mb-4 mt-6">
          {t("Services and Policies")}
        </h2>
        <SettingsItem
          SvgItem={ServicesSVG}
          text={t("Term of Service")}
          navigateTo={"/services"}
          className={"mb-2"}
        />
        <SettingsItem
          SvgItem={PolicySVG}
          text={t("Privacy Policy")}
          navigateTo={"/privacy"}
          className={"mb-2"}
        />
      </div>
    </div>
  );
}
