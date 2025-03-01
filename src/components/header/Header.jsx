import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import MemberMenu from "../membermenu/MemberMenu";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[hsla(240,4.9%,83.9%,0.5)] backdrop-blur ${
        isDark ? "bg-[hsl(240,10%,3.9%)] text-white" : "bg-white text-black"
      }`}
    >
      <div className="container max-w-[1500px] mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/">
          <h3 className={isDark ? "text-white" : "text-black"}>BlogSphere</h3>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center">
          <NavLink
            to="/about"
            className={() =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isDark ? "text-white" : "text-black"
              } hover:bg-accent dark:hover:bg-accentfont-[400] text-base`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/publications"
            className={() =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isDark ? "text-white" : "text-black"
              } hover:bg-accent dark:hover:bg-accent font-[400] text-base`
            }
          >
            Publications
          </NavLink>

          <NavLink
            to="/projects"
            className={() =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isDark ? "text-white" : "text-black"
              }hover:bg-accent dark:hover:bg-accent font-[400] text-base`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/lecture"
            className={() =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isDark ? "text-white" : "text-black"
              } hover:bg-accent dark:hover:bg-accent font-[400] text-base`
            }
          >
            Lectures
          </NavLink>

          {/* Member Menu */}
          <MemberMenu  />

          {/* Dark Mode Toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-white" />
            ) : (
              <Moon className="h-6 w-6 text-gray-800" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
