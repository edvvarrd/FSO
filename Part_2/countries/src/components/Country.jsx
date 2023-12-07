import { useState, useEffect } from 'react'
import weatherServices from '../services/weatherServices'
import Weather from './Weather'

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null)
	console.log(`Country data:`, country)
	if (country === undefined) {
		return <p>No result</p>
	} else {
		useEffect(() => {
			weatherServices
				.getWeather(country.capital)
				.then(response => {
					setWeather(response)
				})
				.catch(error => console.log(`Country error:`, error.response))
		}, [])
		return (
			<div>
				<h1>{country.name.common}</h1>
				<p>Capital: {country.capital}</p>
				<p>Area: {country.area}</p>
				<h2>Languages:</h2>
				<ul>
					{Object.values(country.languages).map(language => (
						<li key={language}>{language}</li>
					))}
				</ul>
				<img src={country.flags.png} alt={`${country.name.common}'s flag`} />
				<Weather weather={weather} />
			</div>
		)
	}
}

export default Country
