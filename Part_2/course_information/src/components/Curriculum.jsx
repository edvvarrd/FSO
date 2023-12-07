const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ course }) => {
	const onlyExercises = course.parts.map(part => part.exercises)
	return (
		<p>
			<strong>Total exercises: {onlyExercises.reduce((a, b) => a + b)}</strong>
		</p>
	)
}

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Content = ({ course }) => {
	return (
		<>
			{course.parts.map(part => (
				<Part key={part.id} part={part} />
			))}
			<Total course={course} />
		</>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
		</div>
	)
}

const Curriculum = ({ courses }) => {
	return (
		<div>
			<h1>Web development curriculum</h1>
			{courses.map(course => (
				<Course key={course.id} course={course} />
			))}
		</div>
	)
}

export default Curriculum
