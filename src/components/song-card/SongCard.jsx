import { Link } from "react-router-dom";
import "./song-card.scss";
import PlayPause from "../play-pause/PlayPause";
import { useDispatch } from "react-redux";
import { setActiveSong, setPlayPause } from "../../redux/slices/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, index, data }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(setPlayPause(true));
  };

  const handlePauseClick = () => {
    dispatch(setPlayPause(false));
  };
  return (
    <>
      <div className="song__card-item">
        <div className="relative group">
          <div
            className={`absolute inset-0 justify-center items-center bg-black bg-opacity-70 group-hover:flex ${
              activeSong?.title === song?.title
                ? "flex bg-black bg-opacity-70"
                : "hidden"
            }`}
          >
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          </div>
          <img
            src={song?.images?.coverart}
            alt="Song__img"
            className="song__card-img"
          />
        </div>

        <div className="song__card-desc">
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link to={`/songs/${song?.key}`} className="song__card-desc-title">
              {song?.title}
            </Link>
          </p>
          <p>
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
    </>
  );
};

export default SongCard;
