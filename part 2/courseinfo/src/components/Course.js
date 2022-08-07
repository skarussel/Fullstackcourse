import React from 'react'
import Header from './Header'

const Course = ({course}) =>{
    return (
      <div>
    <Header text={course.name} />
    <Content parts = {course.parts}/>
    </div>
    )
  
  }

  
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map(part => <Part key={part.id} part = {part}/>)}
      <Sum parts = {parts}/>
      </div>
  
    )
  }
  
  const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Sum = ({parts}) => {
    const sum = parts.reduce(sumFunc, 0)
    return <b>total of {sum} exercises</b>
  }
  
  function sumFunc (total, num) {
    return total+num.exercises;
  
  }


  export default Course