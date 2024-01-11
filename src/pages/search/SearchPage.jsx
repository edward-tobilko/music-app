import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetSongsBySearchQuery } from "../../redux/api/shazamCore";

import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
import SongCard from "../../components/song-card/SongCard";

const SearchPage = () => {
  const { search } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(search);

  const songs = data?.tracks?.hits?.map((song) => song?.track);

  if (isFetching) return <Loader title="Loading songs..." />;
  if (error) return <Error />;

  return (
    <>
      <div className="discover__container-content">
        {songs
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
    </>
  );
};

export default SearchPage;
