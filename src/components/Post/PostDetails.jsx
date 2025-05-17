import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchPostDetails } from "../../Redux/Post/postDetails.action";
import LeftMenu from "../LeftMenu/LeftMenu";
import RightMenu from "../RightMenu/RightMenu";
import Comments from "./Comments";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Assumes route is like /post/:id
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
              {/* {user && user.id === post.user.id && (
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
                </div>
              )} */}
            </div>

            {/* Post Content */}
            <div className="p-4">
              {post.caption && (
                <p className="text-gray-800 mb-4">{post.caption}</p>
              )}

              {/* Post Image / Video */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full">
                  {/* Custom Navigation Buttons */}
                  <div className="absolute top-1/2 left-5 z-10 -translate-y-1/2">
                    <button
                      ref={prevRef}
                      className="w-12 h-12 xl:w-16 xl:h-16 bg-blue-100/40 border border-white rounded-full hover:bg-c-green-300 flex items-center justify-center"
                    >
                      <ArrowBackIosRoundedIcon />
                    </button>
                  </div>

                  <div className="absolute top-1/2 right-5 z-10 -translate-y-1/2">
                    <button
                      ref={nextRef}
                      className="w-12 h-12 xl:w-16 xl:h-16 bg-blue-100/40 border border-white rounded-full hover:bg-c-green-300 flex items-center justify-center"
                    >
                      <ArrowForwardIosRoundedIcon />
                    </button>
                  </div>

                  {/* Swiper Component */}
                  <div className="w-full max-h-[800px] relative overflow-hidden rounded-md bg-white">
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      loop={true}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }}
                    >
                      {Array.isArray(post?.images) &&
                        post.images.map((imgUrl, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="w-full h-[600px] flex items-center justify-center bg-white">
                              <img
                                src={imgUrl}
                                alt={`Post ${idx + 1}`}
                                className="object-contain max-h-full max-w-full"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      {post?.video && (
                        <SwiperSlide>
                          <video
                            src={post.video}
                            controls
                            muted
                            autoPlay={true}
                            className="w-full h-auto max-h-[600px] rounded-lg object-contain"
                          />
                        </SwiperSlide>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>

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
                <ThumbUpIcon/>
                <span>Like</span>
              </button>
              <button
                className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-600 hover:bg-gray-50"
                onClick={() => document.getElementById("comment-input").focus()}
              >
                <img
              src="/comment.png"
              alt="Comment"
              width={16}
              height={16}
              className="cursor-pointer"
            />
                <span>Comment</span>
              </button>
              <button className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-600 hover:bg-gray-50">
               <img
              src="/share.png"
              alt="Comment"
              width={16}
              height={16}
              className="cursor-pointer"
            />
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
                  <Comments item={post} />
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
