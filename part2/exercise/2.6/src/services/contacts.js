import axios from 'axios'
const baseUrl = '/api/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request);
  return request.then(response => response.data)

}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, name, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)

}

const remove = (id, name) => {
  if (window.confirm(`delete ${name}?`)) {
    return axios.delete(`${baseUrl}/${id}`)
  }
}

export default {
  getAll,
  create,
  update,
  remove
}