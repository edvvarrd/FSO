import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = () => axios.get(baseURL).then(res => res.data)
export const createNew = content =>
	axios.post(baseURL, content).then(res => res.data)
export const update = anecdote =>
	axios.put(`${baseURL}/${anecdote.id}`, anecdote).then(res => res.data)
