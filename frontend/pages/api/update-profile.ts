import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getNewTokenFromRefresh } from "@/helpers/api";

type Data = {
  message?: string;
  data?: string;
  user?: any;
  access?: string;
};

const UpdateProfile = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let accessToken = null;

  if (req.method === "PATCH") {
    const { username, first_name, last_name, email } = req.body;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = {
      username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    };

    try {
      const data = await getNewTokenFromRefresh(req);

      if (data && data.access) {
        const userConfig = {
          headers: {
            Authorization: "Bearer " + data.access,
          },
        };

        const { data: userData } = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}api/${process.env.NEXT_PUBLIC_API_VERSION}/account/update-profile/`,
          body,
          userConfig
        );

        res.status(200).json({ user: userData, access: data.access });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    } catch (error: any) {
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

export default UpdateProfile;
