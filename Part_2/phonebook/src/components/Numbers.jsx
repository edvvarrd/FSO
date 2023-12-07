const Number = ({ person, handleRemove }) => {
	return (
		<>
			<li>
				{person.name} - {person.number}
				<button onClick={() => handleRemove(person)}>
					Remove
				</button>
			</li>
		</>
	)
}
const Numbers = ({ persons, filter, handleRemove }) => {
	const regex = new RegExp(filter, 'i')

	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{persons
					.filter(person => person.name.match(regex))
					.map(person => (
						<Number
							key={person.id}
							person={person}
							handleRemove={handleRemove}
						/>
					))}
			</ul>
		</>
	)
}

export default Numbers
