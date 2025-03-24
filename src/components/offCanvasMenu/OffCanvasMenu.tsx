import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { CiBellOn } from "react-icons/ci";
import LoginStateButton from "../loginStateButton/LoginStateButton";
import SearchComponent from "../searchComponents/SearchComponent";
import { useLoginContext } from "../../context/LoginContext";
import { User } from "../../types/Server";

const OffCanvasMenu = () => {
  const { User } = useLoginContext();
  const [isOpen, setIsOpen] = useState(false);
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  const currentUser = User || localUser;

  const toggleMenu = async () => {
    try {
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Failed to toggle menu:", error);
    }
  };

  const routeList = [
    { route: "/", name: "Home" },
    { route: "/cart", name: "Cart" },
    { route: "/contact", name: "Contact" },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="lg:hidden py-3 px-5 rounded-md text-black"
      >
        <TiThMenu size={25} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-100 transform ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div
          onClick={toggleMenu}
          className="absolute top-2 left-6 py-2 px-3 text-[18px] rounded-md bg-black text-white cursor-pointer"
        >
          Close
        </div>

        <div className="mt-16 flex flex-col gap-y-4 items-start">
          <div className="text-lg text-black ml-6 mr-6">
            <SearchComponent />
          </div>
          {routeList.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              className="text-lg text-black ml-6"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col text-black border-t-[1px] border-gray-700 gap-y-4">
            <Link
              to="/profile"
              className="flex items-center justify-between gap-x-4 rounded-lg ml-6 mt-4"
            >
              <div className="flex items-center gap-x-3">
                <img
                  className="rounded-full w-12 h-12 shadow-lg object-cover"
                  src={
                    currentUser?.pic ||
                    "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small_2x/User-icon-member-login-isolated-vector.jpg"
                  }
                  alt="User Avatar"
                />
                <div className="flex flex-col text-left">
                  <p className="text-lg font-semibold line-clamp-1">
                    {currentUser
                      ? `${currentUser.firstName || "Enter your name"} ${currentUser.lastName || ""}`
                      : "Enter your name"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {currentUser?.email || "Enter your email"}
                  </p>
                </div>
              </div>
              <CiBellOn className="text-gray-700 w-12" size={24} />
            </Link>
          </div>

          <div className="ml-6">
            <LoginStateButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvasMenu;
