import React, { useContext, useEffect, useState } from "react";
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
import UserContext from "@/context/authenticationContext";

function UpdatePasswordForm() {
  const userCtx = useContext(UserContext);

  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>("");

  const handlePassword = (password: string, id: number) => {
    if (password !== password2) {
      setErrorPassword("Passwords do not match");
    }
    setErrorPassword(validatePassword(password));
    setPassword(password);
    setPassword2(password2);
  };

  const isFormValid = () => {
    return password === password2 && errorPassword === "";
  };

  const handlePasswordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleProfileUpdate(e);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    userCtx.updateUserPassword({ password });
  };
  return (
    <div>
      <h3>Update Password</h3>
      <div>
        <FormControl tabIndex={0} onKeyUp={handlePasswordChange}>
          {passwordRules()}
          {errorPassword}
          <TextField
            label={"Password"}
            variant={"outlined"}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handlePassword(e.target.value, 1)}
          />
          <TextField
            label={"Re-type Password"}
            variant={"outlined"}
            type={showPassword ? "text" : "password"}
            value={password2}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => handlePassword(e.target.value, 2)}
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
            onClick={handleProfileUpdate}
            type={"submit"}
          >
            Update Password
          </Button>
        </FormControl>
      </div>
    </div>
  );
}

export default UpdatePasswordForm;
