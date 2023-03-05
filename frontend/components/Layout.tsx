import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useContext, useEffect } from "react";
import UserContext from "@/context/authenticationContext";

interface Props {
  children: JSX.Element;
}

function Layout(props: Props) {
  const { children } = props;
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.isUserLoggedIn();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
