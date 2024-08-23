import "./Layout.scss";
import Navbar from "../Navbar/Navbar";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout">{children}</div>
    </div>
  );
};

export default Layout;
