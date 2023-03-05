import { createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import LoginApi from "@/pages/api/login";

interface UserProviderProps {
  children: any;
}

interface LoginProps {
  username: string;
  password: string;
}

export interface IUser {
  first_name: string;
  last_name: string;
  pk?: string;
  email: string;
  username: string;
  password?: string;
}

interface UserContext {
  user: IUser;
  accessToken: string;
  error: string;
  login: (props: LoginProps) => Promise<unknown>;
  register: (props: IUser) => Promise<unknown>;
  logout: () => void;
  isUserLoggedIn: () => void;
}

const defaultUser = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  email: "",
};

const defaultUserContext = {
  user: defaultUser,
  accessToken: "",
  error: "",
  login: (props: LoginProps) => new Promise(() => {}),
  register: (props: IUser) => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  isUserLoggedIn: () => new Promise(() => {}),
};

// const UserContext = createContext(defaultUserContext);
const UserContext = createContext<UserContext>(defaultUserContext);

export const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<IUser>(defaultUser);
  const [accessToken, setAccessToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const login = async (props: LoginProps) => {
    const { username, password } = props;

    const body = {
      username,
      password,
    };

    try {
      const { data: accessResponse } = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}api/login`,
        body,
        config
      );

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

  const register = async (props: IUser) => {
    const body = {
      username: props.username,
      email: props.email,
      password: props.password,
      first_name: props.first_name,
      last_name: props.last_name,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}api/register`,
        body,
        config
      );
      login({
        username: props.username,
        password: props.password || "",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        return;
      }
      console.error("Error: ", error.message);
      setError("Something went wrong.");
    }
  };

  const logout = async () => {
    try {
      // Remove cookie
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}api/logout`);

      setUser(defaultUser);
      setAccessToken("");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        return;
      }
      console.error("Error: ", error.message);
      setError("Something went wrong.");
    }
  };

  const isUserLoggedIn = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}api/user`
      );
      setUser(data.user);
      setAccessToken(data.acess);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        console.error("Error: ", error.message);
        setError("Something went wrong.");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        error,
        login,
        register,
        logout,
        isUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
