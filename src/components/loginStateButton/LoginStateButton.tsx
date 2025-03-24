import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";
import { useState } from "react";
import Button from "../button/Button";

function LoginStateButton() {
  const { handlerLogOut, isLogin } = useLoginContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      {isLogin ? (
        <Button
          className="w-auto h-auto flex justify-start items-center"
          onClick={handleToggleDropdown}
        >
          <div className="text-lg" onClick={handlerLogOut}>
            LogOut
          </div>
        </Button>
      ) : (
        <Button
          className="w-auto h-auto flex justify-start items-center"
          onClick={() => navigate("/login")}
        >
          <span className="text-lg">Login</span>
        </Button>
      )}
    </>
  );
}

export default LoginStateButton;
