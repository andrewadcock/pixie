import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

interface Props {
  children: JSX.Element;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
