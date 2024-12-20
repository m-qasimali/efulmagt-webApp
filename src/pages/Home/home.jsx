import homeNavImage from "../../assets/home/topNav.png";
import PackageSVG from "../../assets/icons/package.svg?react";
import othersSVG from "../../assets/icons/others.svg";
import { Link, useNavigate } from "react-router-dom";
import NotificationItem from "../../components/UIElements/notifications/NotificationItem";
import BadgeNumber from "../../components/UIElements/notifications/BadgeNumber";
import { useEffect, useState } from "react";
import { getFuldmagtsList } from "../../services/fuldmagt.services";
import { useCredentials } from "../../context/CrendentialsContext";
import { formatToDateOnly } from "../../utils/datefunctions";
import { getUserNotifications } from "../../services/notification.services";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [credentials, setCredentials] = useCredentials();
  const [fuldmagts, setFuldmagt] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [todayNotifications, setTodayNotifications] = useState([]);
  const [earlierNotifications, setEarlierNotifications] = useState([]);
  useEffect(() => {
    getFuldmagtsList(credentials.authToken).then((result) => {
      let fetchedFuldmagts = result.data.data.fuldmagts;
      if (fetchedFuldmagts.length >= 4)
        fetchedFuldmagts = fetchedFuldmagts.slice(0, 4);
      console.log(fetchedFuldmagts);
      setFuldmagt(fetchedFuldmagts);
    });

    getUserNotifications(credentials.authToken).then((result) => {
      let fetchedNotifications = result.data.data.notifications;
      let unreadNotificatons = 0;
      fetchedNotifications.forEach((notification)=>{
        if(notification.read == false)
        {
          unreadNotificatons++;
        }
      })
      setUnread(unreadNotificatons)
      if (fetchedNotifications.length >= 5)
        fetchedNotifications = fetchedNotifications.slice(0, 5);
      setTodayNotifications(fetchedNotifications.filter((notification)=>notification.section == "today"));
      setEarlierNotifications(fetchedNotifications.filter((notification)=>notification.section == "earlier"));
    });
  }, []);

  const NotificationSection = ({ title, items }) => (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {items.map((item) => (
        <NotificationItem key={item._id} item={item} />
        // <NotificationItem key={item.id} item={item} />
      ))}
    </div>
  );

  const EFuldmagtItem = ({ item }) => (
    <Link
      to= {
        (item.status == "sent_request" || item.status == "received_request")?
          ("/e-fuldmagt-requests/" + item._id):
          ("/e-fuldmagts/" + item._id)
      }
      className="flex items-center justify-between px-4 border mb-1 rounded-lg  cursor-pointer h-[90px]"
    >
      <div className="flex items-center">
        <img
          src={item.postImage}
          alt={item.title}
          className="w-[70px] h-[70px] rounded-full mr-4 object-cover"
        />
        <div className="flex flex-col justify-between h-[70px]">
          <p className="font-semibold text-md">
            {item.title}{" "}
            <span className="text-gray-500 text-xs">
              Issued: {formatToDateOnly(item.createdAt)}
            </span>
          </p>

          <p className="text-gray-500 text-xs">
            e-fuldmagt for <br />
            {item.fuldmagtGiverName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-between items-end h-[70px]">
          <p className="font-semibold text-md text-xs">Validity</p>

          <p
            className={`font-semibold text-xs ${
              item.validity == "expired" || item.validity == "revoked"
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {item.validity == "expired" || item.validity == "revoked" || item.validity == "request"
              ? item.validity
              : formatToDateOnly(item.validity)}
          </p>
        </div>
      </div>
    </Link>
  );
  return (
    <div className="flex flex-col w-full h-full">
      {/*Home Top Card*/}
      <div className="relative w-full rounded-lg h-[389px] min-h-[389px]">
        {/*Background Image*/}
        <img
          src={homeNavImage}
          className="z-[0] absolute top-0 left-0 w-full  rounded-lg h-[295px]"
        />
        {/*Text*/}
        <h2 className="z-[1] text-xl font-semibold absolute text-white top-3 left-3">
          {t("Request or send")}
          <br />
          {t("e-fuldmagt")}
        </h2>
        {/* Text and Cards */}
        <div className="flex flex-col h-full w-full justify-end">
          <div className="flex space-x-4 justify-center">
            {/* Package Collection Card */}
            <button
              className="relative z-[2] flex flex-col bg-white text-blue-600 rounded-lg shadow-lg h-[222px] w-[212px] text-left"
              onClick={() => {
                navigate("/e-fuldmagts/request");
              }}
            >
              <div className="absolute left-4 top-[75px]">
                <PackageSVG className="text-secondary fill-current stroke-current mb-2 h-[64px] w-[64px]" />
                <p className="text-xl font-semibold text-primary">
                  {t("Package")} <br />
                  {t("Collection")}{" "}
                </p>
              </div>
            </button>

            {/* Other Card */}
            <button
              className="relative z-[2] flex flex-col bg-white text-blue-600 rounded-lg shadow-lg h-[222px] w-[212px] text-left"
              onClick={() => {
                navigate("/others");
              }}
            >
              <div className="absolute left-4 top-[75px]">
                <img
                  src={othersSVG}
                  alt="Others"
                  className="mb-2 h-[64px] w-[64px]"
                />
                <p className="text-xl font-semibold text-primary">
                  {t("Others")}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="my-5"></div>
      <div className="space-y-5 md:space-y-0 md:flex  md:space-x-12 md:justify-between p-2">
        <div className="w-full bg-white rounded-lg shadow-md outline-gray-200 outline outline-1  p-2">
          <Link to={"/allFuldmagts"}>
            <h2 className="text-center text-xl font-semibold p-4">
              {t("My e-fuldmagt")}
            </h2>
          </Link>
          {fuldmagts.map((item) => (
            <EFuldmagtItem key={item._id} item={item} />
          ))}
        </div>
        <div className="w-full bg-white rounded-lg shadow-md outline-gray-200 outline outline-1 p-2">
          <Link
            to="/notifications"
            className="flex items-center justify-center"
          >
            <h2 className="text-center text-xl font-semibold p-4 text-lg">
              {"Notifications"}
            </h2>
            <BadgeNumber
              number={unread}
              className={"h-[19px] w-[40px] text-sm font-semibold"}
            />
          </Link>
          {
            todayNotifications.length>0 &&
            <NotificationSection
              title={t("Today")}
              items={todayNotifications}
            />
          }
          {
            earlierNotifications.length>0 &&
            <NotificationSection
              title={t("Earlier")}
              items={earlierNotifications}
            />
          }
        </div>
      </div>
    </div>
  );
}
