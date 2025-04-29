import React from "react";
import Post from "./Post";

const Feed = () => {
  // Dummy array to simulate posts — replace with real post data later
  const posts = Array.from({ length: 9 });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.map((_, index) => (
        <div
          key={index}
          className={`border-b ${index === posts.length - 1 ? "border-none" : ""} pb-6`}
        >
          <Post />
        </div>
      ))}
    </div>
  );
};

export default Feed;
