import React from "react";
import "./artist-albums.scss";

const ArtistAlbums = ({ data, artistId }) => {
  return (
    <>
      <h1 className="artist__albums-title">Albums:</h1>
      <div className="artist__albums">
        {data?.map((album, index) => (
          <div
            className="artist__albums-item"
            key={`${artistId}-${album?.id}-${index}`}
            index={index}
          >
            <img
              src={
                artistId
                  ? album?.attributes?.artwork?.url
                      .replace("{w}", "340")
                      .replace("{h}", "340")
                  : album?.images?.coverart
              }
              alt={album?.title}
              className="artist__albums-item-img"
            />

            <div className="artist__albums-item__desc">
              <a
                href={`${album?.attributes?.url}`}
                className="artist__albums-item__desc-name"
                target="blank"
              >
                {album?.attributes?.name}
              </a>
              <p className="artist__albums-item__desc-genre">
                <span>{album?.attributes?.genreNames[0]}</span>
                <span>{album?.attributes?.releaseDate}</span>
              </p>
              <p className="artist__albums-item__desc-copyright">
                <span>{album?.attributes?.copyright}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArtistAlbums;
