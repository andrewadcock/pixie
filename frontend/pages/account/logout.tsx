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
import UserContext from "@/context/authentication";

function Logout() {
  const { logout } = useContext(UserContext);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <h3>You have been successfully logged out!</h3>
    </div>
  );
}

export default Logout;
