import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { getUserPostAction } from "../Redux/Post/post.action";

const ProfileFeed = ({ type, userId }) => {
  const dispatch = useDispatch();

  // Fetch posts from Redux state
  const { userPosts, loading, error } = useSelector((state) => state.post);

  // Fetch user posts on mount or userId change
  useEffect(() => {
    if (type === "profile" && userId) {
      dispatch(getUserPostAction(userId));
    }
  }, [dispatch, type, userId]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {loading && <p>Loading posts...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {userPosts && userPosts.length > 0 ? (
        userPosts.map((post) => <Post key={post._id} item={post} />)
      ) : (
        !loading && <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfileFeed;
