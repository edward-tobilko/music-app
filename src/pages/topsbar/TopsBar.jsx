import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import TopChartCard from "../../components/top-chart-card/TopChartCard";
import { useGetTopChartsQuery } from "../../redux/api/shazamCore";
import { setActiveSong, setPlayPause } from "../../redux/slices/playerSlice";
import "./tops-bar.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper";
import "swiper/css";
import "swiper/scss/free-mode";
import "swiper/scss/pagination";

const TopsBar = () => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(setPlayPause(true));
  };

  const handlePauseClick = () => {
    dispatch(setPlayPause(false));
  };

  return (
    <div className="tops__bar">
      {/* Top Charts */}
      <div className="tops__bar-title">
        <h1 className="tops__bar-name">Top Charts</h1>
        <Link to="/top-charts" className="tops__bar-link">
          See more
        </Link>
      </div>

      <div className="tops__bar-cards">
        {data
          ?.slice(5, 10)
          ?.map((song, index) => (
            <TopChartCard
              key={song.key}
              index={index}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, index)}
            />
          ))
          .reverse()}
      </div>

      <div className="tops__bar-title title__artist">
        <h1 className="tops__bar-name">Top Artists</h1>
        <Link to="/top-artists" className="tops__bar-link">
          See more
        </Link>
      </div>

      {/* Top Artists */}
      <Swiper
        className="tops__bar-artists"
        slidesPerView={"auto"}
        modules={[Pagination, FreeMode]}
        pagination={{ clickable: true, dynamicBullets: true }}
        centeredSlides
        centeredSlidesBounds
        freeMode
        spaceBetween={15}
      >
        {data
          ?.slice(0, 7)
          ?.map((artist) => (
            <SwiperSlide key={artist.key} className="tops__bar-artists-item">
              <Link to={`/artists/${artist?.artists[0]?.adamid}`}>
                <img
                  src={artist?.images?.background}
                  alt={artist?.artists[0]?.alias}
                  className="tops__bar-artists-img"
                />
              </Link>
            </SwiperSlide>
          ))
          .reverse()}
      </Swiper>
    </div>
  );
};

export default TopsBar;
