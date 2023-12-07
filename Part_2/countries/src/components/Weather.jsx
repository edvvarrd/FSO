const Weather = ({ weather }) => {
	console.log(`Weather data:`, weather)
	if (weather !== null) {
		if (weather.success === false) {
			return <p>Something is wrong with weather API...</p>
		} else {
			return (
				<>
					<h2>Weather in {weather.location.name}</h2>
					<p>Temperature: {weather.current.temperature} °C</p>
					<img
						src={weather.current.weather_icons[0]}
						alt={`${weather.location.name}'s weather icon`}
					/>
					<p>Wind: {weather.current.wind_speed} km/h</p>
				</>
			)
		}
	} else {
		return <p>Waiting for weather API...</p>
	}
}

export default Weather
