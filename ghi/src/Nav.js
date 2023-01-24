import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogOutMutation } from "./store/accountsApi";

function Nav() {
  const navigate = useNavigate();
  const[logOut] = useLogOutMutation();

  async function handleLogOut(e) {
    e.preventDefault();
    logOut();
    navigate('/')
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white font-weight-bold" to="/" style={{border: "1.5px solid gold"}}>Travel Makers</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active text-white font-weight-bold" aria-current="page" to="/"style={{border: "1.5px solid gold"}}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/signup"style={{border: "1.5px solid gold"}}>Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/trips/new"style={{border: "1.5px solid gold"}}>Create a trip</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/trips"style={{border: "1.5px solid gold"}}>Your Trips</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/login"style={{border: "1.5px solid gold"}}>Login</NavLink>
            </li>
          </ul>
          <div>
            <button className="btn btn-danger" onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
