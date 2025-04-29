import Link from "next/link";
import React from "react";

const UserinfoCard = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg text-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-gray-700 font-semibold">Profile Info</h2>
        <Link href="/" className="text-blue-600  text-sm">
          See all
        </Link>
      </div>

      {/* User Basic Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            Lorem Fleming
          </span>
          <span className="text-sm text-gray-500">@lormflemi</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
          suscipit? Autem nobis necessitatibus officiis.
        </p>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-3 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <img src="/map.png" alt="Location" width={18} height={18} />
          <span>
            Lives in <span className="font-medium">Kandy</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/school.png" alt="School" width={18} height={18} />
          <span>
            Studied at <span className="font-medium">Royal College</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/work.png" alt="Workplace" width={18} height={18} />
          <span>
            Works at <span className="font-medium">Google Inc.</span>
          </span>
        </div>
      </div>

      {/* Links & Join Date */}
      <div className="flex justify-between items-center text-gray-500 text-sm flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <img src="/link.png" alt="Website" width={16} height={16} />
          <Link
            href="https://anu.dev"
            className="text-blue-600 hover:underline font-medium"
          >
            anu.dev
          </Link>
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
  );
};

export default UserinfoCard;
