import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";
import UserContext from "@/context/authenticationContext";

function Login() {
  const userCtx = useContext(UserContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    userCtx.login({ username, password });
  };

  const handleLoginViaEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <div>
        <FormControl tabIndex={0} onKeyUp={handleLoginViaEnter}>
          <TextField
            label={"Username"}
            variant={"outlined"}
            value={username}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setUsername(e.target.value)}
          />
          <TextField
            label={"password"}
            variant={"outlined"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setPassword(e.target.value)}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Show Password"
              onChange={(e: React.SyntheticEvent) =>
                setShowPassword((e.target as HTMLInputElement).checked)
              }
            />
          </FormGroup>
          <Button variant={"contained"} onClick={handleLogin} type={"submit"}>
            Login
          </Button>
        </FormControl>
        <div>
          Don't have an account? <Link href="/account/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
