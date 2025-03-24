import { Link, useLocation } from "react-router-dom";
import OffCanvasMenu from "../offCanvasMenu/OffCanvasMenu";
import CartButton from "../cartButton/CartButton";
import LoginButton from "../loginButton/LoginButton";
import ToggleThemeButton from "../toggleThemeButton/ToggleThemeButton";

function CompleteNavbar() {
  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/cart", label: "Cart" },
    { path: "/contact", label: "Contact" },
  ];
  const location = useLocation();

  return (
    <nav className="bg-gray-100 text-black fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between px-6 h-16">
        <div className="text-2xl lg:hidden">
          <OffCanvasMenu />
        </div>

        <div className="text-2xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>

        <div className="hidden lg:flex gap-x-6 justify-start">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`hover:text-blue-500 px-3 py-2 rounded ${
                location.pathname === item.path ? "text-blue-500" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-x-4">
          <div>
            <ToggleThemeButton />
          </div>
          <div className="hidden lg:block px-4 py-2 rounded">
            <LoginButton />
          </div>

          <button className="text-xl lg:pr-2 pr-5">
            <CartButton />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CompleteNavbar;
