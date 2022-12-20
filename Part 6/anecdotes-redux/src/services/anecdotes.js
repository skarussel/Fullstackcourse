import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }
  
  const createNew = async (content) => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const object = {
          content: content,
          id: getId(),
          votes: 0
      }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

  const incrementVote = async (id) => {
    const response = await axios.get(baseUrl+`/${id}`)
    const anecdote = response.data
    anecdote.votes +=1
    await axios.put(baseUrl+`/${id}`,anecdote)

  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    getAll,
    createNew,
    incrementVote
  }
  