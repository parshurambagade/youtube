
const buttonsContainer = () => {
    const list = ["All", "Commedy", "Music", "Computer", "Programming", "New Year", "Sports", "News"];

  return (
    <div className="flex gap-8 py-4">
      {list.map((button,i) => (
        <div key={i} className="p-2 border w-max py-1 bg-slate-100 rounded-lg">{button}</div>
      ))}
        
    </div>
  )
}

export default buttonsContainer