import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import {
  passwordRules,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/helpers/validation";
import Link from "next/link";
import UserContext from "@/context/authentication";

function Register() {
  const { register } = useContext(UserContext);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
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

  const isFormValid = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      errorPassword !== "" ||
      errorEmail !== "" ||
      errorUsername !== ""
    ) {
      return false;
    }

    return true;
  };

  const handleLoginViaEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRegistration(e);
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      password,
      email,
      last_name: lastName,
      first_name: firstName,
    };

    register(userData);
  };

  return (
    <div>
      <h3>Register</h3>
      <div>
        <FormControl tabIndex={0} onKeyUp={handleLoginViaEnter}>
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
          {errorUsername}
          <TextField
            label={"Username"}
            variant={"outlined"}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handleUsername(e.target.value)}
          />
          {errorEmail}
          <TextField
            label={"Email"}
            variant={"outlined"}
            type={"email"}
            value={email}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handleEmail(e.target.value)}
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
            disabled={!isFormValid()}
            onClick={handleRegistration}
            type={"submit"}
          >
            Create Account
          </Button>
        </FormControl>
        <div>
          Already have an account? <Link href="/account/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
