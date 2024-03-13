
import { useSelector } from 'react-redux';
import ButtonsContainer from './ButtonsContainer';
import VideosContainer from './VideosContainer';

const MainContainer = () => {
  const showMenu = useSelector(state => state.menu.showMenu);
  const showMobileMenu = useSelector(state => state.menu.showMobileMenu);

  const showMobileSearchbar = useSelector(state => state.mobileSearchbar.showMobileSearchbar);
  return (
    <div className={`py-2 px-2 ${showMobileSearchbar ? "my-0 md:my-0 pt-0" : "my-12 md:my-16"}  lg:my-12  sm:px-4  w-full  ${!showMenu ? "w-full xl:px-8 " : "  lg:w-[85%] xl:px-4 "} ${showMobileMenu && "hidden"}   flex flex-col justify-center ${!showMobileSearchbar &&  "pt-6 lg:pt-0 pb-4"}`}> 
        <ButtonsContainer />
        <VideosContainer />
    </div>
  )
}

export default MainContainer