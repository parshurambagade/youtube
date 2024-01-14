
const VideoCard = ({ video }) => {

    const {title, channelTitle, thumbnails} = video.snippet;
    const {viewCount} = video.statistics;
  return (
    <div className=" shadow-lg border border-slate-200  flex flex-col w-full rounded-lg ">
        <img src={thumbnails?.medium?.url} className="rounded-t-lg" alt="" />
        <div className="flex gap-1  flex-col mt-1 w-full p-2">
            <img src="" alt="" />
            <div>
            <h3 className="font-bold">{title}</h3>
            <p>{channelTitle}</p>
            <p>{viewCount} views</p>
            </div>
        </div>
    </div>
  )
}


export default VideoCard