import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useLogInMutation } from './store/accountsApi';
import ErrorNotification from "./ErrorNotification";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState('false');
    const [error, setError] = useState('');
    const [logIn, result] = useLogInMutation();


    async function handleSubmit(e) {
       e.preventDefault();
       logIn({email, password});
   }

    useEffect(() => {
      if (result.isSuccess) {
          navigate("/trips");
      } else if (result.isError) {
          setError(result.error);
      }
    }, [result, navigate]);

    return (
        <div>
            <div className="container" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            backgroundColor: "#d3c6a3",
            border: "1.75px solid black",
            width: "250px",
            height: "225px",
            }}>
                <div className="columns is-centered">
                    <div className="column is-one-third">
                        <ErrorNotification error={error} />
                        <form onSubmit={handleSubmit}>
                            <BulmaInput
                                label="Email"
                                id="email"
                                type="email"
                                placeholder="example@example.com"
                                value={email}
                                onChange={setEmail} />
                            <BulmaInput
                                label="Password"
                                id="password"
                                type={passwordVisible ? "password" : "text"}
                                placeholder="password"
                                value={password}
                                onChange={setPassword} />
                                <label className="checkbox">
                                    <input type="checkbox" onChange={() =>
                                 setPasswordVisible(!passwordVisible)} />
                                    Show Password
                                </label>
                            <div className="field">
                                <button className="btn btn-dark">Login!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </div>
    );
}

export default Login
