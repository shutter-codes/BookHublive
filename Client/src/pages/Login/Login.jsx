import {useState} from "react";
import "./index.css"
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import TextInput from "../../components/UI/TextInput";

const Login = ({setUser}) => {

    const [inputs,
        setInputs] = useState({})
    const [error,
        setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            let {data} = await axios.post("/api/login", inputs);
            localStorage.setItem("token", data.token)
            setUser(data)
            navigate("/home")
        } catch (error) {
            setError(error.response.data)
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    }

    const inputFields = [
        {
            label: "Email",
            name: "email",
            type: "email"
        }, {
            label: "Password",
            name: "password",
            type: "password"
        }
    ];

    return (
        <div className="login">
            <div className="container">
                <div className="form">
                    <div className="title">
                        <h1>Login</h1>
                        <div className="line"></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {inputFields.map(({label, name, type}) => (<TextInput
                            key={name}
                            label={label}
                            name={name}
                            type={type}
                            value={inputs[name]}
                            onChange={e => handleChange(e)}
                            error={name === "password"
                            ? error
                            : null}/>))}
                        <div className="to-register">
                            Don't have an account?
                            <Link to="/register">Register</Link>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login