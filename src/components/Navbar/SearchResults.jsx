import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results, loading, error, onClose }) => {
  if (loading) {
    return (
      <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-lg border rounded-md p-4 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-center p-4">
          <div className="w-6 h-6 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-600">Searching...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-lg border rounded-md p-4">
        <div className="text-red-500 p-2">Error: {error}</div>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-lg border rounded-md p-4">
        <div className="text-gray-500 p-2">No results found</div>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-16 left-0 right-0 z-50 bg-white shadow-lg border rounded-md max-h-96 overflow-y-auto">
      <div className="p-2 border-b flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Search Results</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <ul>
        {results.map((post) => (
          <li key={post.id} className="border-b last:border-b-0">
            <Link
              to={`/post/${post.id}`}
              className="block p-3 hover:bg-gray-50 transition"
              onClick={onClose}
            >
              <div className="flex items-start">
                {Array.isArray(post?.images) && post.images.length > 0 && (
                  <div>
                    <img
                      src={post.images[0]}
                      alt="Post Image 1"
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800 line-clamp-1">
                    {post.caption || "Untitled post"}
                  </p>
                  <div className="flex items-center mt-1">
                    {post.user?.avatar && (
                      <img
                        src={post.user.avatar}
                        alt={post.user.fname || "User"}
                        className="w-5 h-5 rounded-full mr-1.5"
                      />
                    )}
                    <span className="text-xs text-gray-500 capitalize">
                      {post.user?.fname
                        ? `${post.user.fname} ${post.user.lname || ""}`
                        : "Unknown user"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
