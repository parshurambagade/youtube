import { useNavigate } from "react-router-dom";

const ButtonsContainer = () => {
  const navigate = useNavigate();

    const list = ["All", "Commedy", "Music", "Computer", "Programming", "New Year", "Sports", "News", "ReactJS", "Software Engineer"];
    const handleButtonClick = (button) => {
      navigate(`/results?search=${button}`);
    }
  return (
    <div className="buttonsContainer flex gap-8 py-2  justify-normal mb-4 w-3/4 overflow-x-auto">
      {list.map((button,i) => (
        <div key={i} className="p-2 h-max flex items-center border w-max py-1 bg-slate-100 rounded-lg cursor-pointer text-nowrap hover:bg-slate-200" onClick={() => handleButtonClick(button)}>{button}</div>
      ))}
        
    </div>
  )
}

export default ButtonsContainer