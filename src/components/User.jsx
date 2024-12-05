import { useState } from "react";
import axios from "axios";

const User = () => {
  const [old, setold] = useState("");
  const [newp, setnewp] = useState("");
  const [conf, setconf] = useState("");
  const myToken = localStorage.getItem("token");

  const handlePassword = () => {
    if (window.confirm("Are you sure you want to change your password?")) {
      if (old && newp && conf) {
        axios.put(
          `https://notes.devlop.tech/api/users/password`,
          {
            current_password: old,
            new_password: newp,
            new_password_confirmation: conf,
          },
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
      }
    }
  };

  return (
    <div className="User">
      <div className="up">
        <h1>Change Password</h1>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setold(e.target.value)}
          placeholder="Old Password"
        />
        <input
          type="text"
          onChange={(e) => setnewp(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="text"
          onChange={(e) => setconf(e.target.value)}
          placeholder="Confirm Password"
        />
        <button onClick={handlePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default User;
