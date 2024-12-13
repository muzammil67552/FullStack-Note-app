import { Link } from "react-router-dom";
import { useAuth } from "./context/ContextProvider";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-600 to-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <Link to="/">NoteApp</Link>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-white text-sm md:text-base px-6 py-2 rounded-md bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-sm md:text-base px-6 py-2 rounded-md bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 transition-all"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Display dynamic username */}
              <span className="hidden md:block text-white font-medium">
                {user.name}
              </span>
              <button
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md text-sm md:text-base transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
