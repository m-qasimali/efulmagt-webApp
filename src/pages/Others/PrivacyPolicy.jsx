import { useTranslation } from "react-i18next"

export default function PrivacyPolicy(){
    const {t} = useTranslation();
    return (
        <div className="w-full text-justify">
            <h2 className="mt-6 text-lg font-bold">
            {t("Introduction")}
            </h2>
            <p className="mt-3 font-md">
            {t("Welcome to the Privacy Policy for e- fuldmagt. This policy explains how we collect, use, and protect your personal information when you use our Power of Attorney application.")}
            </p>
            <h2 className="mt-6 text-lg font-bold">
            {t("Information we Collect")}
            </h2>
            <p className="mt-3 font-md">
            <span className="font-bold">{t("Personal Information")}:</span>  {t("We may collect personal information, such as your name, contact details, and other identifying information necessary for creating and managing Power of Attorney documents")}
            </p>
            <p className="mt-3 font-md">
            <span className="font-bold">{t("Usage Information")}:</span>  {t("We may collect data about how you use the e-fuldmagt, including log data, device information, and cookies.")}
            </p>
            <h2 className="mt-6 text-lg font-bold">
            {t("How we use your Information")}
            </h2>
            <p className="mt-3 font-md">
            <span className="font-bold">{t("Providing Services")}: </span> {t("We use the collected information to provide, maintain, and improve our services, including creating Power of Attorney documents and managing user accounts.")}
            </p>
            <p className="mt-3 font-md">
            <span className="font-bold">{t("Communication")}: </span> {t("We may use your information to communicate with you, respond to inquiries, and provide customer support.")}
            </p>
        </div>
    )
}