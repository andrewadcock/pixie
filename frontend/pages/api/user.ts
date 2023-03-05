import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import axios from "axios";

type Data = {
  message?: string;
  data?: string;
  user?: any;
  access?: string;
};

const User = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not authorized." });
    }
    try {
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
        `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/user/`,
        body,
        config
      );
      console.log("data", data);
    } catch (error: any) {}
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }

  res.status(200).json({ message: "User has been logged out." });
};

export default User;
