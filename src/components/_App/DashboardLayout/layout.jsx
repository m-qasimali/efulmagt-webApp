import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import rightImage from "../../../assets/dashboard/right-side.png";
import leftImage from "../../../assets/dashboard/left-side.png";
import HomeIcon from "../../../assets/icons/home.svg?react";
import NotificationIcon from "../../../assets/icons/notification.svg?react";
import ProfileDropdown from "../../UIElements/dropdowns/profileDropdown";
import DashboardDrawer from "../../UIElements/drawers/dashboardDrawer";
import TopNavbarButton from "../../UIElements/buttons/topNavBarButton";
import BackIcon from "../../../assets/icons/back.svg?react";
import { useCredentials } from "../../../context/CrendentialsContext";
const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const [title, setTitle] = useState(null);
  const [credentials, setCredentials] = useCredentials()
  const [menuItems, setMenuItems] = useState([
    {
      text: "Home",
      path: "/home",
      navigate: "/home",
      Icon: HomeIcon,
      iconType: "svg",
      isSelected: false,
    },
    {
      text: "Notifications",
      path: "/notifications",
      navigate: "/notifications",
      Icon: NotificationIcon,
      iconType: "svg",
      isSelected: true,
    },
    {
      text: "Profile",
      path: "/settings",
      navigate: "/settings",
      Icon: credentials.user?.image || "",
      imgClassName: "rounded-full",
      iconType: "img",
      isSelected: false,
    },
  ]);

  const locationTitles = {
    "allFuldmagts": "My e-Fuldmagts",
    "e-fuldmagts": "e-fuldmagt for package Collection",
    "e-fuldmagt-requests":  "e-fuldmagt for package Collection",
    profile: "Profile",
    "e-fuldmagts/request": "e-Fuldmagt Request/Send",
    "notifications/settings": "Notifcations Settings",
    works: "How it Works",
    contactus: "Contact Us",
    services: "Terms of  Services for  e-fuldmagt",
    privacy: "Privacy Policy for e-fuldmagt",
    "settings/login": "Login Safety",
    "settings/user": "Personal Information",
    "settings/signatures": "Signatures",
    "settings/company": "Company Information",
    "settings/address": "Update Address",
    "settings/add-company": "Add Company",
  };
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const toogleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    let copyMenuItems = [...menuItems];
    copyMenuItems.forEach((menuItem) => {
      menuItem.isSelected = menuItem.navigate.includes(location.pathname);
    });
    setMenuItems(copyMenuItems);

    let key = Object.keys(locationTitles).find((key) =>
      location.pathname.includes(key)
    );
    if (key) {
      setTitle(locationTitles[key]);
    } else {
      setTitle(null);
    }
  }, [location]);

  useEffect(()=>{
    setMenuItems((oldValues)=>{
      let newMenuItems = [...oldValues];
      if(credentials.user && credentials.selected == "user")
        newMenuItems[2].Icon = credentials.user.image;
      if(credentials.company && credentials.selected == "company")
        newMenuItems[2].Icon = credentials.company.image;
      return newMenuItems;
    })
  }, [credentials])
  return (
    <>
      <div className="relative flex flex-col h-screen bg-white px-10">
        {/* Background Images */}
        <img
          src={rightImage}
          className="z-0 absolute top-0 right-0 w-[60vh] h-screen"
        />
        <img
          src={leftImage}
          className="z-0  absolute left-0 bottom-0 w-[20vh] h-[50vh]"
        />

        <div className="mt-10 h-[85px]  justify-between items-center hidden md:flex">
        <Link
            to="/home"
          >
          <img className="w-[75px]" src={"/images/logo.jpeg"}></img>
          </Link>
          <div className="z-10 h-[75px] bg-white flex items-center w-2/5 lg:w-4/12 justify-around rounded-full shadow-md">
            {menuItems.map((item) => {
              return (
                <TopNavbarButton
                  onClick={() => {
                    navigate(item.navigate);
                  }}
                  Icon={item.Icon}
                  isSelected={item.isSelected}
                  text={"Home"}
                  iconType={item.iconType}
                  imgClassName={item.imgClassName}
                >
                  {item.text}
                </TopNavbarButton>
              );
            })}
          </div>
          <ProfileDropdown />
        </div>
        <div className="mt-10 h-[35px]  justify-between items-center flex md:hidden">
          <Link
            to="/home"
          >
          <img className="w-[30px]" src={"/images/logo.jpeg"}></img>
          </Link>

          <DashboardDrawer />
        </div>
        <div className="z-10 w-full">
          {title ? (
            <div className="flex items-center space-x-2 my-3">
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                <BackIcon></BackIcon>
              </button>{" "}
              <p className="text-lg md:text-3xl font-bold">{title}</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="my-5 w-full h-full z-20 overflow-auto no-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
