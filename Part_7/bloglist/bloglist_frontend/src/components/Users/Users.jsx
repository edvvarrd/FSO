import { useQuery } from '@tanstack/react-query'

import { Link } from 'react-router-dom'

import userService from '../../services/users'

import styled from 'styled-components'

import { MotionPage } from '../motion/MotionPage'

const UsersTitle = styled.h2`
	margin-top: 0.5em;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 0.15cap;
`

const UsersTable = styled.table`
	width: 100%;
	margin: 0.5em 0;
	padding: 0.5em 0.5em;
	border-radius: 5px;
	border: 1px solid #0077b6;
	thead {
		background-color: #caf0f8;
		tr {
			th {
				text-transform: uppercase;
				font-weight: 300;
				padding: 0.5em 0.5em;
			}
		}
	}
	tbody {
		tr {
			td {
				padding: 0.5em 0.5em;
				&:nth-child(2) {
					width: 20%;
					text-align: center;
				}
			}
			&:nth-child(even) {
				background-color: #eafcff;
			}
		}
	}
`

const UserLink = styled(Link)`
	text-decoration: none;
	letter-spacing: 0.1cap;
	&:hover {
		text-decoration: underline;
	}
`

const Users = () => {
	const users = useQuery({
		queryKey: ['users'],
		queryFn: userService.getAll,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
	})
	if (users.isLoading) {
		return <p>Hold on...</p>
	}
	if (users.isError) {
		return <p>Error: {users.error.message}</p>
	}
	return (
		<MotionPage>
			<UsersTitle>Users</UsersTitle>
			<UsersTable>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.data.map(user => (
						<tr key={user.id}>
							<td>
								<UserLink to={user.id}>{user.name}</UserLink>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</UsersTable>
		</MotionPage>
	)
}

export default Users
