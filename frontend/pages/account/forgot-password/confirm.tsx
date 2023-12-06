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
import { useRouter } from "next/router";
import classesGeneral from "../../../styles/general.module.scss";
/**
 * User enters password for email flow password reset.
 *
 * Token must be preset in query params
 * @constructor
 */
function Confirm() {
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const { token = "", email = "" } = router.query;

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    if (!password || !token || !email) {
      let errorType = "Invalid Password";
      if (!token) {
        errorType = "Invalid Token";
        setError(true);
      }
      if (!email) {
        errorType = "Invalid Email";
        setError(true);
      }

      setMessage(`There has been an error: [${errorType}]. Please try again.`);
      return;
    }

    // These shouldn't be arrays but just in case, only grab the first one
    const body = {
      password: Array.isArray(password) ? password[0] : password,
      token: Array.isArray(token) ? token[0] : token,
      email: Array.isArray(email) ? email[0] : email,
    };

    const data = await userCtx.updateUserPasswordEmail(body);
    if (data) {
      if (data?.name === "AxiosError") {
        setMessage(
          data?.data?.response?.data?.email
            ? data.data.response.data.email[0]
            : "Please enter a valid email address"
        );
        setError(true);
      } else {
        setMessage("");
        setError(false);
      }
      setMessage("Password Updated:" + data);
      setPasswordUpdated(true);
      setError(false);
    }
  };

  const handleResetViaEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePasswordReset(e);
    }
  };
  return (
    <div>
      <h3>Reset Password</h3>
      <p>Enter your new password</p>
      {passwordUpdated ? (
        <>
          <h2>Password Reset </h2>
          <Link href={"/account/login/"}>Log In</Link> |{" "}
        </>
      ) : (
        <>
          {message ? (
            <div
              className={`${classesGeneral.message} ${
                error ? classesGeneral.error : ""
              }`}
            >
              {message}
            </div>
          ) : null}
          <div>
            <FormControl tabIndex={0} onKeyUp={handleResetViaEnter}>
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
              <Button
                variant={"contained"}
                onClick={handlePasswordReset}
                type={"submit"}
              >
                Reset Password
              </Button>
            </FormControl>
            <div>
              Don&apos;t have an account?{" "}
              <Link href="/account/register">Sign Up</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Confirm;
