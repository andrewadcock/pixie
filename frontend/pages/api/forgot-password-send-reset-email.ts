import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getNewTokenFromRefresh } from "@/helpers/api";

type Data = {
  message?: string;
  data?: string;
};

/**
 * Forgot Password Send Reset Email
 *
 * @param req
 * @param res
 * @constructor
 */
const forgotPasswordSendResetEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  console.log("forgot-password");
  if (req.method === "POST") {
    const body = {
      email: req.body.email,
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/forgot-password-send-reset-email`,
        body,
        config
      );
      console.log("data", data);

      // res.status(200).json({ data });
    } catch (error: any) {
      console.log("ERROR ERROR ERROR ERROR ERROR");
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
        console.error("Error", error.message);
      }
      return res.status(500).json({ message: "Something went wrong." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};

export default forgotPasswordSendResetEmail;
