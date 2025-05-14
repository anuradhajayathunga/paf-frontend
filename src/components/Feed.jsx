import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../Redux/Post/post.action";
import ProfileCard from "./LeftMenu/ProfileCard";

const Feed = ({ type }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [dispatch]);

  // ✅ Sort posts by updatedAt descending
  const sortedPosts = [...(post?.posts || [])].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {/* Uncomment this if you want to show ProfileCard on profile page */}
      {/* {type === "profile" && <ProfileCard />} */}

      {type === "home"}
      {sortedPosts.map((item, index) => (
        <div
          key={index}
          className={`border-b ${
            index === sortedPosts.length - 1 ? "border-none" : ""
          } pb-2`}
        >
          <Post item={item} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
