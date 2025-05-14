import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import { blue } from "@mui/material/colors";

const Comments = ({ item }) => {
  // If no comments are available, handle that case
  if (!item?.comments || item.comments.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-500 py-8">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-2 py-4">
      {/* Comment count and sorting options */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-gray-700 font-medium">
          {item.comments.length} {item.comments.length === 1 ? "Comment" : "Comments"}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="text-sm bg-transparent border-none outline-none text-blue-600 font-medium cursor-pointer">
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Comments list */}
      {item.comments.map((comment, index) => (
        <CommentItem key={comment.id || index} comment={comment} />
      ))}
    </div>
  );
};

// Simple function to format time (without date-fns)
const formatTimeAgo = (dateString) => {
  if (!dateString) return "just now";
  
  try {
    const commentDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    // Simple date format for older comments
    return commentDate.toLocaleDateString();
  } catch (e) {
    console.error("Error formatting date:", e);
    return "recently";
  }
};

// Separate component for each comment
const CommentItem = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment?.likes || Math.floor(Math.random() * 100)); // Random likes for demo
  const [showMenu, setShowMenu] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleReply = () => {
    setIsReplying(!isReplying);
    if (!isReplying) {
      setReplyText("");
    }
  };

  const handleSubmitReply = () => {
    // Handle reply submission logic here
    console.log("Replying to comment:", comment.id, "with text:", replyText);
    setIsReplying(false);
    setReplyText("");
  };

  // Format the date without external library
  const timeAgo = formatTimeAgo(comment?.createdAt);

  return (
    <div className="flex gap-3">
      {/* Left - Avatar column */}
      <div className="flex-shrink-0">
        <img
          src={comment?.user?.avatar || "/assets/avatars/def.jpeg"}
          alt={`${comment?.user?.fname || 'User'}'s Avatar`}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
      </div>

      {/* Right - Comment content column */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          {/* Comment bubble */}
          <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[90%]">
            {/* User info */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900">
                {comment?.user?.fname || 'User'} {comment?.user?.lname || ''}
              </span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>

            {/* Comment text */}
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {comment?.comment || 'No comment text provided'}
            </p>
          </div>

          {/* More options button */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MoreHorizIcon fontSize="small" className="text-gray-500" />
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-t-lg">
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Interactions */}
        <div className="flex items-center gap-4 mt-2 ml-2">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors"
          >
            {liked ? (
              <ThumbUpIcon fontSize="small" sx={{ color: blue[500] }} />
            ) : (
              <ThumbUpOutlinedIcon fontSize="small" />
            )}
            <span className={liked ? 'text-blue-500' : ''}>{likeCount}</span>
          </button>

          <button 
            onClick={handleReply}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors"
          >
            <ReplyIcon fontSize="small" />
            <span>Reply</span>
          </button>
        </div>

        {/* Reply input field */}
        {isReplying && (
          <div className="mt-3 ml-2 flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 p-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && replyText.trim()) {
                  handleSubmitReply();
                }
              }}
            />
            <button
              onClick={handleSubmitReply}
              disabled={!replyText.trim()}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                replyText.trim() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              Reply
            </button>
          </div>
        )}

        {/* Display replies if any */}
        {comment?.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4">
            {comment.replies.map((reply, idx) => (
              <div key={idx} className="flex gap-3 mb-3">
                <img
                  src={reply?.user?.avatar || "/assets/avatars/def.jpeg"}
                  alt="Reply Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 bg-gray-100 rounded-2xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">
                      {reply?.user?.fname || 'User'} {reply?.user?.lname || ''}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(reply?.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{reply?.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;