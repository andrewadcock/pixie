import cookie from "cookie";
import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest } from "next";
import { getMockTitles } from "../mocks/titlesMock";

interface IRapidApiOptions {
  method: string;
  url: string;
  headers: IRapidAPIHeaders;
  params: IRapidApiTitleParams;
}

interface IRapidAPIHeaders {
  "X-RapidAPI-Key": string;
  "X-RapidAPI-Host": string;
}
interface IRapidApiTitleParams {
  title: string;
  country?: string;
  show_type?: string;
  output_language?: string;
}

/**
 * Token refresh
 *
 * Uses refresh token from (local) cookie to get new token
 * @param req
 */
export const getNewTokenFromRefresh = async (req: NextApiRequest) => {
  const { refresh } = cookie.parse(req.headers.cookie || "");
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const body = {
    refresh,
  };
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/token/refresh/`,
    body,
    config
  );

  return data;
};

/**
 * RapidAPI Default Options
 *
 * @param queryType: countries, genres, get (by ID), search/filters, search/title, changes, leaving
 */
const getRapidAPIOptions = (queryType: string) => {
  return {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_RAPIDAPI_BASE_URL}${queryType}`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      "X-RapidAPI-Host": `${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}`,
    },
  };
};

/**
 * Searches RAPIDAPI titles
 *
 * User input used to query for matching titles OR mock data if env var is set
 * @param entry
 * @param params
 */
export const queryApiByTitle = async (
  entry: string,
  params?: IRapidApiTitleParams
) => {
  const options = getRapidAPIOptions("search/title") as AxiosRequestConfig<any>;

  if (params) {
    options["params"] = params;
  }

  try {
    let response;

    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
      console.warn("Using Mock Data for API calls");
      response = getMockTitles;
    } else {
      response = await axios.request(options);
    }

    if (response?.data) {
      // Limit responses to prevent stack overflow and keep things speedy
      return response.data.length > 50
        ? response.data.slice(0, 50)
        : response.data;
    }
  } catch (error) {
    console.error(error);
  }
};
