import ReactPlayer from "react-player";

const Video = () => {
  return (
    <div className="video-container">
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=HbTqoEGTm9c"}
        muted={true}
        controls={false}
        playing={true}
        loop={true}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default Video;
