import { useState} from "react"
import axios from 'axios'
import '../styles/form.css'

// import { Link, Route, BrowserRouter, Routes } from "react-router-dom";
// import Delete from "../Pages/Delete";

const Login = (props) => {
//     <BrowserRouter>
//     <Routes>
//       <Route path="/delete" element={<Delete />} />
//     </Routes>
//   </BrowserRouter>
    const [cin,setcin] = useState("")
    const [password,setpassword] = useState('')
    
    const handleBtn = (e) => {
        e.preventDefault()
        axios.post(`https://notes.devlop.tech/api/login`,{"cin" : cin,
            "password" : password
        })
        .then(res => {   
            console.log(res);
             
            localStorage.setItem('firstName',res.data.user.first_name)
            localStorage.setItem('lastName',res.data.user.last_name)
            localStorage.setItem('token',res.data.token)
            props.setisConnected(true)
        })
    }



    const handleCin = (e) => {
        setcin(e.target.value);
    }

    const handlePw = (e) => {
        setpassword(e.target.value)
    }


    return(
        <div className="formContainer">
            <form>
                <h1 className="bef">CRUD OPERATIONS</h1>
                <h2>SIGN IN</h2>
                <p>Enter your infos to access your account</p>
                <label>CIN</label>
                <input type="text" value={cin} placeholder="entrez votre cin" onChange={handleCin} />
                <br />
                <label>Passowrd</label>
                <input type="password" value={password} placeholder="entrez votre password" onChange={handlePw} />
                <br />
                <button className="login" onClick={handleBtn}>Submit</button>
            </form>
        </div>
    )
}

export default Login