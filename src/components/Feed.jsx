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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {/* {type === "profile" && <ProfileCard />} */}
      {type === "home"}
      {post?.posts?.map((item, index) => (
        <div
          key={index}
          className={`border-b ${
            index === post?.posts?.length - 1 ? "border-none" : ""
          } pb-6`}
        >
          <Post item={item} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
