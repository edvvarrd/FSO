import { useEffect } from "react";

import { useLogin, useLoggedUser } from "./context/loginContext";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import styled from "styled-components";

import { Container } from "./components/style/Container";

import { AnimatePresence } from "framer-motion";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Menu from "./components/Menu";

import Blogs from "./components/Blogs/Blogs";

import BlogDetails from "./components/Blogs/BlogDetails";

import Users from "./components/Users/Users";
import User from "./components/Users/User";

import blogService from "./services/blogs";

const AppTitle = styled.h1`
	margin: 0.5em 0;
	font-weight: 300;
	text-transform: uppercase;
	letter-spacing: 0.25rem;
`;

const App = () => {
	const login = useLogin();
	const user = useLoggedUser();
	const location = useLocation();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			login(user);
			blogService.setToken(user.token);
		}
	}, []);

	if (!user) {
		return (
			<Container>
				<Notification />
				<LoginForm />
			</Container>
		);
	}
	return (
		<>
			<Notification />
			<Menu />
			<Container>
				<AppTitle>Bloglist app</AppTitle>
				<AnimatePresence mode="wait">
					<Routes key={location.pathname} location={location}>
						<Route path="/" element={<Navigate replace to="/blogs" />} />
						<Route path="/blogs" element={<Blogs />} />
						<Route path="/users" element={<Users />} />
						<Route path="/users/:id" element={<User />} />
						<Route path="/blogs/:id" element={<BlogDetails />} />
					</Routes>
				</AnimatePresence>
			</Container>
		</>
	);
};

export default App;
