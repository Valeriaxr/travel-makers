import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useSignUpMutation } from './store/accountsApi';
import ErrorNotification from "./ErrorNotification";




function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [error, setError] = useState('');
    const [createAccount, result] = useSignUpMutation();

    async function handleSubmit(e) {
        e.preventDefault();
        createAccount({email, password, first_name: first, last_name: last});
    }

    if (result.isSuccess) {
        navigate("/login");
    } else if (result.isError) {
        setError(result.error);
    }

    return (
      <div className="container" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            backgroundColor: "#d3c6a3",
            border: "1.75px solid black",
            width: '300px',
            height: "360px",

        }}>
    <div className="columns is-centered">
        <div className="column is-one-third">
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
          <BulmaInput
              label="First name"
              id="first"
              placeholder="John"
              value={first}
              onChange={setFirst} />
            <BulmaInput
              label="Last name"
              id="last"
              placeholder="Doe"
              value={last}
              onChange={setLast} />
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
              placeholder="password"
              value={password}
              onChange={setPassword} />
            <div className="field">
              <button className="btn btn-dark">Save</button>
            </div>
          </form>
        </div>
    </div>
  </div>
    )
}

export default Signup;
