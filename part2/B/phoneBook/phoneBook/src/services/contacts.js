import axios from 'axios'

const baseUrl = 'api/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateNumber = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data);
}

export default { getAll, create, remove, updateNumber }