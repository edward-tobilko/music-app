import { CgPlayPauseR, CgPlayButtonR } from "react-icons/cg";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePlayClick,
  handlePauseClick,
}) => {
  return (
    <div className="playPouse">
      {isPlaying && activeSong?.title === song?.title ? (
        <CgPlayPauseR style={{ fontSize: 40 }} onClick={handlePauseClick} />
      ) : (
        <CgPlayButtonR style={{ fontSize: 40 }} onClick={handlePlayClick} />
      )}
    </div>
  );
};

export default PlayPause;
