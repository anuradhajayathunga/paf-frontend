import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../Redux/Auth/auth.action";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { searchPostAction } from "../../Redux/Post/post.action";
import SearchResults from "./SearchResults"; // Import the new component

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef();
  const searchRef = useRef();
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get auth state from Redux
  const {
    // loading: authLoading,
    // error: authError,
    jwt,
    user,
  } = useSelector((state) => state.auth);

  // Get search results from Redux
  const {
    loading: searchLoading,
    error: searchError,
    searchResults,
  } = useSelector((state) => state.post || {});

  // Check authentication status properly
  const isAuthenticated = Boolean(jwt || localStorage.getItem("jwt"));

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show search results when search results arrive
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  }, [searchResults]);

  // Handle logout process
  const handleLogout = async () => {
    setShowMenu(false); // Close the menu after logout
    const success = await dispatch(logoutUserAction());
    if (success) {
      // Optional: Clear localStorage/sessionStorage if used
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login and refresh page to clear in-memory state
      window.location.href = "/login"; // This both redirects and reloads the app
      // navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchPostAction(searchQuery));
      setShowSearchResults(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-white border-b shadow-sm">
      {/* LEFT - LOGO */}
      <div className="lg:block">
        <Link
          to="/home"
          className="font-extrabold text-xl text-blue-600 tracking-wide"
        >
          SHUTTERSYNC
        </Link>
      </div>

      {/* CENTER - NAV LINKS */}
      <nav className="hidden md:flex xl:hidden items-center gap-4 text-gray-700 text-sm w-[50%]">
        <Link
          to="/home"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <img src="/home.png" alt="Home" width={16} height={16} />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <img src="/friends.png" alt="Friends" width={16} height={16} />
          <span>Friends</span>
        </Link>
        <Link
          to="/stories"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <img src="/stories.png" alt="Stories" width={16} height={16} />
          <span>Stories</span>
        </Link>
      </nav>

      {/* SEARCH - ONLY ON XL */}
      <div
        ref={searchRef}
        className={`hidden xl:flex relative items-center bg-white border rounded-sm px-3 py-1 w-80 transition-all duration-200 ${
          isFocused
            ? "border-blue-500 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-transparent w-full outline-none text-sm text-gray-800 placeholder-gray-400"
        />
        <div className="flex items-center">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mr-2 text-gray-400 hover:text-gray-600"
            >
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
          )}
          <button
            onClick={handleSearch}
            className={`p-1 rounded-md transition-colors ${
              isFocused
                ? "text-blue-500 hover:bg-blue-50"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
          >
            <SearchRoundedIcon size={18} />
          </button>
        </div>

        {/* SEARCH RESULTS DROPDOWN */}
        {showSearchResults && (
          <SearchResults
            results={searchResults}
            loading={searchLoading}
            error={searchError}
            onClose={closeSearchResults}
          />
        )}
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-4 xl:gap-5 relative" ref={menuRef}>
        <div className="hidden md:flex items-center gap-4">
          <button className="hover:bg-gray-100 p-2 rounded-md transition">
            <img src="/people.png" alt="People" width={20} height={20} />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded-md transition">
            <img src="/messages.png" alt="Messages" width={20} height={20} />
          </button>
          <button className="hover:bg-gray-100 p-2 rounded-md transition">
            <img
              src="/notifications.png"
              alt="Notifications"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* USER MENU DROPDOWN */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          {isAuthenticated ? (
            <>
              <img
                src={user?.avatar || "/login.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              {/* <span className="hidden md:inline">{user?.fname || "User"}</span> */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                aria-current="page"
                className="router-link-active router-link-exact-active flex items-center z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] bg-gray-100 text-gray-900 hover:bg-c-green-300"
              >
                <span className="block text-inherit w-full h-full rounded-[50px] text-md font-bold font-chivo group-hover:text-blue">
                  Log in
                </span>
              </Link>
            </>
          )}
        </button>

        {showMenu && isAuthenticated && (
          <div className="absolute top-14 right-0 w-44 bg-white shadow-lg border rounded-md text-sm z-50">
            <>
              <Link
                to={`/profile/${user?.id}`}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setShowMenu(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setShowMenu(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Logout
              </button>
            </>
          </div>
        )}

        <div className="md:hidden">
          <MobileMenu
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
