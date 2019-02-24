import axios from 'axios'
import { useState } from 'react'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [token, setTokenValue] = useState(null)

  const setToken = newToken => {
    setTokenValue(`bearer ${newToken}`)
  }

  const removeToken = () => {
    setTokenValue(null)
  }

  const getToken = () => {
    return token
  }
   
  const getAll = () => {
    const request = axios.get(baseUrl)
    request.then(response => setResources(response.data))
  }
      
  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token }
    }
      
    const response = await axios.post(baseUrl, newObject, config)
    const newAdded = resources.concat(response.data)
    setResources(newAdded)
  }
    
  const update = (id, newObject) => {
    axios.put(`${baseUrl}/${id}`, newObject)
    getAll()
  }
      
  const remove = (id) => {
    const config = {
      headers: { Authorization: token },
      id: id
    }
    axios.delete(`${baseUrl}/${id}`, config)
    getAll()
  }

  const service = {
    create,
    setToken,
    getToken,
    removeToken,
    getAll,
    update,
    remove
  }
  
  return [
    resources, service
  ]
}

export default useResource