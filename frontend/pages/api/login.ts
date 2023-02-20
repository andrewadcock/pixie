import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: string;
  user?: any;
  access?: string;
};

const LoginApi = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let accessToken = null;

  if (req.method === "POST") {
    const { username, password } = req.body;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = {
      username,
      password,
    };

    try {
      const { data: tokenReponse } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/api-token-auth/`,
        body,
        config
      );
      accessToken = tokenReponse.token;
    } catch (error: Error | AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        return res.status(401).json({ message: error.response.data.detail });
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return res.status(500).json({ message: "Something went wrong." });
    }
    if (accessToken) {
      const userConfig = {
        headers: {
          Authorization: "Token " + accessToken,
        },
      };

      const { data: userData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/user/`,
        userConfig
      );

      res.status(200).json({ user: userData, access: accessToken });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default LoginApi;
