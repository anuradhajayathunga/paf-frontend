import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      {/* Cover + Avatar */}
      <div className="relative h-32">
        <img
          src={user?.cover || "/assets/avatars/def.jpeg"}
          alt="Cover"
          className="rounded-md object-cover w-full h-full"
        />
        <img
          src={user?.avatar || "/assets/cover/def.jpeg"}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-1/2 -bottom-6 transform -translate-x-1/2 ring-2 ring-white z-10"
        />
      </div>

      {/* User Info */}
      <div className="pt-8 flex flex-col items-center gap-2">
        <span className="font-semibold text-gray-800 capitalize">
          {auth.user?.fname} {auth.user?.lname}
        </span>

        {/* Followers */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src="https://images.pexels.com/photos/3285746/pexels-photo-3285746.jpeg"
                alt={`Follower ${i + 1}`}
                width={24}
                height={24}
                className="rounded-full w-6 h-6 border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">1K Followers</span>
        </div>

        {/* Profile Link */}
        <Link to={`/profile/${user?.id}`}>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 transition text-white text-xs px-4 py-1.5 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
