import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import UserContext from "@/context/authenticationContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.first_name ? (
        `Welcome, ${user.first_name}`
      ) : (
        <a href={"/account/login/"}>Please log in</a>
      )}
    </>
  );
}
