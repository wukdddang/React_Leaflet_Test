import { Nav, NavItem, NavLink } from "react-bootstrap";
import { BiColorFill } from "react-icons/bi";

const NavBar = () => {
  return (
    <header
      className="d-flex justify-content-between align-items-md-center px-4 border-bottom position-fixed bg-light-subtle"
      style={{
        width: "100%",
        zIndex: 1,
      }}
    >
      <h1 className="h4">
        <a
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <span>SARDIP</span>
        </a>
      </h1>

      <div className="d-flex align-items-center py-2">
        // TODO: 셀렉터 만들기
      </div>
    </header>
  );
};

export default NavBar;
