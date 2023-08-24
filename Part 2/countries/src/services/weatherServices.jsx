import axios from 'axios'

const getWeather = country => {
	const APIkey = import.meta.env.VITE_API_URL
	const request = axios.get(
		`http://api.weatherstack.com/current?access_key=${APIkey}&query=${country}`
	)
	return request.then(request => request.data)
}

export default { getWeather }
