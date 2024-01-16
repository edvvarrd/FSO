import { Routes, Route, Link, Navigate } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const menuStyle = {
	display: 'flex',
	gap: '1em',
	marginBottom: '1em',
}

const App = () => {
	return (
		<>
			<div style={menuStyle}>
				<Link to="/authors">Authors</Link>
				<Link to="/books">Books</Link>
				<Link to="/newbook">NewBook</Link>
			</div>

			<Routes>
				<Route path="/" element={<Navigate replace to="/authors" />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/books" element={<Books />} />
				<Route path="/newbook" element={<NewBook />} />
			</Routes>
		</>
	)
}
export default App
