import { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import DashboardLayout from "./components/_App/DashboardLayout/layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Authentication/signup";
import CreatePasscode from "./pages/Authentication/createpasscode";
import AuthenticationLayout from "./components/_App/AuthenticationLayout/layout";
import Login from "./pages/Authentication/login";
import ForgotPasscode from "./pages/Authentication/forgotPasscode";
import Home from "./pages/Home/home";
import PackageCollection from "./pages/packageCollection/PackageCollection";
import PackageCollectionRequest from "./pages/packageCollection/PackageCollectionRequest";
import PackageCollectionAssign from "./pages/packageCollection/PackageCollectionAssign";
import AllNotifications from "./pages/Notifications/ViewNotifcations";
import NotificationsSettings from "./pages/Notifications/NotificationsSettings";
import HowItWorks from "./pages/Others/HowItWorks";
import ContactUs from "./pages/Others/ContactUs";
import Services from "./pages/Others/Services";
import PrivacyPolicy from "./pages/Others/PrivacyPolicy";
import LoginSettings from "./pages/Settings/LoginSettings";
import Settings from "./pages/Settings/Settings";
import UserSettings from "./pages/Settings/UserSettings";
import CompanySettings from "./pages/Settings/CompanySettings";
import AddressSettings from "./pages/Settings/AddressSettings";
import AddCompany from "./pages/Settings/AddCompany";
import { useCredentials } from "./context/CrendentialsContext";
import SignatureSettings from "./pages/Settings/SignatureSettings";
import ViewAllFuldmagts from "./pages/Fuldmagts/ViewAllFuldmagts";
import EFuldmagt from "./pages/packageCollection/EFuldmagt";
import EFuldmagtRequest from "./pages/packageCollection/EFuldmagtRequest";
const { VITE_APP_VAPID_KEY } = import.meta.env;
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebaseConfig";
import { addNotifcationId } from "./services/notification.services";
import { toast } from "react-toastify";
import { useFetchData } from "./context/FetchDataContext";
import { getUser } from "./services/user.services";

const { SERVER_HOST } = import.meta.env;

export default function App() {
  const [credentials, setCredentials] = useCredentials();
  const {setFetchAgain} = useFetchData();
  async function requestPermission() {
    //requesting permission using Notification API
    
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      addNotifcationId(credentials.authToken, {notificationId: token}).then((res)=>{
        // console.log(res.data.message);
      }).catch((err)=>{
        console.log(err);
        if (err.response.data.message == "Invalid Token"){
          
        }
        console.log(err.response.data.message);
      })
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(userId);
        console.log(res);
        setCredentials({
          ...res.data.data,
          authToken: localStorage.getItem("token"),
          selected: "user"
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCredentials(null);
      }
    };
    
    if (userId) {
      getUserData();
    }
  }, []); 

  const verifyCredentials = useCallback(() => {
    // console.log(credentials);
    if (credentials == null) return;
    fetch("https://backend.e-fuldmagt.dk/" + "user/refreshTokenCall", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.authToken,
      },
      body: JSON.stringify({
        refreshToken: credentials.refreshToken,
      }),
    }).then(async (response) => {
      if (response.ok) {
        const responseBody = await response.json();
        // console.log("resBody", responseBody);
        setCredentials((oldData) => {
          return {
            ...oldData,
            authToken: responseBody.data.authToken,
            refreshToken: responseBody.data.refreshToken,
          };
        });
      } else {
        //setCredentials(null);
      }
      // call refreshToken every 14 minutes to renew the authentication token.
      setTimeout(verifyCredentials, 14 * 60 * 1000);
    });
  }, [setCredentials]);

  useEffect(() => {

    verifyCredentials();
  }, [verifyCredentials]);

  useEffect(() => {
    //Assigning Notification Id//
    if(credentials != null)
      requestPermission();
  }, [credentials]);

  onMessage(messaging, (payload) => {
    toast(payload.notification.body);
    setFetchAgain(prev => !prev);
  });
  return (
    <>
      <BrowserRouter>
        <>
          {credentials === null ? (
            <AuthenticationLayout>
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Navigate to="/signin" />} />
                  <Route path="signin" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="create-passcode" element={<CreatePasscode />} />
                  <Route path="forgot-passcode" element={<ForgotPasscode />} />
                </Route>
              </Routes>
            </AuthenticationLayout>
          ) : credentials.authToken ? (
            <DashboardLayout>
              <Routes>
                <Route path="/">
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="home" element={<Home />} />
                  <Route
                    path="e-fuldmagts/request"
                    element={<PackageCollectionRequest />}
                  />
                  <Route
                    path="e-fuldmagts/assign"
                    element={<PackageCollectionAssign />}
                  />
                  <Route
                    path="e-fuldmagts/:id"
                    element={<EFuldmagt />}
                  />
                  <Route
                    path="e-fuldmagt-requests/:id"
                    element={<EFuldmagtRequest />}
                  />
                  <Route path="allFuldmagts" element={<ViewAllFuldmagts />} />
                  <Route path="notifications" element={<AllNotifications />} />
                  <Route
                    path="notifications/settings"
                    element={<NotificationsSettings />}
                  />
                  <Route path="works" element={<HowItWorks />} />
                  <Route path="contactus" element={<ContactUs />} />
                  <Route path="services" element={<Services />} />
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="settings/login" element={<LoginSettings />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="settings/user" element={<UserSettings />} />
                  <Route
                    path="settings/company"
                    element={<CompanySettings />}
                  />
                  <Route
                    path="settings/address"
                    element={<AddressSettings />}
                  />
                  <Route path="settings/add-company" element={<AddCompany />} />
                  <Route
                    path="settings/signatures"
                    element={<SignatureSettings />}
                  />
                </Route>
              </Routes>
            </DashboardLayout>
          ) : (
            <>h</>
            // <Loader />
          )}
        </>
      </BrowserRouter>
    </>
  );
}
