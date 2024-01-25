import { useState } from "react";

const VideoDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-100 overflow-hidden text-wrap ">
      <p>
        {isExpanded ? description : `${description.slice(0, 100)}...`}
        {description.length > 100 && (
          <button onClick={toggleDescription} className="mx-2 font-medium">
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    </div>
  );
};

export default VideoDescription;
