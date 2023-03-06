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
import ProfileForm from "@/components/account/profileForm";
import UpdatePasswordForm from "@/components/account/updatePasswordForm";

function Profile() {
  const userCtx = useContext(UserContext);
  console.log("userCtx", userCtx);

  return (
    <div>
      <h2>My Account</h2>
      <ProfileForm />
      <hr />
      <UpdatePasswordForm />
    </div>
  );
}

export default Profile;
