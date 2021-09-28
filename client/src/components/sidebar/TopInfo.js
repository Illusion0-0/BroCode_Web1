import LogOut from "./LogOut";
import { UserContext } from "../../providers/UserProvider";
import React, { useContext } from "react";
import CreateBtn from "./CreateBtn";
import { MdSearch } from "react-icons/md";

function TopInfo({ handleSearchNote }) {
  const data = useContext(UserContext);
  const user = data.user;
  return (
    <div className="dashheader">
      <div className="uname">
        {user && (
          <div className="profile">
            {user ? (
              <img src={user.avatar} className="avatar" alt="Avatar" />
            ) : (
              ""
            )}
            <h2>{user ? user.username : "Guest"}</h2>
            <LogOut />
            <div>
              <CreateBtn />
            </div>
          </div>
        )}
      </div>
      <div className="search">
        <MdSearch className="search-icons" size="1.2em" margin="0" />
        <input
          onChange={(event) => handleSearchNote(event.target.value)}
          type="text"
          placeholder="Search note..."
        />
      </div>
    </div>
  );
}

export default TopInfo;
