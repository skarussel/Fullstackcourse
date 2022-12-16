import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = (props) => {

  if (sum(props.values)==0){
    return <p>No feedback given</p>
  }
  

  return (
  <table>
    <tbody>
      <StatisticLine text ="good" value={props.values[0]} />
      <StatisticLine text="neutral" value ={props.values[1]} />
      <StatisticLine text="bad" value ={props.values[2]} />
      <StatisticLine text ="all" value = {sum(props.values)} />
      <StatisticLine text ="average" value = {avg(props.values)} />
    </tbody>
  </table>
  )

}

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
  if (s===0){
    return 0
  }
  
  return (values[0]*1+values[2]*-1)/s
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <Header name="give Feedback" />
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Header name="statistics"/>
      <Statistics values = {[store.getState().good, store.getState().ok, store.getState().bad]}/>
    </div>
  )
}

const Header = (props) => {
  
  return <h2>{props.name}</h2>

}
const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}


renderApp()
store.subscribe(renderApp)