// import { ThemeProvider } from './context/ThemeProvider'
// import Layout from './layout/Layout'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'




// function App() {

//   return (
//     <>
//     <ThemeProvider defaultTheme='dark'>
//     <Routes>
//       <Route path='/' element={<Layout/>}>
//       <Route path='/Home' element={<Home/>}/>
//       <Route path='/about' element={<About/>}/>
//       </Route>
//       </Routes>
//     </ThemeProvider>
    
//     </>
//   )
// }
// export default App
import { ThemeProvider } from './context/ThemeProvider'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Publication from './pages/Publication'
import Lecture from './pages/Lecture'
import Publish from "./pages/Publish";
import Projects from './pages/Projects'
import BlogDetail from './pages/BlogDetails'




function App() {

  return (
    <>
    <ThemeProvider defaultTheme='dark'>
      <Header/>
    <Routes>
     
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/publications' element={<Publication/>}/>
      <Route path='/lecture' element={<Lecture/>}/>
      <Route path='/publish' element={<Publish/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path="/blog/:id" element={<BlogDetail />} />

    
      </Routes>
      <Footer/>
    </ThemeProvider>
    
    </>
  )
}

export default App
