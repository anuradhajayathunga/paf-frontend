import React from "react";
import FriendRequests from "../FriendRequests";
// import Birthday from "./Birthday";
import Ads from "../Ads";
 import UserinfoCard from "./UserinfoCard";
 import UserMediaCard from "../UserMediaCard";

const RightMenu = ({ userId }) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <div className="flex flex-col gap-6">
          <UserinfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </div>
      ) : null}
      <FriendRequests />
      {/* <Birthday /> */}
      <Ads size="md" />
    </div>
  );
};

export default RightMenu;
