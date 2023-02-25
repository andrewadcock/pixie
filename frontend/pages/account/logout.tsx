import React, { useContext, useEffect, useState } from "react";
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

function Logout() {
  const userCtx = useContext(UserContext);

  const logout = async () => {
    await userCtx.logout();
  };
  useEffect(() => {
    logout().then();
  }, []);

  return (
    <div>
      <h3>You have been successfully logged out!</h3>
    </div>
  );
}

export default Logout;
