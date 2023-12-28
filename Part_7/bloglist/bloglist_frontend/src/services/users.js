import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
	const request = axios.get(baseUrl).then(request => request.data)
	return request
}

export default { getAll }
