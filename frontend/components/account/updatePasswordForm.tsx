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

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const isPasswordValid = validatePassword(newPassword);
    setErrorPassword(isPasswordValid.message);
    setIsFormValid(!isPasswordValid.error);
  }, [newPassword]);

  const handlePasswordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePasswordUpdate(e);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    await userCtx.updateUserPassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
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
            <div>
              <h3>Please enter your current password:</h3>
              <TextField
                label={"Current Password"}
                variant={"outlined"}
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              {passwordRules()}
              {errorPassword}
              <TextField
                label={"Password"}
                variant={"outlined"}
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setNewPassword(e.target.value)}
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
            </div>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default UpdatePasswordForm;
