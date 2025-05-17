import React from "react";

const Ads = ({ size }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-600">Sponsored Ads</span>
        <img
          src="/more.png"
          alt="More Options"
          width={16}
          height={16}
          className="cursor-pointer opacity-70 hover:opacity-100 transition"
        />
      </div>

      {/* Ad Content */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        {/* Ad Image */}
        <div
          className={`relative w-full rounded-lg overflow-hidden ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <img
            src="https://i.pinimg.com/736x/e8/7b/90/e87b908f816103d1a3260201cf59c323.jpg"
            alt="Ad Banner"
            className="object-cover transition-transform duration-300 hover:scale-105"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Ad Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pinimg.com/736x/3e/09/93/3e0993cdcb30c7e89d208fb7a5b38521.jpg"
            alt="Ad Avatar"
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover border"
          />
          <span className="text-blue-500 font-semibold">Online courses to master your photography</span>
        </div>

        {/* Ad Description */}
        <p
          className={`text-gray-600 ${
            size === "sm" ? "text-xs" : "text-sm"
          } leading-snug`}
        >
          {size === "sm"
            ? "Learn photography from the ground up — from camera basics to advanced composition. Perfect for beginners and hobbyists looking to level up their skills with hands-on online courses."
            : size === "md"
            ? "Learn photography from the ground up — from camera basics to advanced composition."
            : "Learn photography from the ground up — from camera basics to advanced composition. Perfect for beginners and hobbyists looking to level up their skills with hands-on online courses."}
        </p>

        {/* Action Button */}
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-xs rounded-md w-max transition">
          See more
        </button>
      </div>
    </div>
  );
};

export default Ads;
