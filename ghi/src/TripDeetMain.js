import vid1 from "./vids/Fly.mp4"
// import vid2 from "./src/vids/Couple.mp4"
// import vid3 from "./src/vids/Hiking.mp4"



function TripMain() {
    return (
    <div className="background-videos">
        <video src={vid1} autoPlay loop muted />
        {/* <video src={vid2} autoPlay loop muted style={{ zIndex: 1 }} />
        <video src={vid3} autoPlay loop muted style={{ zIndex: 1 }} /> */}
    </div>
    )
}
