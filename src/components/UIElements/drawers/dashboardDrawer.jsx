import { useEffect, useRef, useState } from "react";
import HomeSVG from '../../../assets/icons/home.svg';
import NotificationSVG from '../../../assets/icons/notification.svg';
import SideNavbarButton from "../buttons/sideNavBarButton";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../../../assets/icons/menu.svg?react"
import { useCredentials } from "../../../context/CrendentialsContext";
export default function DashboardDrawer({}){
    const [credentials, setCredentials] = useCredentials();
    
    const menuItems = [{
      "text": "Home",
      "path": "/home",
      "navigate": "/home",
      "icon": HomeSVG
    },{
      "text": "Notifications",
      "path": "/notifications",
      "navigate": "/notifications",
      "icon": NotificationSVG
    }
    ]
    const navigate = useNavigate();
    const [isEmailVisible, setIsEmailVisible] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const blurRef = useRef(null);
    const toggleDrawer = ()=>{
        setDrawer(!drawer);
    }

    const toggleEmailVisibility = () => {
      setIsEmailVisible(!isEmailVisible);
    };

    const handleClickOutside = (event) => {
        if (blurRef.current && blurRef.current.contains(event.target) ) {
            setDrawer(false);
        }
    };

    useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);

    return(
        <div className="text-center z-40">
            <button
            onClick={()=>{
                toggleDrawer()
            }}
            className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
              <MenuIcon/>
            </button>
            <div ref={blurRef} className={"fixed top-0 left-0 z-30 h-screen w-screen p-4 blur-lg bg-white opacity-80 "+(drawer?"-translate-x-0":"-translate-x-full")}>
            </div>
            <div id="drawer-example" className={"flex flex-col shadow fixed top-0 left-0 z-40 h-screen p-4 transition-transform w-80 bg-white "+(drawer?"-translate-x-0":"-translate-x-full")} aria-labelledby="drawer-label">
             {/* Profile Section with Toggle Arrow */}
      <div className="flex items-center justify-between">
        <div className="flex items-center mt-4  cursor-pointer"
        
        onClick={()=>{
          navigate('/settings');
          setDrawer(false);
        }}
        >
          {
            credentials.selected == "user"?
            <img
              src={credentials.user.image  || ""}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />:
            <img
              src={credentials.company.image  || ""}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
          }
          {
            credentials.selected == "user"?
            <div className="ml-4">
              <h2 className="font-semibold">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</h2>
              <p className="text-sm text-gray-500">{credentials.user.email}</p>
            </div>:
            <div className="ml-4">
              <h2 className="font-semibold">{credentials.company.companyName}</h2>
              <p className="text-sm text-gray-500">{credentials.company.email}</p>
            </div>
          }
        </div>
        {
          credentials.company && 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 text-gray-500 transition-transform duration-200  cursor-pointer ${
              isEmailVisible ? 'rotate-180' : ''
            }`}
            onClick={toggleEmailVisibility}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        }
        
      </div>

      {/* Email List */}
      {isEmailVisible && (
        <div className="mt-4">
          {
            credentials.selected == "user"?
            <button onClick={()=>{
              setCredentials((oldValues)=>{
                return {
                  ...oldValues, 
                  selected: "company"
                }
              })

              setIsEmailVisible(false);
            }} className="flex w-full items-center my-2">
              <img
                src={credentials.company.image}
                alt="Email 1"
                className="w-6 h-6 rounded-full"
              />
              <p className="ml-2 text-sm text-gray-500">{credentials.company.companyName}</p>
            </button>:
            <button onClick={()=>{
              setCredentials((oldValues)=>{
                return {
                  ...oldValues, 
                  selected: "user"
                }
              })

              setIsEmailVisible(false);
            }}
            className="flex w-full items-center my-2">
            <img
              src={credentials.user.image}
              alt="Email 1"
              className="w-6 h-6 rounded-full"
            />
            <p className="ml-2 text-sm text-gray-500">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</p>
          </button>
          }
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Navigation Links */}
      <div className="space-y-4">
        {menuItems.map(
          (item)=>{
            return <SideNavbarButton onClick={()=>{
              navigate(item.navigate);
              setDrawer(false);

            }} icon={item.icon}>
            {item.text}
          </SideNavbarButton>
          }
        )}
      </div>
      <div className="h-full flex flex-col justify-end">
          <SideNavbarButton onClick={()=>{setCredentials(null); navigate("/")}} icon={NotificationSVG}>
            Logout
          </SideNavbarButton>
      </div>
    </div>
  </div>
    )
}