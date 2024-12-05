import photo from "../images/Profilee.jpg";
import "../styles/Page.css";
import { motion } from "framer-motion";
import Right from "./Right";
import { useState } from "react";
import User from "./User";

const Page = (props) => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const [res, setres] = useState();

  const handleRes = (id) => {
    switch (id) {
      case 1:
        setres(<User />);
        break;
      case 2:
        setres(<Right />);
        break;
      default:
        break;
    }
  };

  const LogOut = () => {
    props.setisConnected(false);
  };

  return (
    <>
      <div className="container">
        <div className="leftSide">
          <div className="profile">
            <img className="myImg" src={photo} alt="user" />
            <p>Hello {firstName + "  " + lastName}</p>
            <p className="Student">Student</p>
          </div>
          <div className="Note">
            <motion.button
              whileHover={{
                scale: 1.3,
              }}
              className="Notess"
              onClick={() => handleRes(1)}
            >
              User
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.3,
              }}
              className="Notess"
              onClick={() => handleRes(2)}
            >
              Notes
            </motion.button>
          </div>
          <motion.button
            whileHover={{
              scale: 1.3,
            }}
            className="LogOut"
            onClick={LogOut}
          >
            Log Out
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
          </motion.button>
        </div>
        {res}
      </div>
    </>
  );
};

export default Page;
