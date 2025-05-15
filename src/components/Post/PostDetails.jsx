import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchPostDetails } from "../../Redux/Post/postDetails.action";
import LeftMenu from "../LeftMenu/LeftMenu";
import RightMenu from "../RightMenu/RightMenu";
const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Assumes route is like /post/:id

  const { post, loading, error } = useSelector((state) => state.postDetails);
  const { user } = useSelector((state) => state.auth);

  const [commentText, setCommentText] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setLikesCount(post.likes?.length || 0);
      setIsLiked(post.likes?.some((likeUserId) => likeUserId === user?.id));
    }
  }, [post, user]);

  const handleLike = () => {
    if (!user) return;
    setIsLiked(!isLiked);
    setLikesCount((prev) => prev + (isLiked ? -1 : 1));
    // You should also dispatch a Redux action or API call to persist like state
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    // Dispatch a Redux action to post comment to backend
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold text-red-500 mb-2">
            Error Loading Post
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/home" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/home" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 pt-4 px-2">
      {/* Left Sidebar */}
      <div className="hidden xl:block w-[20%] sticky top-24 h-screen">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[60%] xl:w-[50%] mt-2">
        <div className="max-w-3xl mx-auto pt-6 px-4 sm:px-6">
          {/* Post Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* User Info Header */}
            <div className="p-4 flex items-center border-b">
              <Link
                to={`/profile/${post.user.id}`}
                className="flex items-center"
              >
                <img
                  src={post.user.avatar || "/assets/avatars/def.jpeg"}
                  alt={post.user.fname}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium text-gray-800 capitalize">
                    {post.user.fname} {post.user.lname}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </Link>

              {/* Options Menu (if post belongs to current user) */}
              {user && user.id === post.user.id && (
                <div className="ml-auto relative">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              )}
            </div>

            {/* Post Content */}
            <div className="p-4">
              {post.caption && (
                <p className="text-gray-800 mb-4">{post.caption}</p>
              )}

              {/* Post Image */}
              {post.images && (
                <div className="mb-4">
                  <img
                    src={post.images}
                    alt="Post content"
                    className="w-full h-auto rounded-md object-cover max-h-[600px]"
                  />
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between text-gray-500 text-sm mt-2">
                <div className="flex items-center">
                  <span>{likesCount} likes</span>
                  <span className="mx-2">•</span>
                  <span>{post.comments?.length || 0} comments</span>
                </div>
                <span>{post.shares || 0} shares</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex border-t border-b">
              <button
                onClick={handleLike}
                className={`flex-1 py-2 flex justify-center items-center gap-1 ${
                  isLiked ? "text-blue-500" : "text-gray-600"
                } hover:bg-gray-50`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Like</span>
              </button>
              <button
                className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-600 hover:bg-gray-50"
                onClick={() => document.getElementById("comment-input").focus()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Comment</span>
              </button>
              <button className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-600 hover:bg-gray-50">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <span>Share</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="p-4">
              <h4 className="font-medium text-gray-800 mb-3">Comments</h4>

              {/* Comment Input */}
              {user && (
                <form onSubmit={handleAddComment} className="flex mb-4">
                  <img
                    src={user.avatar || "/assets/avatars/def.jpeg"}
                    alt={user.fname}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div className="flex-grow relative">
                    <input
                      id="comment-input"
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full py-2 px-3 bg-gray-100 rounded-full outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                        commentText.trim()
                          ? "text-blue-500 hover:bg-blue-100"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* Comments List */}
              <div className="space-y-3">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="flex">
                      <Link to={`/profile/${comment.user.id}`}>
                        <img
                          src={
                            comment.user.avatar || "/assets/avatars/def.jpeg"
                          }
                          alt={comment.user.fname}
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg px-3 py-2">
                          <Link
                            to={`/profile/${comment.user.id}`}
                            className="font-medium text-gray-800 capitalize"
                          >
                            {comment.user.fname} {comment.user.lname}
                          </Link>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-1 ml-1 text-xs text-gray-500">
                          <span>{moment(comment.createdAt).fromNow()}</span>
                          <button className="hover:underline">Like</button>
                          <button className="hover:underline">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Suggested Posts or Related Content */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              You might also like
            </h3>
            {/* This would be populated with suggested posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Placeholder for suggested posts */}
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded mr-3"></div>
                <div>
                  <p className="text-gray-800 font-medium">
                    Suggested post title
                  </p>
                  <p className="text-xs text-gray-500">
                    Username • 2 hours ago
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded mr-3"></div>
                <div>
                  <p className="text-gray-800 font-medium">
                    Another interesting post
                  </p>
                  <p className="text-xs text-gray-500">
                    Username • 5 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[25%] mt-2">
        <RightMenu />
      </div>
    </div>
  );
};

export default PostDetails;
