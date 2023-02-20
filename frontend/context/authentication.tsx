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

export interface IUser {
  first_name: string;
  last_name: string;
  pk: string;
  email: string;
}

interface UserContext {
  user: IUser | {};
  accessToken: string;
  error: string;
  login: any;
}

const defaultUserContext = {
  user: {},
  accessToken: "",
  error: "",
  login: (props: LoginProps) => new Promise(() => {}),
};

// const UserContext = createContext(defaultUserContext);
const UserContext = createContext<UserContext>(defaultUserContext);

export const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<IUser | {}>({});
  const [accessToken, setAccessToken] = useState<string>("");
  const [error, setError] = useState<string>("");

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
        setUser(accessResponse.user[0]);
      }
      if (accessResponse && accessResponse.access) {
        setAccessToken(accessResponse.access);
      }

      await router.push("/");
    } catch (error: any) {
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
