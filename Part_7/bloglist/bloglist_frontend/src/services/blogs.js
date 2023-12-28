import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async newBlog => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

const change = async changedBlog => {
	const response = await axios.put(`${baseUrl}/${changedBlog.id}`, changedBlog)
	return response.data
}

const remove = async blogToDelete => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
	return response.data
}

const comment = async ({ id, content }) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, {
		content: content,
	})
	return response.data
}

export default { getAll, create, change, remove, comment, setToken }
