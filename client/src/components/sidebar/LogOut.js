import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
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
    <button className="blue" onClick={logOut}>
      <span> Logout</span>
    </button>
  );
}
