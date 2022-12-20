import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anekdoteSlice = createSlice({
  name: 'anekdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {

      const newAnekdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnekdote);
    },
    incrementVote(state, action){
      const idx = state.findIndex(n => n.id === action.payload)
      state[idx].votes+=1
      state.sort((b,a) => a.votes - b.votes);
    },
    setAnecdotes(state, action){
      return action.payload;
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})
export const { createAnecdote, incrementVote, setAnecdotes, appendAnecdote } = anekdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    dispatch(incrementVote(id))
    anecdotesService.incrementVote(id)
  }
}

export default anekdoteSlice.reducer


