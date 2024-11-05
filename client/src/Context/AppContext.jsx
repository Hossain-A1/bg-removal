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
if(backendUrl){
  console.log(backendUrl);
}
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

      const token = await getToken();
      const formData = new FormData();
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-bg",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        setResultImage(data.payload.resultImage);
        data.payload.creditBalance && setCredit(data.payload.creditBalance);
      } else {
        alert("Something went wrong");
        if (data.payload.creditBalance === 0) {
          navigate("/buy-credits");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = { setCredit, credit, backendUrl, loadCreditsData, removeBG,image,resultImage,setResultImage };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
