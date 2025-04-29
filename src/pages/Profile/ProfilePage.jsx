import Feed from "../../components/Feed";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import RightMenu from "../../components/RightMenu/RightMenu";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 pt-4 px-4  mx-auto">
      {/* Left Sidebar */}
      <aside className="hidden xl:block w-[10%]">
        {/* <LeftMenu type="profile" /> */}
      </aside>

      {/* Center Content */}
      <main className="w-full lg:w-[70%] xl:w-[70%] flex flex-col gap-6">
        {/* Profile Header */}
        <section className="relative bg-transparent rounded-xl  overflow-hidden">
          <div className="w-full h-56 relative">
            <img
              src="https://images.pexels.com/photos/2901913/pexels-photo-2901913.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Cover"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col items-center mt-[-4rem] px-4 pb-4">
            <div className="relative w-32 h-32">
              <img
                src="https://images.pexels.com/photos/2853592/pexels-photo-2853592.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Profile Avatar"
                className="rounded-full ring-4 ring-white object-cover shadow-md w-full h-full"
              />
            </div>
            <h1 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900">
              Jack Mc
            </h1>
            <div className="flex gap-12 mt-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900">50</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">2K</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">150</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feed Section */}
        <Feed />
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-[30%]">
        <RightMenu userId="test" />
      </aside>
    </div>
  );
};

export default ProfilePage;
