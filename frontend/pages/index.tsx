import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import UserContext from "@/context/authentication";

export default function Home() {
  const { user } = useContext(UserContext);

  console.log("userCtx", user);

  return (
    <>
      {user.first_name ? (
        `Welcome, ${user.first_name}`
      ) : (
        <a href={"/account/login/"}>Please log in</a>
      )}
    </>
  );
}
