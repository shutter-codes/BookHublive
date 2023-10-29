import {useState} from 'react';
import './index.css'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import TextInput from '../../components/UI/TextInput';

const inputFields = [
    {
        label: "Name",
        name: "name",
        type: "text",
    }, {
        label: "Username",
        name: "username",
        type: "text",
    }, {
        label: "Email",
        name: "email",
        type: "email",
    }, {
        label: "Password",
        name: "password",
        type: "password",
        minLength: 6
    }
];

const Register = () => {

    const [inputs,
        setInputs] = useState({})
    const [errors,
        setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        function timeOut(error, setErrors, errorName) {
            setErrors(prev => ({...prev, [errorName]: error.response.data}));
            setTimeout(() => {
                setErrors({});
            }, 3000);
        }

        try {
            await axios.post("/api/register", inputs);
            navigate("/")
        } catch (error) {
            if (error.response.data === "Invalid username") {
                timeOut(error, setErrors, "username")
            } else {
                timeOut(error, setErrors, "email")
            }
        }
    }

    return (
        <div className="register">
            <div className="container">
                <div className="form">
                    <div className="title">
                        <h1>Register</h1>
                        <div className="line"></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {inputFields.map(({
                            label,
                            name,
                            type,
                            minLength
                        }, index) => (<TextInput
                            key={index}
                            label={label}
                            name={name}
                            type={type}
                            value={inputs[name] || ""}
                            onChange={e => handleChange(e)}
                            minLength={minLength}
                            error={errors[name]}/>))}
                        <div className="to-login">
                            Already have an account?
                            <Link to="/">Login</Link>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register