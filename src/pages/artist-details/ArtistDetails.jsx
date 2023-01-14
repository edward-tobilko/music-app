import { useParams } from "react-router-dom";

import ArtistAlbums from "../../components/artist-albums/ArtistAlbums";
import Error from "../../components/error/Error";
import HeaderDetails from "../../components/header-details/HeaderDetails";
import Loader from "../../components/loader/Loader";
import { useGetArtistDetailsQuery } from "../../redux/api/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();

  const {
    data: artistDetailsData,
    isFetching: isFetchingArtistDetails,
    error: isErrorArtistDetails,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader />;
  if (isErrorArtistDetails) return <Error />;

  return (
    <div style={{ marginTop: 30 }}>
      <HeaderDetails
        artistDetailsData={artistDetailsData}
        artistId={artistId}
      />
      <ArtistAlbums
        data={Object.values(artistDetailsData?.data[0]?.views?.playlists?.data)}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
