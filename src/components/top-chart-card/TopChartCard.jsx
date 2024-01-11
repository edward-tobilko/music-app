import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./top-chart-card.scss";

import { setActiveSong, setPlayPause } from "../../redux/slices/playerSlice";
import PlayPause from "../play-pause/PlayPause";

const TopChartCard = ({ song, index, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, index, data }));
    dispatch(setPlayPause(true));
  };

  const handlePauseClick = () => {
    dispatch(setPlayPause(false));
  };

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
      } py-2 p-2 rounded-lg cursor-pointer chartCard`}
    >
      <div className="chartCard-content">
        {/* <p className="chartCard-index"> {index + 1}. </p> */}
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          className="chartCard-img"
        />
        <div className="chartCard-desc">
          <p className="chartCard-des-name">
            <Link to={`/songs/${song?.key}`} className="song__card-desc-title">
              {song?.title}
            </Link>
          </p>
          <p className="chartCard-des-author">
            <Link
              className="song__card-desc-subtitle"
              to={
                song?.artists
                  ? `/artists/${song?.artists[0]?.adamid}`
                  : "/top-artists"
              }
            >
              {song?.subtitle}
            </Link>
          </p>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default TopChartCard;
