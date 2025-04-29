import React, { useState } from "react";
import Comments from "./Comments";

const Post = () => {
  const [likes, setLikes] = useState(1000); // Assuming 1K likes initially
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col gap-4 ">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://images.pexels.com/photos/4668513/pexels-photo-4668513.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <span className="block font-medium text-gray-900">Jack Mc</span>

            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                #travel
              </span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                #foodie
              </span>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                #photography
              </span>
            </div>
          </div>
        </div>

        <img src="/more.png" alt="More Options" width={16} height={16} />
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <img
            src="https://images.pexels.com/photos/4668521/pexels-photo-4668521.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Post Image"
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          quis mollitia velit eaque culpa praesentium a facere optio, dolore
          similique eum possimus earum fuga libero animi ab quo porro vitae?
        </p>
      </div>

      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div
            className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl cursor-pointer"
            onClick={handleLike}
          >
            <img
              src="/like.png"
              alt="Like"
              width={16}
              height={16}
              className={liked ? "text-blue-600" : ""}
            />
            <span className="text-gray-500">{likes}</span>
            <span className="text-gray-300">|</span>
            <img
              src="/like.png"
              alt="Dislike"
              width={16}
              height={16}
              className="cursor-pointer rotate-180"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl">
            <img
              src="/comment.png"
              alt="Comment"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-500">200</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl">
            <img
              src="/share.png"
              alt="Share"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">share</span>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <Comments />
    </div>
  );
};

export default Post;
