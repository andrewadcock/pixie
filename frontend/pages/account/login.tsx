import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <h3>Login</h3>
      <div>
        <form>
          <TextField
            label={"username"}
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
          <Button variant={"contained"}>Login</Button>
        </form>
        <div>
          Don't have an account? <Link href="/account/register">Sign Up</Link>
        </div>
        {username}
        {password}
      </div>
    </div>
  );
}

export default Login;
