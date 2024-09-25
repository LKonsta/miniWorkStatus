import axios from 'axios'
const baseUrlGet = 'http://localhost:3001/armies/'
const baseUrlGetEmbed = '?_embed=units'
const baseUrl = 'http://localhost:3001/units'

const getAll = (army_id) => {
  const request = axios.get(`${baseUrlGet}${army_id}${baseUrlGetEmbed}`)
  return request.then(response => response.data.units)
}

const create = (newObject) => {
  const request = axios.post(`${baseUrl}`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update,
  remove 
}