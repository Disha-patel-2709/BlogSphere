import React from 'react'
import { FiTwitter } from "react-icons/fi";


const Projects = () => {
  return (
    <div className="py-10">
        <div className="container max-w-[1500px] mx-auto px-4">
          <div className='border h-[60vh]'>
            <div className='flex gap-6 items-center justify-center max-w-[1000px] px-10 py-2'>
             <img src="http://res.cloudinary.com/dqorw2i00/image/upload/v1739889920/rdqzks2d8srftysfkcwg.jpg" className=" h-40 object-cover" alt="" />
       
             <div className='flex flex-col mb-3 gap-3  '>
             
              <h1>The Risk Intelligence Group</h1>

                <p className='flex gap-2 items-center'> <span><FiTwitter /></span> @xyz </p>

              <p className='leading-relaxed'>The Risk Intelligence Group (TRIG) is an independent open-source intelligence and analysis organization providing real-time coverage and insights on global security developments, geopolitical events, and emerging threats. Our team of security and intelligence professionals delivers verified breaking news and detailed analysis, helping our audience understand the broader implications of critical global events as they unfold. Operating 24/7, we combine rigorous verification standards with rapid reporting to ensure our coverage is both timely and reliable. As a partner organization of The New Security Project, we contribute to the broader discourse on emerging security challenges and innovative approaches to understanding global threats.</p>
             </div>
            
          </div>
          </div>
    </div>
    </div>
  )
}

export default Projects