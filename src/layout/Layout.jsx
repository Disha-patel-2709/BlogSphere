// import Footer from "@/components/footer/Footer"
// import Header from "@/components/header/Header"
// import { Outlet } from "react-router-dom"


// const layout = () => {
//   return (
//     <div className="bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
//         <Header />
//         <main className="min-h-screen container max-w-[1400px] mx-auto px-4 py-8">
//          {<Outlet/>}
//         </main>
//         <Footer />
  
//     </div>
//   )
// }

// export default layout

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
// import Home from './pages/Home'

const Layout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={isDark ? "bg-[hsl(240,10%,3.9%)] text-white" : "bg-white text-black"}>
      <Header />
      <main className="min-h-screen container max-w-[1400px] mx-auto px-4 py-8">
        {<Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
