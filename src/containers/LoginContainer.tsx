import Login from "@/components/templates/Login";

const LoginContainer = () => {
  const submitClick = () => {
    console.log("submit");
  };

  return <Login track={submitClick} />;
};

export default LoginContainer;
