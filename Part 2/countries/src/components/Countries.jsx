import Country from './Country'

const SimpleResult = ({ commonName, showCountry }) => {
	return (
		<li>
			{commonName}
			<button onClick={showCountry}>show</button>
		</li>
	)
}

const Countries = ({ countries, searchValue, showCountry }) => {
	if (searchValue === '') {
		return
	} else {
		const searchRegex = new RegExp(searchValue, 'i')
		const searchResults = countries.filter(
			country =>
				country.name.common.match(searchRegex) ||
				country.name.official.match(searchRegex)
		)
		if (searchResults.length > 10) {
			return <p>Too many matches, specify another filter</p>
		} else if (searchResults.length > 1) {
			return (
				<ul>
					{searchResults.map(country => (
						<SimpleResult
							key={country.name.common}
							commonName={country.name.common}
							showCountry={() => showCountry(country.name.common)}
						/>
					))}
				</ul>
			)
		} else {
			return <Country country={searchResults[0]} />
		}
	}
}
export default Countries
