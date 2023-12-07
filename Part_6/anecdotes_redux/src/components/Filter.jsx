import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()

	const handleFilterChange = event => {
		dispatch(setFilter(event.target.value))
	}
	const filterStyle = {
		marginBottom: 10,
	}
	return (
		<div style={filterStyle}>
			<label htmlFor="filter">filter: </label>
			<input name="filter" onChange={handleFilterChange} />
		</div>
	)
}

export default Filter
