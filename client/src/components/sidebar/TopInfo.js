import LogOut from "./LogOut";
import { UserContext } from "../../providers/UserProvider";
import { useContext } from "react";
import SearchBar from "./SearchBar";
function TopInfo() {
  const user = useContext(UserContext);
  return (
    <div>
      <div>
        {user ? user.displayName : "Guest"}
        {user ? <img src={user.photoURL} alt="Avatar" /> : ""}
        <LogOut />
      </div>
    </div>
  );
}

export default TopInfo;
