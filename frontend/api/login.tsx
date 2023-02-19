import axios from "axios";

const LoginApi = async (req: any, res: any) => {
  let accessToken = null;

  if (req.method === "POST") {
    const { email, password } = req.body;

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = {
      email,
      password,
    };

    const data = await axios.post(
      `${process.env.APIURL}/api/token`,
      body,
      config
    );
    console.log("data", data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default LoginApi;
