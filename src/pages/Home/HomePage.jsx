import React from "react";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import RightMenu from "../../components/RightMenu/RightMenu";
import AddPost from "../../components/Post/AddPost";
import Feed from "../../components/Feed";

const Home = () => {
  return (
    <div className="flex gap-6 pt-4 px-2">
      {/* Left Sidebar */}
      <div className="hidden xl:block w-[20%] sticky top-24 h-screen">
        <LeftMenu type="home" />
      </div>

      {/* Center Feed */}
      <div className="w-full lg:w-[70%] xl:w-[50%] mt-2">
        <div className="flex flex-col gap-6">
          <AddPost />
          <Feed />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-[25%] mt-2">
        <RightMenu />
      </div>
    </div>
  );
};

export default Home;
