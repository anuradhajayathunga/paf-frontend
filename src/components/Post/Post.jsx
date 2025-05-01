import React, { useState, useRef, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import {
  createCommetAction,
  deletePostAction,
  getAllPostAction,
  updatePostAction,
} from "../../Redux/Post/post.action";
const Post = ({ item }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const handlwShowComments = () => setShowComments(!showComments);

  // Like
  const [likes, setLikes] = useState(1000); // Assuming 1K likes initially
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikes(likes + (liked ? -1 : 1));
    setLiked(!liked);
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

  // Edit and Delete
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = () => setShowDelete(true);
  const handleEdit = () => setShowEdit(true);

  const confirmDelete = () => {
    dispatch(deletePostAction(item.id)).then(() =>
      dispatch(getAllPostAction())
    );
    setShowDelete(false);
  };

  const saveEdit = (updatedPost) => {
    dispatch(updatePostAction(updatedPost.id, updatedPost)).then(() => {
      setShowEdit(false);
      dispatch(getAllPostAction());
    });
  };
  
  // write comment
  const handleCreateComment = () => {
    const reqData = {
      postId: item.id,
      userId: item.user.id,
      data: {
        content: "",
      },
    };
    dispatch(createCommetAction(reqData));
  };

  return (
    <div className="flex flex-col gap-4 ">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={item?.user?.avatar || "/noAvatar.png"}
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

          {open && (
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
              <img
                src="assets/images/icons/icon-prev.svg"
                alt="Previous"
                className="w-6 h-6"
              />
            </button>
          </div>

          <div className="absolute top-1/2 right-5 z-10 -translate-y-1/2">
            <button
              ref={nextRef}
              className="w-12 h-12 xl:w-16 xl:h-16 bg-blue-100/40 border border-white rounded-full hover:bg-c-green-300 flex items-center justify-center"
            >
              <img
                src="assets/images/icons/icon-next.svg"
                alt="Next"
                className="w-6 h-6 "
              />
            </button>
          </div>

          {/* Swiper Component */}
          <div className="w-full aspect-square relative overflow-hidden rounded-md bg-black">
            <Swiper
              modules={[Navigation, Autoplay]}
              // autoplay={{ delay: 4000 }}
              // duration={4000}
              // speed={4000}
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
                  <img
                    src={item.img}
                    alt="Post Image"
                    className="object-cover w-full h-full"
                  />
                </SwiperSlide>
              )}
              {item?.video && (
                <SwiperSlide>
                  <video
                    src={item.video}
                    controls
                    muted
                    autoPlay={false}
                    className="min-w-full h-auto rounded-lg"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs text-green-600 bg-blue-100 px-2 py-1 rounded-full">
            {/* #travel */} #{item?.keywords}
          </span>
          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            #foodie
          </span>
          <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            #photography
          </span>
        </div>
      </div>

      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-2">
        <div className="flex gap-8">
          <div
            className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl cursor-pointer"
            onClick={handleLike}
          >
            <img
              src="/like.png"
              alt="Like"
              width={16}
              height={16}
              className={liked ? "text-blue-600" : ""}
            />
            <span className="text-gray-500">{likes}</span>
            <span className="text-gray-300">|</span>
            <img
              src="/like.png"
              alt="Dislike"
              width={16}
              height={16}
              className="cursor-pointer rotate-180"
            />
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
        <div>
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl">
            <img
              src="/share.png"
              alt="Share"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-400">share</span>
          </div>
        </div>
      </div>

      {/* COMMENTS */}

      {/* Write Comment */}
      <div className="flex items-start gap-4">
        <img
          src={item?.user?.avatar || "/noAvatar.png"}
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
          <SendRoundedIcon
            sx={{ color: blue[500] }}
            className="text-white group-hover:translate-x-1 transition-transform duration-200"
            onClick={handleCreateComment}
          />
        </div>
      </div>
      {showComments && <Comments />}
    </div>
  );
};

export default Post;
