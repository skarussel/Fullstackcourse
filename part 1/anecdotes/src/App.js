import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const empty_list = new Uint8Array(anecdotes.length); 
  const [votes, setVotes] = useState(empty_list)
  
  const handleGenClick = () => {
    const r = Math.round(Math.random() * (anecdotes.length-1))
    console.log(r)
    setSelected(r)
  }

  const handleVoteClick = () => {
    var votes_copy = [...votes]
    votes_copy[selected]+=1
    setVotes(votes_copy)
  }

  return (
    <div>
    <h1>Random Anecdote</h1>
      {anecdotes[selected]}
      <p>
      <button onClick={handleGenClick}>random anecdote</button> 
      <button onClick={handleVoteClick}>vote</button> 
      <br></br>
      {votes[selected]}
      </p>
      <h1>Anecdote of the day</h1>
      <BestAnecdote values={votes} text={anecdotes}/>
    </div>
  )
}

const BestAnecdote=(props)=>{
  let i = props.values.indexOf(Math.max(...props.values));
  return (
    <p>{props.text[i]}</p>
  )

}


export default App