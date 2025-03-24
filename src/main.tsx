import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./context/LoginContext.tsx";
import { ShopingCartProvider } from "./context/ShopingCartContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx"; // اضافه کردن ThemeProvider

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ThemeProvider> {/* اضافه کردن ThemeProvider */}
        <ShopingCartProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </ShopingCartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </>,
);