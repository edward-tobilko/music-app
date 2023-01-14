import { Link } from "react-router-dom";
import { FcMusic } from "react-icons/fc";

const HeaderDetails = ({ songData, artistId, artistDetailsData }) => {
  return (
    <div className="song__details-header">
      {artistId ? (
        <img
          src={
            artistId
              ? artistDetailsData?.data[0].attributes?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songData?.images?.background
          }
          alt="Details__img"
          className="song__details-header-img"
        />
      ) : (
        <img
          src={
            artistId
              ? artistDetailsData?.data[0]?.attributes?.artwork?.url
                  .replace("{w}", "400")
                  .replace("{h}", "400")
              : songData?.images?.background
          }
          alt="Details__img"
          className="song__details-header-img"
        />
      )}

      <div className="song__details-header__desc">
        {artistId ? (
          <p className="song__details-header__desc-name">
            {artistDetailsData?.data[0]?.attributes?.name}
          </p>
        ) : (
          <Link
            to={`/artists/${songData?.artists[0]?.adamid}`}
            className="song__details-header__desc-link"
          >
            {songData?.subtitle}
          </Link>
        )}

        <div className="song__details-header__desc-name">
          {artistId ? (
            <>
              {artistDetailsData?.data[0]?.meta?.views?.order[0]}:
              <a
                href={`${artistDetailsData?.data[0]?.attributes?.url}`}
                target="blank"
              >
                <FcMusic />
              </a>
            </>
          ) : (
            <div>
              {songData?.sections[0]?.metadata[1]?.title}:
              <span className="song__details-header__desc-label">
                {songData?.sections[0]?.metadata[1]?.text}
              </span>
            </div>
          )}
        </div>

        <div className="song__details-header__desc-name">
          {artistId ? null : (
            <>
              {songData?.sections[0]?.metadata[0]?.title}:
              <span className="song__details-header__desc-label">
                {songData?.sections[0]?.metadata[0]?.text}
              </span>
            </>
          )}
        </div>

        <div className="song__details-header__desc-name">
          {artistId ? null : (
            <>
              Genre:
              <span className="song__details-header__desc-label">
                {artistId
                  ? artistDetailsData?.data[0]?.attributes?.genreNames[0]
                  : songData?.genres?.primary}
              </span>
            </>
          )}
        </div>

        <div className="song__details-header__desc-name">
          {artistId ? null : (
            <>
              {songData?.sections[0]?.metadata[2]?.title}:
              <span className="song__details-header__desc-label">
                {songData?.sections[0]?.metadata[2]?.text}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
