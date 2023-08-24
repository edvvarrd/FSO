import { useState, useEffect } from 'react'
import './index.css'
import Search from './components/Search'
import Countries from './components/Countries'
import searchServices from './services/searchServices'

function App() {
	const [searchValue, setSearchValue] = useState('')
	const [countries, setCountries] = useState([])

	useEffect(() => {
		searchServices
			.getAll()
			.then(response => {
				setCountries(response)
				console.log('Countries imported')
			})
			.catch(error => console.log(`Countries error:`, error.response))
	}, [])

	const handleSearchInput = e => {
		setSearchValue(e.target.value)
	}

	const showCountry = country => {
		setSearchValue(country)
	}

	return (
		<>
			<Search value={searchValue} onChange={handleSearchInput} />
			<Countries
				countries={countries}
				searchValue={searchValue}
				showCountry={showCountry}
			/>
		</>
	)
}

export default App
