import cookie from "cookie";
import axios from "axios";
import { NextApiRequest } from "next";

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
