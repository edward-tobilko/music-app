import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./around-you.scss";

import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";
import SongCard from "../../components/song-card/SongCard";

import { useGetSongsByCountryQuery } from "../../redux/api/shazamCore";

// Get my geolocation api
const geoDataApi =
  "https://geo.ipify.org/api/v2/country?apiKey=at_Y6KnvvI1jJwFtAOIontQzKvp5RRWg&ipAddress=8.8.8.8";

const AroundYou = () => {
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(true);

  const { data, isFetching, error } = useGetSongsByCountryQuery({
    countryCode,
  });
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(geoDataApi)
      .then((response) => setCountryCode(response?.data?.location?.country))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [countryCode]);

  if (isFetching && loading) return <Loader />;
  if (error && countryCode !== "") return <Error />;

  return (
    <div className="around__you">
      <h1 className="around__you-title">Around You</h1>
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
  );
};

export default AroundYou;
