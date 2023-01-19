// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import MainPage from './MainPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AccountsSignup from './AccountsSignup'
import AccountsLogin from './AccountsLogin'
import Nav from './Nav';
import FlightsForm from './FlightsForm.js';
import HotelForm from './HotelsForm.js';
import ActivityForm from './ActivityForm.js';
import TripForm from './TripsForm.js';
import TripList from './TripsList.js';





function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/signup' element={<AccountsSignup />} />
          <Route path='/login' element={<AccountsLogin />} />
          <Route path='/flights' element={<FlightsForm />} />
          <Route path='/hotels' element={<HotelForm />} />
          <Route path='/activities' element={<ActivityForm />} />
          <Route path='/trips'>
            <Route path='' element={<TripList />} />
            <Route path='/new' element={<TripForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    // <div>
    //   {/* <ErrorNotification error={error} /> */}
    //   {/* <Construct info={launch_info} /> */}
    // </div>
  );
}

export default App;
