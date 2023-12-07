import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
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
export default { getAll, create, change, remove, setToken }
