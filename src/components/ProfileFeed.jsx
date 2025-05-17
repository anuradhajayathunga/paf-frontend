import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";
import { getUserPostAction } from "../Redux/Post/post.action";

const ProfileFeed = ({ type, userId }) => {
  const dispatch = useDispatch();

  const { userPosts, loading, error } = useSelector((state) => state.post);

  useEffect(() => {
    if (type === "profile" && userId) {
      dispatch(getUserPostAction(userId));
    }
  }, [dispatch, type, userId]);

  // ✅ Sort posts by updatedAt descending
  const sortedPosts = [...(userPosts || [])].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {loading && <p>Loading posts...</p>}
      {/* {error && <p className="text-red-500">{error}</p>} */}

      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => <Post key={post._id} item={post} />)
      ) : (
        !loading && <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfileFeed;
