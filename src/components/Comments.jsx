import React from "react";

const Comments = () => {
  return (
    <div className="flex flex-col gap-6 text-sm text-gray-700">
      {/* Write Comment */}
      <div className="flex items-start gap-4">
        <img
          src="https://images.pexels.com/photos/4668513/pexels-photo-4668513.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="User Avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl px-4 py-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none w-full text-sm"
          />
          <img
            src="/emoji.png"
            alt="Emoji"
            width={16}
            height={16}
            className="cursor-pointer ml-2"
          />
        </div>
      </div>

      {/* Comment Display */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <img
          src="https://images.pexels.com/photos/4668513/pexels-photo-4668513.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Commenter Avatar"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Comment Content */}
        <div className="flex-1 flex flex-col gap-2">
          <span className="font-medium text-gray-800">Kevin Levien</span>
          <p className="text-gray-600 leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            nobis nulla a quibusdam.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <img
                src="/like.png"
                alt="Like"
                width={12}
                height={12}
                className="w-4 h-4 cursor-pointer"
              />
              <span>121</span>
            </div>
            <span className="cursor-pointer hover:underline">Reply</span>
          </div>
        </div>

        {/* More Options Icon */}
        <div className="pt-1">
          <img
            src="/more.png"
            alt="More"
            width={16}
            height={16}
            className="cursor-pointer opacity-70 hover:opacity-100 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
