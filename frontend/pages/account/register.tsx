import React, { useState } from "react";
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
} from "@/helpers/validation";

function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

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

  const isFormValid = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      errorPassword !== "" ||
      errorEmail !== ""
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
    console.log("Registration");
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
            onSubmit={handleRegistration}
            type={"submit"}
          >
            Create Account
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default Register;
