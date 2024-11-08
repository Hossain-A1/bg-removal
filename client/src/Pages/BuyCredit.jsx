import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const BuyCredit = () => {
  const { getToken } = useAuth();

  const { backendUrl } = useContext(AppContext);

  const handlePurchase = async (planId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/pay",
        { planId },
        { headers: { token } }
      );
      if (!data.success) {
        alert(
          "You have enough credits.You have to login with another account to get credits."
        );
      }

      if (data.success && data.session_url) {
        // Redirect to the Stripe checkout page
        window.location.href = data.session_url;
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>
        Our Plans
      </button>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-medium bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10'>
        {"Choose the plan's right for you"}
      </h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, i) => (
          <div
            key={i}
            className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500'
          >
            <img width={40} src={assets.logo_icon} alt='logo icon' />
            <p className='mt-3 font-semibold'>{item.id}</p>
            <small>{item.desc}</small>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price}/ </span>
              {item.credits} credits
            </p>
            <button
              onClick={() => handlePurchase(item.id)}
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
