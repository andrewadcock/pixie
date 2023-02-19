import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  data?: string;
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

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/api-token-auth/`,
      body,
      config
    );

    if (data) {
      res.status(200).json({ data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default LoginApi;
