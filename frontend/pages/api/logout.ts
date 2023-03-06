import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

type Data = {
  message?: string;
  data?: string;
  user?: any;
  access?: string;
};

const Logout = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("refresh", "", {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_IS_HTTPS === "true",
      expires: new Date(0),
      path: "/",
      sameSite: "strict",
    })
  );

  res.status(200).json({ message: "User has been logged out" });
};

export default Logout;
