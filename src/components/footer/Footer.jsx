import { useTheme } from "@/context/ThemeProvider";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io5";
import { Button } from "../ui/button";
import { FiTwitter } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`border-t border-[hsla(240,4.9%,83.9%,0.5)] ${
        isDark ? "bg-[hsl(240,10%,3.9%)] text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Newsletter Section */}
          <div className="flex flex-col gap-4 w-full md:w-[45%]">
            <Link to="/">
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                BlogSphere
              </h3>
            </Link>
            <p
              className={`text-sm font-normal ${
                isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
              }`}
            >
              Join our newsletter to stay up to date on features and releases.
            </p>

            {/* Email Input */}
            <div className="flex gap-3 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className={`text-sm font-[500] w-full p-2 border rounded-md bg-transparent ${
                  isDark
                    ? "text-white border-gray-600"
                    : "text-black border-gray-400"
                }`}
              />
              <Button
                className={`p-2 text-sm font-[500] hover:bg-transparent bg-transparent border ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Subscribe
              </Button>
            </div>

            <p
              className={`text-xs font-normal ${
                isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
              }`}
            >
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex gap-10 w-full md:w-[50%] justify-between">
            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline text-sm`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline text-sm`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/publications"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline text-sm`}
                  >
                    Publication
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline text-sm`}
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* follow Column */}
            <div className="mb-6 ml-auto mr-auto">
              <h3 className="text-lg font-semibold mb-2">FollowUs</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/careers"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline flex gap-1 item-center`}
                  >  <FiFacebook /> <p>Facebook</p></Link>
                
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline flex gap-1 item-center`}
                  >
                    <IoLogoInstagram />
                    <p>Instgram</p>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to="/terms"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline flex gap-1 item-center`}
                  >
                    <FiTwitter />
                    <p>Twitter</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className={`${
                      isDark ? "text-[#a1a1aa]" : "text-[#71717a]"
                    } hover:underline flex gap-1 items-center`}
                  >
                    <FiLinkedin />
                    <p>LinkedIn</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-[hsla(240,4.9%,83.9%,0.5)]" />

        {/* Bottom Section */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
