import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';


const Navbar = () => {
  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-white border-b shadow-sm">
      {/* LEFT - LOGO */}
      <div className="lg:block">
        <Link to="/" className="font-extrabold text-xl text-blue-600 tracking-wide">
          SHUTTERSYNC
        </Link>
      </div>

      {/* CENTER - NAV LINKS */}
      <nav className="hidden md:flex xl:hidden items-center gap-4 text-gray-700 text-sm w-[50%]">
        <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition">
          <img src="/home.png" alt="Home" width={16} height={16} />
          <span>Home</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition">
          <img src="/friends.png" alt="Friends" width={16} height={16} />
          <span>Friends</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition">
          <img src="/stories.png" alt="Stories" width={16} height={16} />
          <span>Stories</span>
        </Link>
      </nav>

      {/* SEARCH - ONLY SHOWS ON XL */}
      <div className="hidden xl:flex items-center bg-gray-100 px-3 py-1 rounded-sm w-72">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full outline-none text-sm placeholder-gray-500"
        />
        <img src="/search.png" alt="Search" width={16} height={16} />
      </div>

      {/* RIGHT - AUTH & ICONS */}
      <div className="flex items-center gap-4 xl:gap-5">
          {/* <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-500 border-r-transparent"></div> */}

            <div className="hidden md:flex items-center gap-4">
              <button className="hover:bg-gray-100 p-2 rounded-md transition">
                <img src="/people.png" alt="People" width={20} height={20} />
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-md transition">
                <img src="/messages.png" alt="Messages" width={20} height={20} />
              </button>
              <button className="hover:bg-gray-100 p-2 rounded-md transition">
                <img src="/notifications.png" alt="Notifications" width={20} height={20} />
              </button>
            </div>

            <Link to="/login" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <img src="/login.png" alt="Login" width={20} height={20} />
              Login
            </Link>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
