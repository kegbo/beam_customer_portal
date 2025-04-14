"use server";

import { tradingApiService } from "../api/services/trading.service";

export const useLosersGainers = async () => {
  try {
    const { data } = await tradingApiService.getMarketActivities("losers");
    return {
      gainers: data[0].Market.slice(0, 5),
      losers: data[1].Market.slice(0, 5),
    };
  } catch (error) {
    console.log(error);
    return { gainers: [], losers: [] };
  }
};
