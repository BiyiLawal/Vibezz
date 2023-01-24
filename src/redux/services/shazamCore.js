import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b25ba5028bmsh9abac91c655457ep1f8e18jsn532bb0a67dde');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopChart: builder.query({ query: () => 'v1/charts/world'}),
        getSongDetails: builder.query({query:({detailId})=>`v1/tracks/details?track_id=${detailId}`}),
        getSongsByGenre: builder.query({ query: (genre) => `v1/charts/genre-world?genre_code=${genre}` }),
        getNaijaChart: builder.query({query:({NG})=>`v1/charts/country?country_code=${NG}`}),
        getSongsByCountry: builder.query({ query: (countryCode) => `v1/charts/country?country_code=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
        // getRelatedSong: builder.query({query:({detailId})=>`v1/tracks/related?track_id?=${detailId}`}),
        getArtistDetails: builder.query({ query: (artistId) => `v2/artists/details?artist_id=${artistId}` }),
    }),
});

export const {
    useGetTopChartQuery,
    useGetSongDetailsQuery,
    useGetSongsByGenreQuery,
    useGetSongsByCountryQuery,
    useGetNaijaChartQuery,
    useGetSongsBySearchQuery,
    useGetArtistDetailsQuery,
    useGetRelatedSongQuery
} = shazamCoreApi;