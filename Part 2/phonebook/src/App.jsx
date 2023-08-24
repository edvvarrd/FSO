import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'
import Notification from './components/Notification'
import numbersService from './services/numbers'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationClass, setNotificationClass] = useState('notification')

	useEffect(() => {
		numbersService
			.getAll()
			.then(response => {
				setPersons(response)
			})
			.then(() => {
				console.log(`Numbers imported`)
			})
			.catch(error => {
				console.error(error.response)
			})
	}, [])

	const addPerson = e => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber,
		}
		if (persons.find(person => person.name === newName)) {
			const alreadyExistingPerson = persons.find(
				person => person.name === newName
			)
			if (
				window.confirm(
					`Do you want to update ${alreadyExistingPerson.name}'s number to ${newNumber}?`
				)
			) {
				numbersService
					.update(alreadyExistingPerson.id, newPerson)
					.then(returnedPerson =>
						setPersons(
							persons.map(number =>
								number.id !== alreadyExistingPerson.id ? number : returnedPerson
							)
						)
					)
					.then(() => {
						setNewNotification(`Updated ${alreadyExistingPerson.name}'s number`)
						console.log(`Updated`)
					})
					.catch(error => {
						console.error(error.response)
					})
			}
		} else {
			numbersService
				.create(newPerson)
				.then(createdPerson => {
					setPersons(persons.concat(createdPerson))
				})
				.then(() => {
					setNewNotification(`Added ${newPerson.name}`)
					console.log(`Added`)
				})
				.catch(error => {
					console.error(error.response)
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = e => {
		setNewName(e.target.value)
	}

	const handleNumberChange = e => {
		setNewNumber(e.target.value)
	}

	const handleFilter = e => {
		setFilter(e.target.value)
	}

	const handleRemove = person => {
		if (window.confirm(`Do you really want to delete ${person.name}?`)) {
			numbersService
				.remove(person.id)
				.then(() => {
					setNewNotification(`Deleted ${person.name}`)
					console.log(`Deleted`)
				})
				.catch(error => {
					if (error.response.status === 404) {
						setNewNotification(
							`${person.name} has already been deleted from the server.`,
							true
						)
					}
					console.error(error.response)
				})
			setPersons(persons.filter(n => n.id !== person.id))
		}
	}

	const setNewNotification = (message, errorNotification) => {
		if (errorNotification === true) {
			setNotificationClass('error')
		} else {
			if (notificationClass === 'error') {
				setNotificationClass('notification')
			}
		}
		setNotificationMessage(message)
		setTimeout(() => {
			setNotificationMessage(null)
		}, 5000)
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter value={filter} onChange={handleFilter} />
			<Form
				onSubmit={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<Numbers persons={persons} filter={filter} handleRemove={handleRemove} />
			<Notification
				message={notificationMessage}
				notificationClass={notificationClass}
			/>
		</div>
	)
}

export default App
