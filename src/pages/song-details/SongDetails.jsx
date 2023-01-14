import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Error from "../../components/error/Error";
import HeaderDetails from "../../components/header-details/HeaderDetails";
import Loader from "../../components/loader/Loader";
import RelatedSongs from "../../components/related-songs/RelatedSongs";
import {
  useGetRelatedSongQuery,
  useGetSongDetailsQuery,
} from "../../redux/api/shazamCore";
import { setActiveSong, setPlayPause } from "../../redux/slices/playerSlice";
import "./song-details.scss";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songId, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: errorSongDetails,
  } = useGetSongDetailsQuery(songId);

  const {
    data: relatedDataSong,
    isFetching: isFetchingRelatedSong,
    error: errorRelatedSong,
  } = useGetRelatedSongQuery({ songId });

  if (isFetchingSongDetails && isFetchingRelatedSong) return <Loader />;
  if (errorSongDetails && errorRelatedSong) return <Error />;

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, index, relatedDataSong }));
    dispatch(setPlayPause(true));
  };

  const handlePauseClick = () => {
    dispatch(setPlayPause(false));
  };

  return (
    <div className="song__details">
      <HeaderDetails songData={songData} artistId={artistId} />

      <div className="song__details-content">
        {songData?.sections[1]?.type === "LYRICS" ? (
          <>
            <h1 className="song__details-content-title">
              {songData?.sections[1]?.tabname}
            </h1>
            <p className="song__details-content-text">
              {songData?.sections[1]?.text}
            </p>
          </>
        ) : (
          <p> Sorry, No LYRICS found! </p>
        )}
      </div>

      <div className="song__details-footer">
        <div className="song__details-footer-related__songs">
          <h1 className="song__details-footer-related__songs-title">
            Related Songs:
          </h1>

          <div className="song__details-footer-related__songs-content">
            <RelatedSongs
              relatedDataSong={relatedDataSong}
              artistId={artistId}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePlayClick={handlePlayClick}
              handlePauseClick={handlePauseClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
