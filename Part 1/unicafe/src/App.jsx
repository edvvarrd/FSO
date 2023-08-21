import { useState } from 'react'

const Header = ({ title }) => {
	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

const Button = ({ text, handleClick }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	)
}

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad, array }) => {
	if (array != '') {
		return (
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={array.length} />
					<StatisticLine text="average" value={array.reduce((a, b) => a + b / array.length, 0).toFixed(2)} />
					<StatisticLine text="positive" value={Math.floor((good / array.length) * 100) + ' %'} />
				</tbody>
			</table>
		)
	} else {
		return (
			<>
				<p>No feedback given</p>
			</>
		)
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [feedbacks, setFeedback] = useState([])

	const sendGood = () => {
		console.log(`good - value before: ${good}`)
		setGood(good + 1)
		console.log(`good - value now: ${good + 1}`)
		setFeedback(feedbacks.concat(1))
		console.log(feedbacks)
	}
	const sendNeutral = () => {
		console.log(`neutral - value before: ${neutral}`)
		setNeutral(neutral + 1)
		console.log(`neutral - value now: ${good + 1}`)
		setFeedback(feedbacks.concat(0))
		console.log(feedbacks)
	}
	const sendBad = () => {
		console.log(`bad - value before: ${bad}`)
		setBad(bad + 1)
		console.log(`bad - value now: ${bad + 1}`)
		setFeedback(feedbacks.concat(-1))
		console.log(feedbacks)
	}
	return (
		<div>
			<Header title="give feedback" />
			<Button text="good" handleClick={sendGood} />
			<Button text="neutral" handleClick={sendNeutral} />
			<Button text="bad" handleClick={sendBad} />
			<Header title="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} array={feedbacks} />
		</div>
	)
}

export default App
