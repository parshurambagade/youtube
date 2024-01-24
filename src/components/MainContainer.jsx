
import { useSelector } from 'react-redux';
import ButtonsContainer from './ButtonsContainer';
import VideosContainer from './VideosContainer';

const MainContainer = () => {
  const showMenu = useSelector(state => state.menu.showMenu);

  return (
    <div className={`py-2 px-2 my-12  sm:px-4  w-full  ${!showMenu ? " lg:w-full xl:px-8" : "hidden md:flex md:w-3/4 lg:w-[85%] xl:pl-1 xl:pr-8"}  lg:my-16 flex flex-col justify-center`}> 
        <ButtonsContainer />
        <VideosContainer />
    </div>
  )
}

export default MainContainer