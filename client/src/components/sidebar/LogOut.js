import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { Redirect } from "react-router-dom";
import { logOut } from "../../services/firebase";
export default function LogOut() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  useEffect(() => {
    if (!user) {
      console.log("Redirecting to Login Page...");
      setredirect("/");
    }
  }, [user]);
  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <button className="logout-button" onClick={logOut}>
      <span> logout</span>
    </button>
  );
}
