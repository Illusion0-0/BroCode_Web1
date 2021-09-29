import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { FiLogOut } from "react-icons/fi";

export default function LogOut() {
  const UserCtx = useContext(UserContext);

  // const [redirect, setredirect] = useState(null);
  // useEffect(() => {
  //   if (!user) {
  //     console.log("Redirecting to Login Page...");
  //     setredirect("/");
  //   }
  // }, [user]);
  // if (redirect) {
  //   return <Redirect to={redirect} />;
  // }
  const logOut = () => UserCtx.logout();
  return (
    <button onClick={logOut}>
      <span>
        {" "}
        <FiLogOut className="user-logout" color="white" size="1.3em" />{" "}
      </span>
    </button>
  );
}
