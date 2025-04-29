import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const FriendRequests = () => {
  const requests = [
    {
      id: 1,
      name: "Wayne Burton",
      avatar:
        "https://images.pexels.com/photos/4668521/pexels-photo-4668521.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Jane Ellis",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Mark Granger",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-700">Friend Requests</span>
        <Link to="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* Request List */}
      {requests.map((user) => (
        <RequestCard key={user.id} name={user.name} avatar={user.avatar} />
      ))}
    </div>
  );
};

const RequestCard = ({ name, avatar }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover border"
      />
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <div className="flex items-center gap-2">
      <button className="text-blue-500 hover:text-blue-600 p-1.5 transition">
        <FaCheckCircle size={20} />
      </button>
      <button className="text-gray-400 hover:text-gray-600 p-1.5 transition">
        <FaTimesCircle size={20} />
      </button>
    </div>
  </div>
);

export default FriendRequests;
