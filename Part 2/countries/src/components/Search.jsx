const Search = ({ value, onChange }) => {
	return (
		<>
			Find a country: <input value={value} onChange={onChange} />
		</>
	)
}

export default Search
