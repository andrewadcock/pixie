import { createContext, useState } from "react";
import axios from "axios";
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
  email: "",
  accessToken: "",
  error: "",
  login: (props: LoginProps) => new Promise(() => {}),
};

const UserContext = createContext(defaultUserContext);

export const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [email, setEmail] = useState<any>(null);
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

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}api/login`,
      body,
      config
    );
    console.log("data", data);
  };

  return (
    <UserContext.Provider value={{ email, accessToken, error, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
