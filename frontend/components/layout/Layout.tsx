import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";
import styles from "@/styles/Home.module.scss";
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
  }, [userCtx]);

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
