import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import "./index.scss"

function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="container">{children} </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
