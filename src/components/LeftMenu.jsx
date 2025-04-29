import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import Ads from "./Ads";

const LeftMenu = ({ type }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/posts.png" alt="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/activity.png" alt="" width={20} height={20} />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        {/* <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/market.png" alt="" width={20} height={20} />
          <span>Marketplace</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" /> */}
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/events.png" alt="" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/albums.png" alt="" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/videos.png" alt="" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/news.png" alt="" width={20} height={20} />
          <span>News</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/courses.png" alt="" width={20} height={20} />
          <span>Courses</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" />
        {/* <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/lists.png" alt="" width={20} height={20} />
          <span>Lists</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center" /> */}
        <Link
          to="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <img src="/settings.png" alt="" width={20} height={20} />
          <span>Settings</span>
        </Link>
      </div>
      <Ads size="sm" />
    </div>
  );
};

export default LeftMenu;
