import { useTranslation } from "react-i18next"

export default function Services(){
    const {t} = useTranslation();
    return (
        <div className="w-full">
            <h2 className="mt-6 text-lg font-bold">
            {t("Introduction")}
            </h2>
            <p className="mt-3 font-md">
            {t("Thank you for using e-fuldmagt, a Power of Attorney application designed to facilitate the creation and management of Power of Attorney documents. The following terms of service govern your use of the app.")}
            </p>
            <h2 className="mt-6 text-lg font-bold">
            {t("Accepting of Terms")}
            </h2>
            <p className="mt-3 font-md">
            {t("By accessing or using e-fuldmagt, you agree to comply with and be bound by these terms of service. If you do not agree with any part of these terms, you may not use the app.")}
            </p>
            <h2 className="mt-6 text-lg font-bold">
            {t("Use Of the App")}
            </h2>
            <p className="mt-3 font-md">
            {t("Eligibility: You must be of legal age and capacity in your jurisdiction to create and manage a Power of Attorney document. Account Creation: You may need to create an account to use certain features of the app. You are responsible for maintaining the security of your account and are liable for all activities that occur under your account.")}
            </p>
            <p className="mt-12 text-lg font-bold text-center">
                {t("Power of Attorney Documents")}
            </p>
            <div className="flex justify-center w-full space-x-6">
                <div>Hello</div>
                <div>Hello</div>
            </div>
        </div>
    )
}