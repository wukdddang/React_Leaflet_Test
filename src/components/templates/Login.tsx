import Button from "@/components/molecules/Button";
import { UserTracker } from "@/domain/model/UserTracker";

type Props = {
  track: UserTracker["track"];
};

const Login = ({ track }: Props) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          width: "350px",
        }}
        className="h-100 d-flex flex-column justify-content-center"
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            track("loginPage:login-button:click");
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
