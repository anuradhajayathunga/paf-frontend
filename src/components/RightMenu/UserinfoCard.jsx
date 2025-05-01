// components/UserinfoCard.jsx
import React from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const UserinfoCard = () => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-lg text-sm flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-gray-700 font-semibold">Profile Info</h2>
          <div
            onClick={handleOpen}
            className="text-blue-600 hover:underline cursor-pointer text-sm"
          >
            See all
          </div>
        </div>

        {/* User Basic Info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {user?.fname} {auth.user?.lname}
            </span>
          </div>
          <span className="text-sm text-gray-500 -mt-2">
            @{user?.email.split("@")[0]}
          </span>
          <p className="text-gray-600 text-sm leading-relaxed">
            {user?.description}
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <img src="/map.png" alt="Location" width={18} height={18} />
            <span>
              Lives in <span className="font-medium">{user?.city}</span>
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <img src="/school.png" alt="School" width={18} height={18} />
            <span>
              Studied at <span className="font-medium">Royal College</span>
            </span>
          </div> */}
          <div className="flex items-center gap-2">
            <img src="/work.png" alt="Workplace" width={18} height={18} />
            <span>
              Works at <span className="font-medium">{user?.work}</span>
            </span>
          </div>
        </div>

        {/* Links & Join Date */}
        <div className="flex justify-between items-center text-gray-500 text-sm flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <img src="/link.png" alt="Website" width={16} height={16} />
            <a
              href="https://anu.dev"
              className="text-blue-600 hover:underline font-medium"
              target="_blank"
              rel="noreferrer"
            >
              {auth.user?.fname.toLowerCase()}.dev
            </a>
          </div>
          <div className="flex items-center gap-2">
            <img src="/date.png" alt="Joined Date" width={16} height={16} />
            <span>
              Joined <span className="font-medium">December 2016</span>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm text-sm font-medium transition duration-200">
            Follow
          </button>
          <span className="text-red-400 hover:text-red-600 text-xs font-medium cursor-pointer">
            Block
          </span>
        </div>
      </div>

      <ProfileModal open={open} handleClose={handleClose} />
    </>
  );
};

export default UserinfoCard;
