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
  const [message, setMessage] = useState<string>("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    if (!password || !token || !email) {
      let errorType = "Invalid Password";
      if (!token) {
        errorType = "Invalid Token";
      }
      if (!email) {
        errorType = "Invalid Email";
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

    const response = await userCtx.forgotPasswordSendResetEmail(body);
    if (response) {
      setMessage("Password Updated:" + response);
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
      {!token ? (
        <>
          We&apos;re sorry. There seems to be a problem. Please try to reset
          your password again. <a href={"/forgot-password"}>Forgot Password</a>
        </>
      ) : (
        <>
          {message ? <>message</> : null}
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
