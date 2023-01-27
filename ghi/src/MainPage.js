import island from './store/island.mp4'
import React from 'react'
import travelmakers from './images/travelmakers.png'

function MainPage() {
    return (
        <div className='main' style={{textAlign:'center'}}>
            <img src={travelmakers}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'fixed',
                    zIndex: 1,
                    margin: '0 auto',
                    bottom: '450px',
                    right: "5px",
                    left: "5px",
                }}
            />
            <video src={island} autoPlay loop muted />
        </div>






    )
}

export default MainPage;
