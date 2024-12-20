import React, { useState } from "react";
import { HeadProvider, Title, Meta } from "react-head";
import sideImage from '../../../assets/registration/sidephoto.jpeg';

const AuthenticationLayout = ({ children }) => {

  return (
    <>
      <HeadProvider>
        <Title>
          Fuldmaget
        </Title>
        <Meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </HeadProvider>
      <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="h-screen justify-center flex w-full bg-white shadow-lg overflow-hidden">
        {/* Left Image Section */}
        <img
          className="hidden md:block w-1/2 bg-cover object-cover"
          src={sideImage}
        ></img>

        {/* Right Form Section */}
        {children}
      </div>
    </div>
    </>
  );
};

export default AuthenticationLayout;