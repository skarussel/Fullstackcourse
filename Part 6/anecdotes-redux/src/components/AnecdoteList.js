import { useSelector, useDispatch } from 'react-redux'
import {incrementVote} from '../reducers/anecdoteReducer'
import  {removeNotification, setNotification}  from '../reducers/notificationReducer' 

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
    dispatch(setNotification(`You liked Anecdote ${id}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }




    return (
        <div>
      {anecdotes.filter(item => item.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList