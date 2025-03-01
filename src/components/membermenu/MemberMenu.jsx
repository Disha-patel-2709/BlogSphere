import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { useTheme } from "@/context/ThemeProvider";
import { Link } from "react-router-dom";

const MemberMenu = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger 
                        className={`text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                        ${isDark 
                            ? "text-white hover:bg-accent" 
                            : "text-gray-800 hover:bg-accent"
                        }`}
                    >
                        Become A Member
                    </NavigationMenuTrigger>

                    <NavigationMenuContent 
                        className={`border rounded-lg shadow-lg backdrop-blur-md
                        ${isDark 
                            ? "bg-transparent text-white border-gray-700" 
                            : "bg-transparent text-gray-900 border-gray-200"
                        }`}
                    >
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[0.75fr_1fr]">
                            {/* Blog Info Section */}
                            <li className={`row-span-3 p-4 rounded-md ${isDark ? "bg-accent" : "bg-accent"}`}>
                                <NavigationMenuLink asChild>
                                    <Link to="/" className="block focus:outline-none">
                                        <h3 className={`text-lg font-semibold p-2 mt-10 ${isDark ? "text-white" : "text-gray-900"}`}>
                                            BlogSphere
                                        </h3>
                                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            A blog platform where you can share your thoughts and insights.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>

                            {/* Links Section */}
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link to="/Login" 
                                        className={`block p-2 rounded-md
                                        ${isDark 
                                            ? "hover:bg-gray-800" 
                                            : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                            Login
                                        </span>
                                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            Login to your account
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link to="/support" 
                                        className={`block p-2 rounded-md
                                        ${isDark 
                                            ? "hover:bg-gray-800" 
                                            : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                            Support
                                        </span>
                                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            Support the author.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link to="/publish" 
                                        className={`block p-2 rounded-md
                                        ${isDark 
                                            ? "hover:bg-gray-800" 
                                            : "hover:bg-gray-100"
                                        }`}
                                    >
                                        <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                            Publish your content
                                        </span>
                                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            Write
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default MemberMenu;