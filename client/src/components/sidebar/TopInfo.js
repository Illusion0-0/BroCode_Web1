import LogOut from "./LogOut";
import { UserContext } from "../../providers/UserProvider";
import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import CreateBtn from "./CreateBtn";
function TopInfo() {
  const data = useContext(UserContext);
  const user = data.user;
  return (
    <div>
      <div>
        {user ? user.username : "Guest"}
        {user ? <img src={user.avatar} alt="Avatar" /> : ""}
        <LogOut />
        <CreateBtn />
      </div>
    </div>
  );
}

export default TopInfo;
