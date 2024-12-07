import { useState } from "react";
import axios from "axios";
import "../styles/user.css";
import { motion } from "framer-motion";

const User = () => {
  const [old, setold] = useState("");
  const [newp, setnewp] = useState("");
  const [conf, setconf] = useState("");
  const myToken = localStorage.getItem("token");

  const handlePassword = () => {
    if (window.confirm("Are you sure you want to change your password?")) {
      if (old && newp && conf && newp === conf) {
        axios.put(
          `https://notes.devlop.tech/api/update-password`,
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
        ).then(
          alert("Password Updated Successfully")
        );
      }
    }
  };

  return (
    <motion.div className="user"
    initial={{ opacity: 0,y: 100 }}
    animate={{ opacity: 1,y: 0 }}
    transition={{ duration: 0.5 }}
    >
      <div className="up">
        <h1>Change Password</h1>
      </div>
      <div className="down">
        <div>
          <label>Old Password :</label>
          <input
            type="text"
            className="change"
            onChange={(e) => setold(e.target.value)}
            placeholder="Old Password"
          />
        </div>
        <div>
          <label>New Password :</label>
          <input
            type="text"
            className="change"
            onChange={(e) => setnewp(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <div>
          <label>Confirm Password :</label>
          <input
            type="text"
            className="change"
            onChange={(e) => setconf(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="Change"
          onClick={handlePassword}
        >
          Change Password
        </motion.button>
      </div>
    </motion.div>
  );
};

export default User;
