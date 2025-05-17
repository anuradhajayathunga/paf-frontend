import React, { useEffect } from "react";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import RightMenu from "../../components/RightMenu/RightMenu";
import AddPost from "../../components/Post/AddPost";
import Feed from "../../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getAllPostAction } from "../../Redux/Post/post.action";
// import { getUserProfileAction } from "../../Redux/Auth/auth.action";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
      return;
    }

    // Fetch user profile if not already loaded
    // if (!auth.user) {
    //   dispatch(getUserProfileAction());
    // }

    // Only fetch if we don't have posts or if the array is empty
    if (!post.posts || post.posts.length === 0) {
      dispatch(getAllPostAction());
    }
  }, [dispatch, jwt, navigate, post.posts, auth.user]);

  if (!auth.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex gap-6 pt-4 px-2">
      {/* Left Sidebar */}
      <div className="hidden xl:block w-[30%] sticky top-24 h-screen">
        <LeftMenu type="home" />
      </div>

      {/* Center Feed */}
      <div className="w-full lg:w-[50%] xl:w-[50%] mt-2">
        <div className="flex flex-col gap-6">
          <AddPost />
          <Feed type="home" />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[30%] mt-2">
        <RightMenu />
      </div>
    </div>
  );
};

export default Home;