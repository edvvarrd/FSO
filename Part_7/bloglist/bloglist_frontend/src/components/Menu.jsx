import { NavLink as BaseNavLink } from 'react-router-dom'
import { useLoggedUser, useLogout } from '../context/loginContext'
import { useNotify } from '../context/notificationContext'

import styled from 'styled-components'

import { Container } from './style/Container'
import { PrimaryButton } from './style/Buttons'

const MenuContainer = styled(Container)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const NavBar = styled.div`
	position: sticky;
	top: 0;
	padding: 0.5em 1em;
	background-color: #caf0f8;
	border: 1px solid #0077b6;
	border-radius: 0 0 5px 5px;
`
const NavBarSide = styled.div`
	display: flex;
	align-items: center;
	gap: 1em;
`
const NavLink = styled(BaseNavLink)`
	display: flex;
	align-items: center;
	padding: 0 0.7em;
	font-size: 1.7rem;
	font-weight: 300;
	text-transform: uppercase;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 5px;
	&:hover {
		border-color: #023e8a;
	}
	&.active {
		color: white;
		background-color: #023e8a;
	}
`

const LoginInfo = styled.span`
	display: none;
	@media (min-width: 500px) {
		display: inline-block;
	}
`

const Menu = () => {
	const newNotification = useNotify()
	const user = useLoggedUser()
	const logout = useLogout()

	const handleLogout = () => {
		logout()
		window.localStorage.clear()
		newNotification('logged out!')
	}

	return (
		<NavBar>
			<MenuContainer>
				<NavBarSide>
					<NavLink to="/blogs">Blogs</NavLink>
					<NavLink to="/users">Users</NavLink>
				</NavBarSide>
				<NavBarSide>
					<LoginInfo>{user.name} logged in</LoginInfo>
					<PrimaryButton
						onClick={() => {
							handleLogout()
						}}>
						Logout <i className="fa-solid fa-right-from-bracket"></i>
					</PrimaryButton>
				</NavBarSide>
			</MenuContainer>
		</NavBar>
	)
}

export default Menu
