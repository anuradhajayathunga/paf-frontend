import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPostsAction } from "../Redux/Post/post.action";

const SavedPostsSection = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get saved posts from Redux store
  const { savedPosts } = useSelector((state) => state.post);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        await dispatch(getSavedPostsAction());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-semibold text-base">
            Saved Posts
          </span>
        </div>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-semibold text-base">
            Saved Posts
          </span>
        </div>
        <div className="text-red-500 p-4 text-center">
          Error loading saved posts: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm text-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-semibold text-base">
          Saved Posts
        </span>
        <Link to="#" className="text-blue-500 text-xs hover:underline">
          See all
        </Link>
      </div>

      {/* Saved Posts Grid */}
      {savedPosts && savedPosts.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {savedPosts.slice(0, 6).map((post, index) => (
            <div
              key={post.id || index}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <Link to={`/posts/${post.id}`}>
                <img
                  src={post.mediaUrl || post.img || "/placeholder-image.jpg"}
                  alt={post.caption || `saved-post-${index}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div>{post?.caption}</div>
                {/* Optional overlay for caption or like count */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="text-white text-xs flex items-center gap-1">
                    <span>👍 {post.likes?.length || 0}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-gray-500">
          No saved posts yet. Posts you save will appear here.
        </div>
      )}
    </div>
  );
};

export default SavedPostsSection;