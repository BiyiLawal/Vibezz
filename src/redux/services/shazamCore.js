import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b25ba5028bmsh9abac91c655457ep1f8e18jsn532bb0a67dde');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopChart: builder.query({ query: () => '/charts/world'}),
        getSongDetails: builder.query({query:({detailId})=>`/tracks/details?track_id=${detailId}`}),
        getNaijaChart: builder.query({query:(NG)=>`/charts/country?country_code=${NG}`}),
        getRelatedSong: builder.query({query:({detailId})=>`/tracks/related?track_id?=${detailId}`}),
    }),
});

export const {
    useGetTopChartQuery,
    useGetSongDetailsQuery,
    useGetNaijaChartQuery,
    useGetRelatedSongQuery
} = shazamCoreApi;