import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import axios from "axios";
import { getNewTokenFromRefresh } from "@/helpers/api";

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
      const data = await getNewTokenFromRefresh(req);

      if (data && data.access) {
        const userConfig = {
          headers: {
            Authorization: "Bearer " + data.access,
          },
        };

        const { data: userData } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/user/`,
          userConfig
        );

        res.status(200).json({ user: userData, access: data.access });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    } catch (error: any) {}
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};

export default User;
