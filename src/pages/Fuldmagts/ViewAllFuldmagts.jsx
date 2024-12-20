import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back.svg?react";
import { getFuldmagtsList } from "../../services/fuldmagt.services";
import { useCredentials } from "../../context/CrendentialsContext";
import { useTranslation } from "react-i18next";
import { formatToDateOnly } from "../../utils/datefunctions";

export default function ViewAllFuldmagts() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [fuldmagts, setFuldmagts] = useState([]);
  const [credentials] = useCredentials();
  const [visibleFuldmagts, setVisibleFuldmagts] = useState([]);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState(false);

  const LOAD_MORE = 4;

  const loadMoreFuldmagts = () => {
    const num = visibleFuldmagts.length;
    const newVisibleFuldmagts = fuldmagts.slice(0, num + LOAD_MORE);
    setVisibleFuldmagts(newVisibleFuldmagts);

    if (newVisibleFuldmagts.length >= fuldmagts.length) {
      setIsLoadMoreVisible(false);
    }
  };

  useEffect(() => {
    getFuldmagtsList(credentials.authToken).then((result) => {
      const fetchedFuldmagts = result.data.data.fuldmagts;
      setFuldmagts(fetchedFuldmagts);
      console.log(fetchedFuldmagts)
      setVisibleFuldmagts(fetchedFuldmagts.slice(0, LOAD_MORE));

      if (fetchedFuldmagts.length > LOAD_MORE) {
        setIsLoadMoreVisible(true);
      }
    });
  }, [credentials.authToken]);

  //   useEffect(() => {
  //     loadMoreFuldmagts();
  //   }, [fuldmagts]);

  const EFuldmagtItem = ({ item }) => (
    <Link
      className="flex items-center justify-between px-4 border mb-1 rounded-lg  cursor-pointer h-[90px]"
      to= {
        (item.status == "sent_request" || item.status == "received_request")?
          ("/e-fuldmagt-requests/" + item._id):
          ("/e-fuldmagts/" + item._id)
      }
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
          <p className="font-semibold text-md">Validity</p>

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
    <div className="h-full w-full justify-center">
      <div className="flex justify-center w-full overflow-auto">
        <div className="w-full bg-white rounded-lg shadow-md outline-gray-200 outline outline-1 p-2">

          {visibleFuldmagts.map((item) => (
            <EFuldmagtItem key={item._id} item={item} />
          ))}

          {isLoadMoreVisible && (
            <div className="flex w-full justify-center items-center my-10">
              <button
                className="text-md bg-gray-200 w-[180px] h-[50px] border border-solid border-black rounded-lg"
                onClick={loadMoreFuldmagts}
              >
                {t("Load More")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
