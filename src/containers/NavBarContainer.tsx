import NavBar from "@/components/templates/NavBar";
import { useNavigate } from "react-router-dom";

const NavBarContainer = () => {
  const navigate = useNavigate();

  return <NavBar navigate={navigate} />;
};

export default NavBarContainer;
