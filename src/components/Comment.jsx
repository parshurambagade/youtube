
const Comment = ({comment}) => {
    const {name, text} = comment;
  return (
    <div className="flex gap-3 bg-gray-100 p-2 my-2">
        <img src="https://th.bing.com/th/id/R.01da0902c89677030d1b4653bd4a1351?rik=NuG6S0lHm51WxQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-Free-Image.png&ehk=0ER186lOvX51zPC0dwi85VKFnvFXEjj%2fvWxVS0bOqbk%3d&risl=&pid=ImgRaw&r=0" alt="img" className="w-12 rounded-full border border-black"/>
        <div>
        <h4 className="font-bold text-lg">{name}</h4>
        <p>{text}</p>
        </div>
    </div>
  )
}

export default Comment