import { useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import Button from "../button/Button";
import { CgProfile } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const { handlerLogOut, isLogin } = useLoginContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {isLogin ? (
        <div className="relative">
          <Button
            className="w-auto h-auto rounded-xl flex justify-center items-center"
            onClick={handleToggleDropdown}
          >
            <CgProfile className="text-gray-800" size={35} />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={handlerLogOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button
          className="w-auto h-auto rounded-xl flex justify-center items-center"
          onClick={() => navigate("/login")}
        >
          <span className="mr-[3px]">Login</span>
          <FiLogIn size={30} />
        </Button>
      )}
    </>
  );
}

export default LoginButton;
