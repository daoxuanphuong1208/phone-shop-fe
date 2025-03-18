import Header from "../../components/Header/Header";

const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HeaderOnly;
