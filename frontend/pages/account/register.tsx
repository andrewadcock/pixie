import React, { useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";
import {
  passwordRules,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/helpers/validation";

function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string>("");

  const handlePassword = (password: string) => {
    setErrorPassword(validatePassword(password));
    setPassword(password);
  };

  const handleEmail = (email: string) => {
    setErrorEmail(
      validateEmail(email) ? "" : "Please enter a valid email address"
    );

    setEmail(email);
  };

  const handleUsername = (username: string) => {
    setErrorUsername(validateUsername(username));
    setUsername(username);
  };

  return (
    <div>
      <h3>Register</h3>
      <div>
        <FormGroup>
          <TextField
            label={"First Name"}
            variant={"outlined"}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setFirstName(e.target.value)}
          />
          <TextField
            label={"Last Name"}
            variant={"outlined"}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setLastName(e.target.value)}
          />
          {errorEmail}
          <TextField
            label={"email"}
            variant={"outlined"}
            type={"email"}
            value={email}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handleEmail(e.target.value)}
          />
          {errorUsername}
          <TextField
            label={"username"}
            variant={"outlined"}
            value={username}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handleUsername(e.target.value)}
          />
          {passwordRules()}
          {errorPassword}
          <TextField
            label={"password"}
            variant={"outlined"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handlePassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Show Password"
            onChange={(e: React.SyntheticEvent) =>
              setShowPassword((e.target as HTMLInputElement).checked)
            }
          />

          <Button
            variant={"contained"}
            disabled={
              firstName === "" ||
              lastName === "" ||
              errorUsername !== "" ||
              username === "" ||
              errorPassword !== "" ||
              password === "" ||
              errorEmail !== "" ||
              email !== ""
            }
          >
            Create Account
          </Button>
        </FormGroup>
        {username}
        {password}
      </div>
    </div>
  );
}
export default Register;
