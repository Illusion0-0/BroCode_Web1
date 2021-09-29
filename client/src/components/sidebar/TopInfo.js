import LogOut from "./LogOut";
import { UserContext } from "../../providers/UserProvider";
import React, { useContext } from "react";
import CreateBtn from "./CreateBtn";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

function TopInfo({ handleSearchNote }) {
  const data = useContext(UserContext);
  const user = data.user;
  return (
    <div className="dashheader">
      <div className="uname">
        {user && (
          <div className="profile">
            {user ? (
              <Link to="/">
                <img
                  src={user.avatar}
                  className="avatar"
                  alt="Avatar"
                  title="Go to Home"
                />
              </Link>
            ) : (
              ""
            )}
            <h3>Your Notes</h3>
            <div>
              <CreateBtn />
            </div>
            <LogOut />
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
