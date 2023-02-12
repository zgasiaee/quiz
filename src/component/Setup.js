import React, { useState } from 'react'

//style
import styles from '../styles/Setup.module.css'

//component
import Quiz from './Quiz'

const Setup = () => {
  const options = [
    { name: 'Animals', code: 27 },
    { name: 'Politics', code: 24 },
    { name: 'History', code: 23 },
    { name: 'Books', code: 10 },
    { name: 'Film', code: 11 },
    { name: 'Computers', code: 18 },
    { name: 'Mathematics', code: 19 },
    { name: 'Sports', code: 21 },
    { name: 'Music', code: 12 },
    { name: 'Geography', code: 22 },
  ]

  const [setup, setSetup] = useState({
    category: 27,
    difficulty: 'easy',
  })
  
  const [submit, setSubmit] = useState(false)

  const changeHandler = (event) => {
    setSetup({ ...setup, [event.target.name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setSubmit(!submit)
  }

  return (
    <div className={styles.container}>
      {submit ? (
        <Quiz category={setup.category} difficulty={setup.difficulty} />
      ) : (
        <form onSubmit={submitHandler} className={styles.card}>
          <h1 className={styles.titel}>Setup Quiz</h1>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" onChange={changeHandler}>
              {options.map((option) => (
                <option value={option.code} key={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Select Difficulty</label>
            <select name="difficulty" onChange={changeHandler}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className={styles.start}>Start</button>
        </form>
      )}
    </div>
  )
}

export default Setup
