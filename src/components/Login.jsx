import { useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import "../styles/form.css";

const Login = ({setisConnected}) => {
  const [cin, setcin] = useState("");
  const [password, setpassword] = useState("");

  const handleBtn = (e) => {
    e.preventDefault();
    axios
      .post(`https://notes.devlop.tech/api/login`, {
        cin: cin,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("firstName", res.data.user.first_name);
        localStorage.setItem("token", res.data.token);
        setisConnected(true);
      });
  };


  const handleCin = (e) => {
    setcin(e.target.value);
  };

  const handlePw = (e) => {
    setpassword(e.target.value);
  };

  return (
    <div className="formContainer">
      <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      >
        <h1 className="bef">CRUD OPERATIONS</h1>
        <h2>SIGN IN</h2>
        <p>Enter your infos to access your account</p>
        <label>CIN</label>
        <input
          type="text"
          className="inppp"
          value={cin}
          placeholder="entrez votre cin"
          onChange={handleCin}
        />
        <br />
        <label>Passowrd</label>
        <input
          type="password"
          className="inppp"
          value={password}
          placeholder="entrez votre password"
          onChange={handlePw}
        />
        <br />
        <motion.button
        whileHover={{ scale: 1.1 }}
        className="login" onClick={handleBtn}>
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
