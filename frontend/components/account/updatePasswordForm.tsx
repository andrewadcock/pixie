import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { passwordRules, validatePassword } from "@/helpers/validation";
import UserContext from "@/context/authenticationContext";

function UpdatePasswordForm() {
  const userCtx = useContext(UserContext);

  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const isPasswordValid = validatePassword(password);
    if (password !== password2) {
      setErrorPassword("Passwords do not match");
    } else {
      setErrorPassword(isPasswordValid.message);
    }
    setIsFormValid(password === password2 && !isPasswordValid.error);
  }, [password, password2]);

  const handlePasswordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePasswordUpdate(e);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    await userCtx.updateUserPassword({ password });
    setLoading(false);
  };
  return (
    <div>
      <h3>Update Password</h3>
      {errorPassword ? <h5>{errorPassword}</h5> : null}
      {loading ? (
        <h1>Loading</h1>
      ) : (
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
              ) => setPassword(e.target.value)}
            />
            <TextField
              label={"Re-type Password"}
              variant={"outlined"}
              type={showPassword ? "text" : "password"}
              value={password2}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setPassword2(e.target.value)}
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
              disabled={!isFormValid}
              onClick={handlePasswordUpdate}
              type={"submit"}
            >
              Update Password
            </Button>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default UpdatePasswordForm;
