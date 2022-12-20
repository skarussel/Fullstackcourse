import { useDispatch } from 'react-redux'
import {createAnecdotes} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {


    const dispatch = useDispatch()

    const addAnekdote = async (event) => {
        event.preventDefault()
        const content = event.target.anekdote.value
        event.target.anekdote.value = ''
        dispatch(createAnecdotes(content))
        dispatch(setNotification(`You added anecdote ${content}`, 5))
      }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={addAnekdote}>
        <div><input name="anekdote" /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )

}

export default AnecdoteForm