import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  children: JSX.Element;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
