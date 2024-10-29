import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className='flex items-center justify-between gap-5 px-4 lg:px-44 py-3'>
      <img width={150} src={assets.logo} alt='logo' />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @Hossain.dev | All right reserved.</p>
      <div className="flex gap-1">
        <img
          className=''
          width={40}
          src={assets.facebook_icon}
          alt='facebook icon'
        />
        <img width={40} src={assets.twitter_icon} alt='twitter icon' />
        <img width={40} src={assets.google_plus_icon} alt='google plus icon' />
      </div>
    </footer>
  );
};

export default Footer;
