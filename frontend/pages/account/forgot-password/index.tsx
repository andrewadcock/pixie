import React from "react";
import { useRouter } from "next/router";
import Email from "@/pages/account/forgot-password/email";
import classes from "../../../styles/ForgotPassword.module.scss";
import Confirm from "@/pages/account/forgot-password/confirm";
import Success from "@/pages/account/forgot-password/success";

function Index() {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div className={classes.forgotPasswordContainer}>
      {page === "email" || !page ? <Email /> : null}
      {page === "confirm" ? <Confirm /> : null}
      {page === "success" ? <Success /> : null}
    </div>
  );
}

export default Index;
