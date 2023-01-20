import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BulmaInput from './BulmaInput';
import { useLogInMutation } from './store/accountsApi';
import ErrorNotification from "./ErrorNotification";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [logIn, result] = useLogInMutation();


    async function handleSubmit(e) {
       e.preventDefault();
       logIn({email, password});
   }

    if (result.isSuccess) {
        navigate("/trips");
    } else if (result.isError) {
        setError(result.error);
    }

    return (
       <div className="container">
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
                           placeholder="password"
                           value={password}
                           onChange={setPassword} />
                       <div className="field">
                           <button className="button is-primary">Save</button>
                       </div>
                   </form>
               </div>
           </div>
       </div>
    );
}

export default Login
