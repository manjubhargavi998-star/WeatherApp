import React from "react";
import CurrentLocation from "./CurrentLocation";

import "./App.css";


function App() {
  return (
    <React.Fragment>
      {/* Background video */}
      <div className="background-video-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/VideoBg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main content */}
      <div className="container">
        <CurrentLocation />
      </div>

    </React.Fragment>
  );
}

export default App;
