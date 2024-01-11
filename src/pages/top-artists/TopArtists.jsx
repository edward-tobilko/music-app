import { useNavigate } from "react-router-dom";

import "./top-artists.scss";

import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";

import { useGetTopChartsQuery } from "../../redux/api/shazamCore";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const navigate = useNavigate();

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="top__artists">
      <h1 className="top__artists-title">Top Artists</h1>
      {data
        ?.map((artist, index) => (
          <div key={artist?.key} index={index}>
            <div className="top__artists-item">
              <img
                src={artist?.images?.background}
                alt=""
                className="top__artists-item-img"
              />
              <div className="top__artists-item-desc">
                <p
                  className="top__artists-item-desc-link"
                  onClick={() =>
                    navigate(`/artists/${artist?.artists[0]?.adamid}`)
                  }
                >
                  {artist?.subtitle}
                </p>
                <br />
                <a
                  href={artist?.share?.href}
                  className="top__artists-item-desc-social"
                  target="blank"
                >
                  {artist?.share?.twitter}
                </a>
              </div>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default TopArtists;
