import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "../MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../Redux/Auth/auth.action";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { loading, error, jwt, user } = useSelector((state) => state.auth);
  
  // Check authentication status properly
  const isAuthenticated = Boolean(jwt || localStorage.getItem("jwt"));

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout process
  const handleLogout = async() => {
    setShowMenu(false); // Close the menu after logout
    const success=await dispatch(logoutUserAction());
    if (success) {  
      navigate("/login");
    }
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
      <div className="hidden xl:flex items-center bg-gray-100 px-3 py-2 rounded-sm w-80">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full outline-none text-sm placeholder-gray-500"
        />
        <img src="/search.png" alt="Search" width={16} height={16} />
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
                src={user?.avatar  || "/login.png"} 
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

        {showMenu && isAuthenticated &&(
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
          <MobileMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;