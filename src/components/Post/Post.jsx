import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./Comments";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { blue } from "@mui/material/colors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommetAction,
  deletePostAction,
  getAllPostAction,
  updatePostAction,
  savePostAction,
  removeSavedPostAction,
} from "../../Redux/Post/post.action";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import { toast } from "react-toastify";

const Post = ({ item }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { auth, post } = useSelector((store) => store);
  const user = auth?.user;
  const isOwner = user?.id === item?.user?.id;

  // Fix: Check if post is saved by current user using the correct property
  // Also ensure we're checking for the correct ID type (_id vs id)
  const [isSaved, setIsSaved] = useState(
    item?.savedByUsers?.includes(user?._id)
  );
  const [saving, setSaving] = useState(false);

  const handlwShowComments = () => setShowComments(!showComments);

  // Like
  const [likes, setLikes] = useState(1000); // Assuming 1K likes initially
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  // UnLike
  const [unLikes, setUnLikes] = useState(1000); // Assuming 1K likes initially
  const [unLiked, setUnLiked] = useState(false);

  const handleUnLike = () => {
    setUnLikes(unLikes + (unLiked ? -1 : 1));
    setUnLiked(!unLiked);
  };

  // Save post handler - Fixed implementation
  const handleSavePost = async () => {
    if (!user || saving) return;

    setSaving(true);

    try {
      if (isSaved) {
        // Fix: Make sure we're passing the correct ID format
        await dispatch(removeSavedPostAction(item.id));
        toast.success("Removed from saved posts.");
      } else {
        // Fix: Make sure we're passing the correct ID format
        await dispatch(savePostAction(item.id));
        toast.success("Post saved.");
      }

      // Toggle UI state immediately to improve perceived performance
      setIsSaved((prev) => !prev);

      // Fetch all posts to update the state in Redux store
      // This is important to ensure our UI correctly reflects the backend state
      await dispatch(getAllPostAction());
    } catch (error) {
      toast.error("Failed to update saved state.");
      console.error("Save/Unsave error:", error);
    } finally {
      setSaving(false);
    }
  };

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fix: Update the isSaved state whenever item changes
  useEffect(() => {
    if (item?.savedByUsers && user?._id) {
      setIsSaved(item.savedByUsers.includes(user._id));
    }
  }, [item, user]);

  // Edit and Delete
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => setShowDelete(true);
  const handleEdit = () => setShowEdit(true);

  const confirmDelete = () => {
    // Fix: Ensure we're using the correct ID field
    const postId = item._id || item.id;

    dispatch(deletePostAction(postId))
      .then(() => {
        dispatch(getAllPostAction());
        toast.success("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");
      });
    setShowDelete(false);
  };

  const saveEdit = (updatedPost) => {
    // Fix: Ensure we're using the correct ID field
    const postId = item._id || item.id;

    dispatch(updatePostAction(postId, updatedPost))
      .then(() => {
        setShowEdit(false);
        dispatch(getAllPostAction());
        toast.success("Post updated successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        toast.error("Failed to update post");
      });
  };

  // Write comment
  const handleCreateComment = () => {
    if (!commentText.trim()) return; // Don't submit empty comments

    // Fix: Ensure we're using the correct ID field
    const postId = item._id || item.id;

    const reqData = {
      postId: postId,
      data: {
        comment: commentText,
      },
    };

    // Dispatch the comment creation action and then refresh posts
    dispatch(createCommetAction(reqData))
      .then(() => {
        // After successful comment creation, refresh the posts
        dispatch(getAllPostAction());
        // Clear the input field
        setCommentText("");
        toast.success("Comment added successfully");
      })
      .catch((error) => {
        console.error("Failed to create comment:", error);
        toast.error("Failed to add comment");
      });
  };

  // Handle comment input keypress (Enter key)
  const handleCommentKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateComment();
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={item?.user?.avatar || "/assets/avatars/def.jpeg"}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            {/* Name */}
            <span className="block text-md font-semibold text-gray-900">
              {item?.user?.fname} {item?.user?.lname}
            </span>
            {/* Caption */}
            <p className="text-sm text-gray-500">{item?.caption}</p>
            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-xs text-green-600 bg-blue-100 px-2 py-1 rounded-full">
                #{item?.keywords}
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

        <div className="relative inline-block text-left" ref={menuRef}>
          <button onClick={handleToggle}>
            <img
              src="/more.png"
              alt="More Options"
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </button>

          {open && isOwner && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors rounded-t-xl"
              >
                <EditIcon fontSize="small" className="mr-3 text-gray-500" />
                <span className="font-medium">Edit</span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-xl"
              >
                <DeleteIcon fontSize="small" className="mr-3 text-red-500" />
                <span className="font-medium">Delete</span>
              </button>

              <DeleteModal
                isOpen={showDelete}
                onCancel={() => setShowDelete(false)}
                onConfirm={confirmDelete}
              />
              <EditModal
                isOpen={showEdit}
                onCancel={() => setShowEdit(false)}
                onSave={saveEdit}
                initialData={item}
              />
            </div>
          )}
          {open && !isOwner && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-xl z-50 p-3 text-sm text-gray-500">
              No permission to edit.
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
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
              {item?.img && (
                <SwiperSlide>
                  <div className="w-full h-[600px] flex items-center justify-center bg-white">
                    <img
                      src={item.img}
                      alt="Post Image"
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                </SwiperSlide>
              )}
              {item?.video && (
                <SwiperSlide>
                  <video
                    src={item.video}
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

      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-2">
        <div className="flex gap-2">
          <div
            className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl cursor-pointer"
            onClick={handleLike}
          >
            {liked ? (
              <ThumbUpIcon fontSize="small" sx={{ color: blue[500] }} />
            ) : (
              <ThumbUpOutlinedIcon fontSize="small" sx={{ color: blue[500] }} />
            )}
            <span className="text-gray-500">{likes}</span>
          </div>
          <div
            className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl cursor-pointer"
            onClick={handleUnLike}
          >
            {unLiked ? (
              <ThumbUpIcon
                className="cursor-pointer rotate-180"
                fontSize="small"
                sx={{ color: blue[500] }}
              />
            ) : (
              <ThumbUpOutlinedIcon
                className="cursor-pointer rotate-180"
                fontSize="small"
                sx={{ color: blue[500] }}
              />
            )}
          </div>
          <div
            className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl"
            onClick={handlwShowComments}
          >
            <img
              src="/comment.png"
              alt="Comment"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-500 cursor-pointer">200</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
            <img
              src="/share.png"
              alt="Share"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-400">share</span>
          </div>
          {/* Fixed Save Button */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
            <div
              className={`flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-xl cursor-pointer ${
                saving ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={handleSavePost}
            >
              {saving ? (
                <div className="text-sm text-blue-500 animate-pulse">
                  Saving...
                </div>
              ) : isSaved ? (
                <>
                  <TurnedInRoundedIcon
                    fontSize="small"
                    sx={{ color: blue[500] }}
                  />
                  <span className="text-blue-500 text-sm">Saved</span>
                </>
              ) : (
                <>
                  <TurnedInNotRoundedIcon
                    fontSize="small"
                    sx={{ color: blue[500] }}
                  />
                  <span className="text-blue-500 text-sm">Save</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <>
          <div className="flex items-start gap-4">
            <img
              src={user?.avatar || "/assets/avatars/def.jpeg"}
              alt="User Avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl px-4 py-2">
              <input
                type="text"
                name="comment"
                placeholder="Write a comment..."
                className="bg-transparent outline-none w-full text-sm"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleCommentKeyPress}
              />
              <button onClick={handleCreateComment}>
                <SendRoundedIcon
                  sx={{ color: blue[500] }}
                  className="text-white group-hover:translate-x-1 transition-transform duration-200 cursor-pointer"
                />
              </button>
            </div>
          </div>
          <Comments item={item} />
        </>
      )}
    </div>
  );
};

export default Post;
