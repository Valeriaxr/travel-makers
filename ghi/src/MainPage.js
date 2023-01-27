import videos from './vids/tm.mp4'
import React from 'react'
import travelmakers from './logo/logo.png'

function MainPage() {
    return (
        <div className='main' style={{textAlign:'center'}}>
            <img src={travelmakers}
                style={{
                    display: "flex",
                    boxShadow: '1px 2px 5px #FAF9F6',
                    alignItems: "center",
                    justifyContent: "center",
                    position: 'fixed',
                    zIndex: 1,
                    margin: '0 auto',
                    bottom: '450px',
                    right: "5px",
                    left: "5px",
                    width: "300px",
                }}
            />
            <video src={videos} autoPlay loop muted />
        </div>






    )
}

export default MainPage;
