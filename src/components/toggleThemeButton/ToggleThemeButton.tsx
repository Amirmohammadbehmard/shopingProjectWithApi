import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-1 text-black rounded flex items-center gap-2"
    >
      {theme === "light" ? (
        <>
          <BsMoon size={22} />
        </>
      ) : (
        <>
          <BsSun size={22} />
        </>
      )}
    </button>
  );
};

export default ToggleThemeButton;
