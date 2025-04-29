import React from "react";
import AddPostButton from "./AddPostButton";
import { AddPostNavigation } from "./AddPostNavigation";
import { Link } from "react-router-dom";
const AddPost = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 ">
      {/* hover:shadow-md transition-all duration-300 */}
      <div className="flex gap-4 items-start">
        {/* AVATAR */}
        <img
          src="https://images.pexels.com/photos/4668513/pexels-photo-4668513.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="User avatar"
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full border"
        />

        {/* POST INPUT */}
        <div className="flex-1">
          {/* TEXTAREA */}
          <div className="relative">
            <textarea
              rows={2}
              className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-none p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
            />
            {/* Emoji */}
            <button type="button" className="absolute bottom-3 right-3">
              <img
                src="/emoji.png"
                alt="Emoji"
                width={20}
                height={20}
                className="w-5 h-5 opacity-70 hover:opacity-100 transition"
              />
            </button>
          </div>

          {/* POST OPTIONS */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500 text-sm">
              {AddPostNavigation.map((item, index) => (
                <Link to={item.path} key={index}>
                  <PostOption key={index} icon={item.icon} label={item.label} />
                </Link>
              ))}
            </div>

            <div className="">
              <AddPostButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostOption = ({ icon, label }) => (
  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
    <img src={icon} alt={label} width={20} height={20} />
    <span>{label}</span>
  </div>
);

export default AddPost;
