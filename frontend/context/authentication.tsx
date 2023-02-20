import { createContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import LoginApi from "@/pages/api/login";

interface UserProviderProps {
  children: any;
}

interface LoginProps {
  email: string;
  password: string;
}

const defaultUserContext = {
  user: {},
  accessToken: "",
  error: "",
  login: (props: LoginProps) => new Promise(() => {}),
};

const UserContext = createContext(defaultUserContext);

export const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  const login = async (props: LoginProps) => {
    const { email, password } = props;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = {
      username: email,
      password,
    };

    try {
      const { data: accessResponse } = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}api/login`,
        body,
        config
      );

      console.log("accessResponse", accessResponse);

      if (accessResponse && accessResponse.user) {
        setUser(accessResponse.user);
      }
      if (accessResponse && accessResponse.access) {
        setAccessToken(accessResponse.access);
      }

      await router.push("/");
    } catch (error: Error | AxiosError) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        return;
      }
      console.error("Error: ", error.message);
      setError("Something went wrong.");
    }
  };

  return (
    <UserContext.Provider value={{ user, accessToken, error, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
