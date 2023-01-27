import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useSignUpMutation } from './store/accountsApi';
import ErrorNotification from "./ErrorNotification";
import sail from './vids/sail.mp4';




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

    useEffect(() => {
      if (result.isSuccess) {
          navigate("/login");
      } else if (result.isError) {
          setError(result.error);
      }
    }, [result, navigate]);

    return (
    <><div className='sign' style={{ width: "30%", height: "60%" }}>
        <video src={sail} autoPlay loop muted />
      </div>

      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-40%, -40%)",
        boxShadow: '1px 2px 5px black',
        backgroundColor: "#f2f2f2",
        borderRadius: 4,
        border: "1.75px solid black",
        width: '230px',
        height: "375px",
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
                  <button className="btn btn-dark btn-sm">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
         </>

    )
}

export default Signup;
