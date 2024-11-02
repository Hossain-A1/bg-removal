import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Upload = () => {

  const {removeBG} =useContext(AppContext)
  return (
    <div className="pb-16">
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-medium bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5 md:py-16'>
        See the magic. Try now
      </h1>

      <div className='text-center mb-24'>
        <input onChange={(e)=>removeBG(e.target.files[0])} accept="image/*" type='file' id='image2' hidden />
        <label
          htmlFor='image2'
          className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'
        >
          <img width={20} src={assets.upload_btn_icon} alt='upload btn' />
          <p className='text-white text-sm'>Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
