import { useState} from "react"
import axios from 'axios'
import '../styles/form.css'


const Login = (props) => {
    const [cin,setcin] = useState("JH90640")
    const [password,setpassword] = useState('12340987')
    
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
                <input type="text" className="inppp" value={cin} placeholder="entrez votre cin" onChange={handleCin} />
                <br />
                <label>Passowrd</label>
                <input type="password" className="inppp" value={password} placeholder="entrez votre password" onChange={handlePw} />
                <br />
                <button className="login" onClick={handleBtn}>Submit</button>
            </form>
        </div>
    )
}

export default Login