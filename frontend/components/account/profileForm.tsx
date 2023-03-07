import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { validateEmail, validateUsername } from "@/helpers/validation";
import UserContext from "@/context/authenticationContext";

function ProfileForm() {
  const userCtx = useContext(UserContext);

  const [firstName, setFirstName] = useState<string>(
    userCtx?.user?.first_name || ""
  );
  const [lastName, setLastName] = useState<string>(
    userCtx?.user?.last_name || ""
  );
  const [username, setUsername] = useState<string>(
    userCtx?.user?.username || ""
  );
  const [email, setEmail] = useState<string>(userCtx?.user?.email || "");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setFirstName(userCtx?.user?.first_name);
    setLastName(userCtx?.user?.last_name);
    setUsername(userCtx?.user?.username);
    setEmail(userCtx?.user?.email);
  }, [userCtx]);

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
      errorEmail !== "" ||
      errorUsername !== ""
    ) {
      return false;
    }

    return true;
  };

  const handleLoginViaEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleProfileUpdate(e);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      last_name: lastName,
      first_name: firstName,
    };

    const response = await userCtx.updateUserProfile(userData);
    setLoading(false);

    if (response) {
      setMessage("Profile Updated");
    }
  };
  return (
    <div>
      <h3>Profile</h3>
      {message ? <h5>{message}</h5> : null}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <FormControl tabIndex={0} onKeyUp={handleLoginViaEnter}>
            <TextField
              label={"First Name"}
              variant={"outlined"}
              value={firstName}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setFirstName(e.target.value)}
            />
            <TextField
              label={"Last Name"}
              variant={"outlined"}
              value={lastName}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setLastName(e.target.value)}
            />
            {errorUsername}
            <TextField
              label={"Username"}
              variant={"outlined"}
              value={username}
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

            <Button
              variant={"contained"}
              disabled={!isFormValid()}
              onClick={handleProfileUpdate}
              type={"submit"}
            >
              Update Profile
            </Button>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
