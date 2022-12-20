import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
    <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
     <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App