import { useSelector, useDispatch } from 'react-redux'
import {incrementVote} from '../reducers/anecdoteReducer'
import  {setNotification}  from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
    dispatch(setNotification("tet"))
  }

    return (
        <div>
      {anecdotes.map(anecdote =>
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