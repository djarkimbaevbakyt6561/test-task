import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  tagTypes: ["Character"],
  endpoints: (builder) => ({
    getGoods: builder.query({
      query: () => "character",
    }),
  }),
});

export const { useGetGoodsQuery } = goodsApi;
