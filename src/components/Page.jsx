import photo from "../images/login.png";
import "../styles/Page.css";
import { motion } from "framer-motion";
import Right from "./Right";
import { useState } from "react";
import User from "./User";
import Home from "./Home";

const Page = (props) => {
  const myToken = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const [res, setres] = useState();
  const [istoggle, setistoggle] = useState(false);
  const [selected, setSelected] = useState(2);

  const handleMenu = () => {
    setistoggle((prev) => !prev);
  };

  if (!myToken) {
    props.setisConnected(false);
  }

  const handleRes = (id) => {
    switch (id) {
      case 1:
        setSelected(1);
        setres(<User />);
        break;
      case 2:
        setSelected(2);
        setres(<Right />);
        break;
      default:
        setSelected(3);
        setres(<Home />);
        break;
    }
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="leftSideContainer">
          <div
            className={istoggle ? "none" : "leftSide"}
          >
            <div className="profile">
              <img className="myImg" src={photo} alt="user" />
              <p className="Greeting">Hello {firstName + " "}👋</p>
              <p className="Student">Student</p>
            </div>
            <div className="Note">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  x: 10,
                }}
                className={selected === 3 ? "selected" : "Notess"}
                onClick={() => handleRes(3)}
              >
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                <p>Home</p>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  x: 10,
                }}
                className={selected === 1 ? "selected" : "Notess"}
                onClick={() => handleRes(1)}
              >
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                </svg>
                <p>Password</p>
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  x: 10,
                }}
                className={selected === 2 ? "selected" : "Notess"}
                onClick={() => handleRes(2)}
              >
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                </svg>
                <p>Notes</p>
              </motion.button>
            </div>
            <motion.button
              whileHover={{
                scale: 1.2,
                x: 10,
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
          <div className="toggler">
            <button
              onClick={handleMenu}
              className={istoggle ? "left" : "right"}
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#fff"
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
              </svg>{" "}
            </button>
          </div>
        </motion.div>

        {res ? res : <Right />}
      </div>
    </>
  );
};

export default Page;
