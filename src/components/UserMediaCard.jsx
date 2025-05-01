import { Link } from "react-router-dom";
import React from "react";

const UserMediaCard = () => {
  const mediaUrls = [
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8940023/pexels-photo-8940023.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm text-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-semibold text-base">User Media</span>
        <Link href="/" className="text-blue-500 text-xs hover:underline">
          See all
        </Link>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {mediaUrls.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
            <img
              src={url}
              alt={`media-${index}`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaCard;
