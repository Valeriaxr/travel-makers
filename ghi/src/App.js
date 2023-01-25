// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import MainPage from './MainPage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AccountsSignup from './AccountsSignup'
import Login from './AccountsLogin'
import Nav from './Nav';
import FlightForm from './FlightsForm.js';
import HotelForm from './HotelsForm.js';
import ActivityForm from './ActivityForm.js';
import TripForm from './TripsForm.js';
import TripList from './TripsList.js';
import TripDetail from './TripDetail.js';





function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/signup' element={<AccountsSignup />} />
          <Route path='/login' element={<Login />} />
          <Route path='trips'>
            <Route path='' element={<TripList />} />
            <Route path='new' element={<TripForm />} />
            <Route path=':tripId'>
              <Route path='' element={<TripDetail />} />
              <Route path='flights'>
                <Route path='new' element={<FlightForm />} />
              </Route>
              <Route path='activities'>
                <Route path='new' element={<ActivityForm />} />
              </Route>
              <Route path='hotels'>
                <Route path='new' element={<HotelForm />} />
              </Route>
            </Route>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
