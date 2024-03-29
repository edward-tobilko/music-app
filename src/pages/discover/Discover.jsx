import { useSelector } from "react-redux";

import "./discover.scss";

import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";
import SongCard from "../../components/song-card/SongCard";

import { useGetGenreBySelectQuery } from "../../redux/api/shazamCore";

const Discover = () => {
  const { genreItem, activeSong, isPlaying } = useSelector(
    (state) => state.player,
  );
  const { data, isFetching, error } = useGetGenreBySelectQuery(
    genreItem || "POP",
  );

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  return (
    <div className="discover">
      <div className="discover__container">
        <div className="discover__container-content">
          {data
            ?.map((song, index) => (
              <SongCard
                index={index}
                song={song}
                key={song.key}
                activeSong={activeSong}
                isPlaying={isPlaying}
                data={data}
              />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default Discover;
