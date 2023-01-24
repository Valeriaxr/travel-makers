import island from './store/island.mp4'
import React from 'react'






function MainPage() {
    return (
        <div className='main'>
            <video src={island} autoPlay loop muted />
        </div>


    )
}

export default MainPage;
