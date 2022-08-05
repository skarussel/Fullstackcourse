import { useState } from 'react'



const Statistics = (props) => {

  if (sum(props.values)==0){
    return <p>No feedback given</p>
  }
  

  return (
  <table>
      <StatisticLine text ="good" value={props.values[0]} />
      <StatisticLine text="neutral" value ={props.values[1]} />
      <StatisticLine text="bad" value ={props.values[2]} />
      <StatisticLine text ="all" value = {sum(props.values)} />
      <StatisticLine text ="average" value = {avg(props.values)} />
  </table>
  )

}

const App = () => {

  const headers = ["give Feedback","statistics"]
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <Header name={headers[0]} />
    <Button handleClick={() => setGood(good+1)} text = "good"/>
    <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
    <Button handleClick={() => setBad(bad+1)} text="bad"/>
    <Header name={headers[1]} />
    <Statistics values = {[good, neutral, bad]}/>
   
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {

  return (

    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>

  )
  

}



const sum = (values) => {
  return values[0]+values[1]+values[2]
}

const avg = (values) => {
  const s = sum(values)
  if (s==0){
    return 0
  }
  
  return (values[0]*1+values[2]*-1)/s
}
const Header = (props) => {
  
  return <h2>{props.name}</h2>

}

export default App