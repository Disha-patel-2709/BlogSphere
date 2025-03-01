import BlogList from '@/components/bloglist/BlogList';
import PopularBlogs from '@/components/bloglist/PopularBlogs';
import Slider from '@/components/slider/Slider';

const Home = () => {
  return (
    <div className='flex flex-col'>
    <div className="flex w-full max-w-[1500px] m-8 mx-auto container ">
      <Slider />
      <BlogList />
    </div>
    <div>
      <PopularBlogs/>
    </div>
    </div>
  );
};

export default Home;
