import React,{useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QuestionCard from '../components/Questioncard'
import { fetchQuizQuestions } from '../API'
import { Difficulty, QuestionState} from '../API'

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestion = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    setQuestions(newQuestion)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) =>{

  }

  const nextQuestion = () => {

  }

  return (
   <div className={styles.App}>
    <h1>REACT QUIZ</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className={styles.start} onClick={startTrivia}>Start</button>
    ): null}
    {!gameOver ? <p className={styles.score}>Score</p> : null}
    {loading && <p>Loading Questions . . .</p>}
    {!loading && !gameOver && (
      <QuestionCard 
      questionNr={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
    />
    )}
    {
      !gameOver && !loading && userAnswers.length===number + 1 && number !== TOTAL_QUESTIONS -1 ?(
        <button className={styles.next} onClick={nextQuestion}>Next Question</button>
    ): null}
   </div>
  )
}

/* */ 
    