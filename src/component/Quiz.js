import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

//style
import styles from '../styles/Quiz.module.css'

//api
import { getData } from '../services/api'

//component
import Setup from './Setup'

//img
import loader from '../assets/loader.gif'

const Quiz = ({ category, difficulty }) => {
  const [data, setData] = useState([])
  const [currentQuestion, setcurrentQuestion] = useState(0)
  const [end, setEnd] = useState(false)
  const [score, setScore] = useState(0)
  const [reset, setReset] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const value = await getData(category, difficulty)
      setData(value)
    }
    fetch()
  }, [])

  const getShuffledArr = (arr) => {
    return [...arr].map((_, i, arrCopy) => {
      var rand = i + Math.floor(Math.random() * (arrCopy.length - i))
      ;[arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]]
      return arrCopy[i]
    })
  }

  const checkAnswer = async (event) => {
    const nextQuestion = currentQuestion + 1
    const finalScore = score + 1

    if (event.target.value === 'true') {
      toast.success('Correct Answer', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setScore(finalScore)
    } else {
      toast.error('Wrong Answer', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    if (currentQuestion < 9) {
      setcurrentQuestion(nextQuestion)
    } else {
      setEnd(true)
    }
  }

  const resetQuiz = () => {
    setReset(!reset)
    setcurrentQuestion(0)
    setScore(0)
  }

  data.results &&
    data.results[currentQuestion].incorrect_answers.push(
      data.results[currentQuestion].correct_answer,
    )

  return (
    <div className={styles.container}>
      {end && !reset ? (
        <div className={styles.endContainer}>
          <h1> Quiz End </h1>
          <p> your score is {score} out of 10 </p>
          <button className={styles.reset} onClick={resetQuiz}>
            {' '}
            Reset{' '}
          </button>
        </div>
      ) : end && reset ? (
        <Setup />
      ) : (
        <div className={styles.card}>
          {data.results ? (
            <>
              <span className={styles.header}>
                {' '}
                Correct Answers : {score}/10{' '}
              </span>
              <h1 className={styles.question}>
                {data.results[currentQuestion].question}
              </h1>
              <div className={styles.answerBox}>
                {getShuffledArr(
                  data.results[currentQuestion].incorrect_answers,
                ).map((answer) => (
                  <button
                    onClick={checkAnswer}
                    value={
                      answer === data.results[currentQuestion].correct_answer
                        ? 'true'
                        : 'false'
                    }
                  >
                    {' '}
                    {answer}{' '}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <img src={loader} alt="loader" />
          )}
          <ToastContainer />
        </div>
      )}
    </div>
  )
}

export default Quiz
