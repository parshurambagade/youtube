
import { useNavigate } from "react-router-dom";

const ButtonsContainer = () => {

  const navigate = useNavigate();

  const categoryList = [
    {id:0, name: 'All'},
    { id: 1, name: 'Film & Animation' },
    { id: 2, name: 'Autos & Vehicles' },
    { id: 10, name: 'Music' },
    { id: 15, name: 'Pets & Animals' },
    { id: 17, name: 'Sports' },
    { id: 19, name: 'Travel & Events' },
    { id: 20, name: 'Gaming' },
    { id: 22, name: 'People & Blogs' },
    { id: 23, name: 'Comedy' },
    { id: 24, name: 'Entertainment' },
    { id: 25, name: 'News & Politics' },
    { id: 26, name: 'Howto & Style' },
    { id: 27, name: 'Education' },
    { id: 28, name: 'Science & Technology' },
    { id: 29, name: 'Nonprofits & Activism' }
  ];
    const handleButtonClick = (category) => {
      navigate(`/?category=${category}`);
    }

  return (
    
    <div className={`buttonsContainer  mb-1 md:mb-4 flex gap-2 lg:gap-8 py-2 lg:pt-8 lg:pb-4  justify-normal  w-full overflow-x-scroll`}>
      {categoryList.map((category,i) => (
        <div key={i} className="text-xs md:text-sm p-2 h-max flex items-center border w-max py-1 bg-slate-100 rounded-lg cursor-pointer text-nowrap hover:bg-slate-200" onClick={() => handleButtonClick(category.id)}>{category.name}</div>
      ))}  
    </div>
  )
}

export default ButtonsContainer