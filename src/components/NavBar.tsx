const NavBar = () => {
  return (
    <nav
      className="nav justify-content-between align-items-md-center px-4 border-bottom position-fixed bg-light-subtle"
      style={{
        width: "100%",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "60px",
        padding: "10px",
      }}
    >
      <h1
        className="h4"
        style={{
          margin: 0,
        }}
      >
        <a
          target="_blank"
          href="https://www.lumir-inc.com/web/main/main.asp"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img
            src="/assets/images/컬러세로형.png"
            style={{
              marginRight: "5px",
              width: "40px",
            }}
          />
          <span>Lumir WEB-GIS</span>
        </a>
      </h1>
      <div
        style={{
          display: "flex",
        }}
      >
        <form className="d-flex">
          <input
            type="search"
            placeholder="Search"
            className="me-2 form-control"
            aria-label="Search"
          />
          <button type="button" className="btn btn-outline-success">
            Search
          </button>
        </form>
        <button
          type="button"
          className="btn btn-primary"
          style={{
            marginLeft: "10px",
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
