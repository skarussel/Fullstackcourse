import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() =>  {
    dispatch(initializeAnecdotes()) 
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