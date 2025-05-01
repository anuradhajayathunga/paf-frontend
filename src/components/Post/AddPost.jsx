import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddPostButton from "./AddPostButton";
import { useSelector } from "react-redux";
import PostModal from "./PostModal";

const AddPost = () => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;

  const [openPostModal, setOpenPostModal] = useState(false);

  const handleOptionClick = (label) => {
    if (label === "Photo") {
      setOpenPostModal(true);
    }
    // Handle other types if needed
  };
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 ">
      {/* hover:shadow-md transition-all duration-300 */}
      <div className="flex gap-4 items-start">
        {/* AVATAR */}
        <img
          src={user?.avatar || "/assets/avatars/def.jpeg"}
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
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500 text-sm">
                <PostOption
                  icon="/posts.png"
                  label="Post"
                  onClick={handleOptionClick}
                />
                <PostOption
                  icon="/addimage.png"
                  label="Photo"
                  onClick={handleOptionClick}
                />
                <PostOption
                  icon="/addVideo.png"
                  label="Video"
                  onClick={handleOptionClick}
                />
                <PostOption
                  icon="/poll.png"
                  label="Poll"
                  onClick={handleOptionClick}
                />
                <PostOption
                  icon="/addevent.png"
                  label="Event"
                  onClick={handleOptionClick}
                />
              </div>
            </div>
            {/* Post Modal */}
            <PostModal
              open={openPostModal}
              handleClose={() => setOpenPostModal(false)}
            />

            <div className="">
              <AddPostButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostOption = ({ icon, label, onClick }) => (
  <div
    className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
    onClick={() => onClick(label)}
  >
    <img src={icon} alt={label} width={20} height={20} />
    <span>{label}</span>
  </div>
);

export default AddPost;
