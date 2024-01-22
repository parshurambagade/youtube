
import ButtonsContainer from './ButtonsContainer';
import VideosContainer from './VideosContainer';

const MainContainer = () => {
  return (
    <div className='py-2 px-8 w-[88%] my-16 flex flex-col justify-center'>
        <ButtonsContainer />
        <VideosContainer />
    </div>
  )
}

export default MainContainer