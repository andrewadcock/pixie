import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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
    console.log("email in login UserProvider", email);
    console.log("password", password);
  };

  return (
    <UserContext.Provider value={{ email, accessToken, error, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
