
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getToken = () => {
  return token
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: {Authorization: token},
    id: id
  }
  const req = axios.delete(`${baseUrl}/${id}`, config)
  return req.then(response => response.data)
}

export default { getAll, create, update, setToken, removeToken, remove, getToken}