import axios from "axios";
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

    const { data: accessToken } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/api-token-auth/`,
      body,
      config
    );

    if (accessToken) {
      const userConfig = {
        headers: {
          Authorization: "Token " + accessToken.token,
        },
      };

      const { data: userData } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/user/`,
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
