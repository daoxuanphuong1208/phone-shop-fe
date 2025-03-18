import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";

const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      <Navigation />
      {props.children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
