import React, { useContext, useRef, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import Link from "next/link";
import UserContext from "@/context/authenticationContext";
import { useRouter } from "next/router";

function Email() {
  const userCtx = useContext(UserContext);
  const router = useRouter();
  const { token, email } = router.query;

  const emailRef = useRef<HTMLInputElement>();

  const [message, setMessage] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handlePasswordReset = async (e: React.FormEvent) => {
    const body = {
      email: emailRef.current?.value || "",
    };

    if (emailRef.current?.value) {
      try {
        const data = await userCtx.forgotPasswordSendResetEmail(body);

        if (data?.name === "AxiosError") {
          setError(
            data?.response?.data?.email
              ? data.response.data.email[0]
              : "Please enter a valid email address"
          );
        } else {
          setError("");
          setEmailSent(true);
        }
      } catch (error: any) {
        console.error("Error: ", error);
        setEmailSent(false);
        return error;
      }
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
      {message && <>{message}</>}
      {error && <>{error}</>}
      {emailSent ? (
        <>
          <h2>Check your email</h2>
          Use the sign-in link we sent to{" "}
          <strong>{emailRef.current?.value}</strong> to reset your password. Be
          sure to double check your email—it must be connected to an account to
          receive this message with a link to reset your password.
        </>
      ) : (
        <div>
          <p>
            Enter your email. If the account is found, we will send you a
            password reset link.
          </p>
          <FormControl tabIndex={0} onKeyUp={handleResetViaEnter}>
            <TextField
              label={"email"}
              variant={"outlined"}
              type={"text"}
              inputRef={emailRef}
            />
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
      )}
    </div>
  );
}

export default Email;
