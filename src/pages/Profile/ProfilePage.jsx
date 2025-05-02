import { useSelector } from "react-redux";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import Feed from "../../components/Feed";
// import LeftMenu from "../../components/LeftMenu/LeftMenu";
import RightMenu from "../../components/RightMenu/RightMenu";
import UpdateImageModal from "./UpdateImageModal";
import React, { useState } from "react";

const ProfilePage = () => {
  const { auth } = useSelector((store) => store);
  const user = auth?.user;
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImages, setProfileImages] = useState({
    avatar: auth.user?.avatar,
    cover: auth.user?.cover,
  });

  const handleImageUpdate = (data) => {
    setProfileImages({
      avatar: data.avatar || profileImages.avatar,
      cover: data.cover || profileImages.cover,
    });

    // TODO: Dispatch action to update in DB (optional)
  };
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
              src={
                user?.cover ||
                "https://images.pexels.com/photos/2901913/pexels-photo-2901913.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded px-2 py-1 text-sm shadow"
              onClick={() => setModalOpen(true)}
            >
              Edit Cover
            </button>
          </div>

          <div className="flex flex-col items-center mt-[-4rem] px-4 pb-4">
            <div className="relative w-32 h-32">
              <img
                src={
                  user?.avatar ||
                  "https://images.pexels.com/photos/2901913/pexels-photo-2901913.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                alt="Profile Avatar"
                className="rounded-full ring-4 ring-white object-cover shadow-md w-full h-full"
              />
              <button
                className="absolute bottom-2 right-2 bg-white hover:bg-gray-100 transition-all duration-300 rounded-full p-1 shadow-lg ring-1 ring-gray-300"
                onClick={() => setModalOpen(true)}
              >
                <CreateRoundedIcon
                  style={{ transform: "rotate(-90deg)", color: "#374151" }}
                />
              </button>
            </div>
            <h1 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 capitalize">
              {auth.user?.fname} {auth.user?.lname}
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

            <UpdateImageModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onSave={handleImageUpdate}
            />
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
