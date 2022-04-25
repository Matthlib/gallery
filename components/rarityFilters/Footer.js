import React from "react";
import { FiCoffee } from "react-icons/fi";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io";

export const Footer = () => {
  return (
    <div className="flex flex-col border-t-1 border w-full p-4 mt-4 items-center text-xs justify-center">
      <a
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
        href="https://twitter.com/Mattlib"
        target="_blank"
      >
        <span className="text-lg mr-1">
          <IoLogoTwitter />
        </span>
        Twitter
      </a>
      <a
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
        href="https://github.com/mattlib"
        target="_blank"
      >
        <span className="text-lg mr-1">
          <IoLogoGithub />
        </span>
        Github
      </a>
      <a
        className="flex items-center mb-4 text-gray-600 hover:text-gray-900"
        href="https://etherscan.io/address/0x5D56a3e85C52b8d3AC595A3922eA7E1a3EA948a0"
        target="_blank"
      >
        <span className="text-lg mr-1">
          <FiCoffee />
        </span>
        Buy me coffee
      </a>
    </div>
  );
};
