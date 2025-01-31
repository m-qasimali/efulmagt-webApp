import { useEffect, useState } from "react"
import SetNotificationsItem from "../../components/UIElements/notifications/SetNotificationsItem";
import { useTranslation } from "react-i18next";
import { getNotificationSettings, setActivityNotification, setReminderNotification, updateFeedbackNotification, updateSpecialOffersNotification, updateNewsNotification } from "../../services/notification.services";
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
            let notificationSetting = res.data.data.notificationSettings
            console.log(res.data.data);
            
            setAccountNotification(notificationSetting?.activityNotification);
            setSpecialOfferNotification(notificationSetting?.specialOffers);
            setNewsNotification(notificationSetting?.news);
            setFeedbackNotification(notificationSetting?.feedback);
            setRemainderNotification(notificationSetting?.reminder);
          })
      },[])
      
      // Special Offer Notification
      const handleSpecialOfferEmailChange = (value) => {
        const updateSpecialOfferNotifications = async () => {
          try {
            const res = await updateSpecialOffersNotification(credentials.authToken, {
              email: value, 
              pushNotification: specialOfferNotfication.pushNotification
            });

            // Update local state 
            setSpecialOfferNotification(prev => ({
              ...prev,
              email: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update special offers notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateSpecialOfferNotifications();
      };

      const handleSpecialOfferPushNotificationChange = (value) => {
        const updateSpecialOfferNotifications = async () => {
          try {
            const res = await updateSpecialOffersNotification(credentials.authToken, {
              email: specialOfferNotfication.email, 
              pushNotification: value
            });

            // Update local state 
            setSpecialOfferNotification(prev => ({
              ...prev,
              pushNotification: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update special offers push notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateSpecialOfferNotifications();
      };

      // News Notification
      const handleNewsEmailChange = (value) => {
        const updateNewsNotifications = async () => {
          try {
            const res = await updateNewsNotification(credentials.authToken, {
              email: value, 
              pushNotification: newsNotfication.pushNotification
            });

            // Update local state 
            setNewsNotification(prev => ({
              ...prev,
              email: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update news notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateNewsNotifications();
      };

      const handleNewsPushNotificationChange = (value) => {
        const updateNewsNotifications = async () => {
          try {
            const res = await updateNewsNotification(credentials.authToken, {
              email: newsNotfication.email, 
              pushNotification: value
            });

            // Update local state 
            setNewsNotification(prev => ({
              ...prev,
              pushNotification: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update news push notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateNewsNotifications();
      };
      
      // Feedback Notification 
      const handleFeedbackEmailChange = (value) => {
        const updateFeedbackNotifications = async () => {
          try {
            const res = await updateFeedbackNotification(credentials.authToken, {
              email: value, 
              pushNotification: feedbackNotification.pushNotification
            });

            // Update local state 
            setFeedbackNotification(prev => ({
              ...prev,
              email: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update feedback notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateFeedbackNotifications();
      };

      const handleFeedbackPushNotificationChange = (value) => {
        const updateFeedbackNotifications = async () => {
          try {
            const res = await updateFeedbackNotification(credentials.authToken, {
              email: feedbackNotification.email, 
              pushNotification: value
            });

            // Update local state 
            setFeedbackNotification(prev => ({
              ...prev,
              pushNotification: value
            }));
            
            toast.success(res.data.message);
            console.log(res);
          } catch (error) {
            console.error("Failed to update feedback push notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateFeedbackNotifications();
      };

      // Account Notification
      const handleAccountEmailChange = (value) => {
        // Ensure accountNotification is not undefined before spreading
        const updatedAccountNotification = {
          ...accountNotification,
          email: value
        };

        const updateAccountrNotifications = async () => {
          try {
            // Use the updated notification object
            const res = await setActivityNotification(credentials.authToken, {
              email: value, 
              pushNotification: updatedAccountNotification.pushNotification
            });

            // Update local state only after successful API call
            setAccountNotification(updatedAccountNotification);
            toast.success(res.data.message);
          } catch (error) {
            console.error("Failed to update account notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        // Call the async function
        updateAccountrNotifications();
      };
      const handleAccountPushNotificationChange = (value) => {
        const updateAccountNotifications = async () => {
          try {
            const updatedAccountNotification = {
              ...accountNotification,
              pushNotification: value
            };

            const res = await setActivityNotification(credentials.authToken, updatedAccountNotification);
            
            toast.success(res.data.message);
            setAccountNotification(updatedAccountNotification);
          } catch (error) {
            console.error("Failed to update account push notification", error);
            toast.error(t("Failed to update notification settings"));
          }
        };

        updateAccountNotifications();
      };

      // Reminders Notification
      const handleRemainderEmailChange = (value)=>{
        setRemainderNotification({...remainderNotification, email:value})

        const updateReminderNotifications = async ()=>{
          await setReminderNotification(credentials.authToken, {email:value, pushNotification:remainderNotification.pushNotification})
          .then((res)=>{
            toast.success(res.data.message);
          })
        } 
        updateReminderNotifications();
      }
      const handleRemainderPushNotificationChange = (value)=>{
        setRemainderNotification({...remainderNotification, pushNotification:value})
        const updateReminderNotifications = async ()=>{
          await setReminderNotification(credentials.authToken, {email:remainderNotification.email, pushNotification:value})
          .then((res)=>{
            toast.success(res.data.message);
          })
        } 
        updateReminderNotifications();
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