import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { credit, loadCreditsData } = useContext(AppContext);
  const { isSignedIn, user } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && credit >= 0) {
      navigate("/", { replace: true });
      loadCreditsData();
    }
  }, [isSignedIn]);
  return (
    <header className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to='/'>
        <img className='w-22 sm:w-44' src={assets.logo} alt='logo' />
      </Link>

      {isSignedIn ? (
        <div className='flex items-center gap-2 sm:gap-3'>
          <button
            onClick={() => navigate("/buy-credits")}
            className='flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-700'
          >
            <img className='w-5' src={assets.credit_icon} alt='credit icon' />
            <p className='text-xs sm:text-sm text-gray-600 font-medium'>
              Credits: {credit}
            </p>
          </button>
          <p className='text-gray-600 max-sm:hidden'>Hi, {user.fullName}</p>
          <UserButton />
        </div>
      ) : (
        <button
          onClick={() => openSignIn({})}
          className='bg-zinc-800 text-white flex items-center gap-2 sm:gap-4 px-3 py-2 sm:px-8 sm:py-3 text-sm rounded-full'
        >
          Get started{" "}
          <img
            className='w-3 sm:w-4'
            src={assets.arrow_icon}
            alt='arrow icon'
          />
        </button>
      )}
    </header>
  );
};

export default Navbar;
