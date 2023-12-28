import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = name => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (name)
			axios
				.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
				.then(result => setCountry(result.data))
				.catch(() => setCountry('not found'))
		else setCountry(null)
	}, [name])
	return country
}
export const useField = type => {
	const [value, setValue] = useState('')

	const onChange = event => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}
