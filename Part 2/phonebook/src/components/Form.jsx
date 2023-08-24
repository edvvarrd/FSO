const Form = props => {
	return (
		<>
			<h2>Add a new</h2>
			<form onSubmit={props.onSubmit}>
				<div>
					name: <input value={props.newName} onChange={props.handleNameChange} />
				</div>
				<div>
					number: <input value={props.newNumber} onChange={props.handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	)
}

export default Form
