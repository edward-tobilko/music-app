import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreAPI = createApi({
  reducerPath: "shazamCoreAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "d00dc11254msha8ff62bb9a7f140p12a942jsne1faea45ec56",
        // "1461301b60msh9b1b5306abe68d3p1c3774jsn92a296542762",
      );

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => `v1/charts/world`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `v1/tracks/details?track_id=${songId}`,
    }),
    getRelatedSong: builder.query({
      query: ({ songId }) => `v1/tracks/related?track_id=${songId}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: ({ countryCode }) =>
        `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (search) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${search}`,
    }),
    getGenreBySelect: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetRelatedSongQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetGenreBySelectQuery,
} = shazamCoreAPI;
