import WeatherGif from "./WeatherGifs"


{/* Background video (separate, not nested inside .mb-icon) */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="background-video"
>
  <source src="./video/weather bg video.mp4" type="video/mp4" />
</video>
function WeatherGifs({ main }) {
  // Your icon logic here
  return <img src={`./images/${main}.png`} alt={main} />;
}

export default WeatherGifs;

