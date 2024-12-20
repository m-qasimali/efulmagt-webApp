import { useEffect, useState } from "react"
import SetNotificationsItem from "../../components/UIElements/notifications/SetNotificationsItem";
import { useTranslation } from "react-i18next";
import { getNotificationSettings, setActivityNotification } from "../../services/notification.services";
import { useCredentials } from "../../context/CrendentialsContext";
import { toast } from "react-toastify";

export default function NotificationsSettings(){
      const {t} = useTranslation();

      const [isAccount, setIsAccount] = useState(false);
      const [credentials, setCredentials] = useCredentials();
      const [specialOfferNotfication, setSpecialOfferNotification] = useState({
        "email":false,
        "pushNotification": false
      })
      const [newsNotfication, setNewsNotification] = useState({
        "email":true,
        "pushNotification": false
      })
      const [feedbackNotification, setFeedbackNotification] = useState({
        "email":true,
        "pushNotification": false
      })
      const [accountNotification, setAccountNotification] = useState({
        "email":true,
        "pushNotification": false
      })
      const [remainderNotification, setRemainderNotification] = useState({
        "email":true,
        "pushNotification": false
      });

      useEffect(()=>{
          getNotificationSettings(credentials.authToken).then((res)=>{
            let notificationSetting = res.data.data.notificationSetting
            setAccountNotification(notificationSetting.activityNotification);
          })
      },[])
      
      const handleSpecialOfferEmailChange = (value)=>{
        setSpecialOfferNotification({...specialOfferNotfication, email:value})
      }
      const handleSpecialOfferPushNotificationChange = (value)=>{
        setSpecialOfferNotification({...specialOfferNotfication, pushNotification:value})
      }
      const handleNewsEmailChange = (value)=>{
        setNewsNotification({...newsNotfication, email:value})
      }
      const handleNewsPushNotificationChange = (value)=>{
        setNewsNotification({...newsNotfication, pushNotification:value})
      }
      const handleFeedbackEmailChange = (value)=>{
        setFeedbackNotification({...feedbackNotification, email:value})
      }
      const handleFeedbackPushNotificationChange = (value)=>{
        setFeedbackNotification({...feedbackNotification, pushNotification:value})
      }
      const handleAccountEmailChange = (value)=>{
        setActivityNotification(credentials.authToken, {...accountNotification, email:value}).then(
          (res)=>{
            toast.success(res.data.message);
            setAccountNotification({...accountNotification, email:value})
          }
        )
      }
      const handleAccountPushNotificationChange = (value)=>{
        setActivityNotification(credentials.authToken, {...accountNotification, pushNotification:value}).then(
          (res)=>{
            toast.success(res.data.message);
            setAccountNotification({...accountNotification, pushNotification:value})
          }
        )
      }
      const handleRemainderEmailChange = (value)=>{
        setRemainderNotification({...remainderNotification, email:value})
      }
      const handleRemainderPushNotificationChange = (value)=>{
        setRemainderNotification({...remainderNotification, pushNotification:value})
      }
      return(
        <div className="h-full w-full flex-col justify-center">
            <div className="flex items-center justify-center space-x-4 rounded-full bg-[#246C89] p-1 w-max mx-auto">
                {
                isAccount?
                <button
                    className={`px-[20px] md-px-[40px] py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
                    onClick={() => {setIsAccount(false)}}
                >
                    {t("Offers and Updates")}
                </button>:
                <button
                    className={`px-[20px] md-px-[40px]  py-3 rounded-full bg-white text-primary text-sm font-bold`}
                    onClick={() => {setIsAccount(false)}}
                >
                    {t("Offers and Updates")}
                </button>
                }
                {
                !isAccount?
                <button
                    className={`px-[20px] md-px-[40px]  py-3 rounded-full bg-white bg-opacity-80 text-primary text-sm font-bold`}
                    onClick={() => {setIsAccount(true)}}
                >
                    {t("Account")}
                </button>:
                <button
                    className={`px-[20px] md-px-[40px]  py-3 rounded-full bg-white text-primary text-sm font-bold`}
                    onClick={() => {setIsAccount(true)}}
                >
                    {t("Account")}
                </button>
                }
            </div>
            {
              !isAccount?
              (<div className="md:w-4/5 lg:w-3/5 space-y-4 py-2 px-2">
                <div className="text-lg font-bold">{t("Offers and Updates")}</div>
                <p className="text-md ">{t("We will send you offers from lawyers in our partner network, as well as exclusive special offers tailored just for you.")}</p>
                <SetNotificationsItem 
                  className="mb-10"
                  header={t("Special Offers")} 
                  subHeadingText={t("Offers and Updates")} 
                  text={t("We special offers from us and lawyers in our partner network.")}
                  notification = {specialOfferNotfication}
                  handleEmailChange={handleSpecialOfferEmailChange}
                  handlePushNotificationChange={handleSpecialOfferPushNotificationChange}
                />
                <div className="text-lg font-bold mt-10">{t("Update from e-fuldmagt")}</div>
                <p className="text-md mb-10">{t("Keeps you updated on the latest news from e-fultmagt and let us know how can get better.")}</p>
                <SetNotificationsItem 
                  header={t("News and Updates")} 
                  subHeadingText={t("Offers and Updates")} 
                  text={t("We special offers from us and lawyers in our partner network.")}
                  notification = {newsNotfication}
                  handleEmailChange={handleNewsEmailChange}
                  handlePushNotificationChange={handleNewsPushNotificationChange}
                />
                <SetNotificationsItem 
                header={t("Feedback")} 
                subHeadingText={t("Offers and Updates")} 
                text={t("We special offers from us and lawyers in our partner network.")}
                notification = {feedbackNotification}
                handleEmailChange={handleFeedbackEmailChange}
                handlePushNotificationChange={handleFeedbackPushNotificationChange}
                />
            </div>):
              (<div className="md:w-4/5 lg:w-3/5 space-y-4 py-2 px-2">
                <div className="text-lg font-bold">{t("Account activity and policies")}</div>
                <p className="text-md ">{t("Get notified when someone sends you a Request or that have signed.")}</p>
                <SetNotificationsItem 
                  className="mb-10"
                  header={t("Account Activity")} 
                  subHeadingText={t("Account Activity")} 
                  text={t("We will notify you about any activity")}
                  notification = {accountNotification}
                  handleEmailChange={handleAccountEmailChange}
                  handlePushNotificationChange={handleAccountPushNotificationChange}
                />
                <div className="text-lg font-bold mt-10">{t("Reminders")}</div>
                <p className="text-md mb-10">{t("Get important reminders about your power Of Attorney and your account activity.")}</p>
                <SetNotificationsItem 
                  header={t("Reminders")} 
                  subHeadingText={t("Reminders")} 
                  text={t("We will notify you about remainders.")}
                  notification = {remainderNotification}
                  handleEmailChange={handleRemainderEmailChange}
                  handlePushNotificationChange={handleRemainderPushNotificationChange}
                />
            </div>)
            }
        </div>
      )
}