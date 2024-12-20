import { useEffect, useState } from "react";
import SettingsSVG from "../../assets/icons/settings.svg?react"
import NotificationItem from "../../components/UIElements/notifications/NotificationItem";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back.svg?react";
import BadgeNumber from "../../components/UIElements/notifications/BadgeNumber";
import { getUserNotifications } from "../../services/notification.services";
import { useCredentials } from "../../context/CrendentialsContext";
import { useTranslation } from "react-i18next";

export default function AllNotifications(){
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [unread, setUnread] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [credentials, setCredentials] = useCredentials();
      const [earlierNotifications, setEarlierNotifications] = useState([]);
      const [todayNotifications, setTodayNotifications] = useState([]);

      const LOAD_MORE = 6;

      const loadMoreNotifications = ()=>{
        let num = earlierNotifications.length + todayNotifications.length;

        let newEarlierNotifications = []
        let newTodayNotifications = []
        let currentUnread = 0;
        for(let i = num; i<notifications.length && i<num+LOAD_MORE; i++){
            if(notifications[i].section=="today"){
                newTodayNotifications.push(notifications[i])
            }
            else{
                newEarlierNotifications.push(notifications[i]);
            }
            if(!notifications[i].read){
                currentUnread++;
            }
        }
        setUnread(unread+currentUnread)
        setEarlierNotifications([...earlierNotifications, ...newEarlierNotifications]);
        setTodayNotifications([...todayNotifications, ...newTodayNotifications]);
      }

      useEffect(()=>{
        getUserNotifications(credentials.authToken).then((result)=>{
            let fetchedNotifications = result.data.data.notifications;
            setNotifications(fetchedNotifications);
        })
      },[]);

      useEffect(()=>{
        loadMoreNotifications();
      },[notifications])
      
      return(
        <div className="h-full w-full justify-center">
            <div className="flex w-full justify-between">
                <div className="flex items-center space-x-2 my-3">
                    <button onClick={()=>{
                        navigate(-1)
                    }}>
                    <BackIcon></BackIcon>
                    </button> {" "}
                    <p className="text-lg md:text-3xl font-bold">
                    {t("Notifications")}
                    </p>
                    <BadgeNumber number={unread} className={"w-[52px] h-[26px] text-md font-semibold"} width={"52px"} height={"26px"}/>
                </div>
                <button className="flex flex-col items-center"
                    onClick={()=>{
                        navigate('/notifications/settings')
                    }}
                >
                    <SettingsSVG/>
                    <p className="">{t("Settings")}</p>
                </button>
            </div>
            <div className="flex justify-center w-full overflow-auto">
                
                
                <div className="flex flex-col w-4/5 lg:w-3/5 ">
                    {
                        todayNotifications.length>0 &&
                        <div className="text-md font-bold">Today</div>
                        
                    }
                    {
                        todayNotifications.map(
                            (item)=>{
                                return <NotificationItem key={item.id} item={item}/>
                            }
                        )
                    }
                    {
                        earlierNotifications.length>0 &&
                        <div className="mt-10 text-md font-bold">Earlier</div>
                    }
                    {
                        earlierNotifications.map(
                            (item)=>{
                                return <NotificationItem key={item.id} item={item}/>
                            }
                        )
                    }
                    <div className="flex w-full justify-center items-center my-10"> 
                        <button
                        hidden = {(notifications.length <= earlierNotifications.length+todayNotifications.length)?true:false}
                        className="text-md bg-gray-200 w-[180px] h-[50px] border border-solid border-black rounded-lg"
                        onClick={
                            ()=>{
                                loadMoreNotifications();
                            }
                        }>
                            {t("Load More")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )
}