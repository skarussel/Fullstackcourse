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

const reducer = (state = initialState, action) => {
  const state_copy = [...state] 
  switch (action.type) {
    case 'INCREMENT':
      const idx = state_copy.findIndex(n => n.id === action.data.id)
      state_copy[idx].votes+=1
      return state_copy.sort((b,a) => a.votes - b.votes);
    case 'ADD':
      const newAnekdote = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnekdote);
    default: return state.sort((b,a) => a.votes - b.votes); 
  }
}

export const createAnekdote = (content) => {
  return {
    'type' : 'ADD',
    'data' : { content }
  }
}

export const increment_vote = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

export default reducer