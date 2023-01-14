import "./artist-albums.scss";

const ArtistAlbums = ({ data, artistId }) => {
  let nameArtist = data?.attributes?.editorialNotes?.name;

  return (
    <>
      <h1 className="artist__albums-title">Albums:</h1>
      {data.length > 0 ? (
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
                    ? album?.attributes?.editorialArtwork?.subscriptionCover?.url
                        .replace("{w}", "340")
                        .replace("{h}", "340")
                    : album?.data?.images?.coverart
                }
                alt={album?.data?.title}
                className="artist__albums-item-img"
              />

              <div className="artist__albums-item__desc">
                <a
                  href={`${album?.attributes?.url}`}
                  className="artist__albums-item__desc-name"
                  target="blank"
                >
                  {nameArtist
                    ? album?.attributes?.editorialNotes?.name
                    : album?.attributes?.name}
                </a>
                <p className="artist__albums-item__desc-genre">
                  <span>{album?.attributes?.editorialNotes?.short}</span>
                  <span>{album?.attributes?.lastModifiedDate}</span>
                </p>
                <p className="artist__albums-item__desc-copyright">
                  <span>{album?.attributes?.copyright}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="artist__albums-notFound">Alboms not found...</div>
      )}
    </>
  );
};

export default ArtistAlbums;
