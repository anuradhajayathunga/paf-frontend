import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import  { LeftMenuNavigation } from "./LeftMenuNavigation";
import Ads from "../Ads";

const LeftMenu = ({ type }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        {LeftMenuNavigation.map((item, index) => (
          <div key={index}>
            <Link
              to={item.path}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
            >
              <img src={item.icon} alt={item.title} width={20} height={20} />
              <span>{item.title}</span>
            </Link>
            {index < LeftMenuNavigation.length - 1 && (
              <hr className="border-t-1 border-gray-50 w-36 self-center" />
            )}
          </div>
        ))}
      </div>
      {/* <Ads size="sm" /> */}
    </div>
  );
};

export default LeftMenu;
