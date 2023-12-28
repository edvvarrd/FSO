import styled from 'styled-components'

export const PrimaryButton = styled.button`
	all: unset;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.7em;
	padding: 0.2em 1em;
	color: white;
	font-weight: 300;
	text-transform: uppercase;
	background-color: #023e8a;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		opacity: 0.9;
	}
	&:focus {
		outline: revert;
	}
`

export const SecondaryButton = styled(PrimaryButton)`
	color: #023e8a;
	background-color: transparent;
	border: 1px solid #023e8a;
`
