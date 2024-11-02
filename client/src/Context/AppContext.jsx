import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const loadCreditsData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.payload);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeBG = async (image) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      setImage(image);
      setResultImage(false);

      navigate("/result");
    } catch (error) {}
  };

  const value = { setCredit, credit, backendUrl, loadCreditsData, removeBG };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
