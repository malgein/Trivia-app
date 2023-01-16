import React,{useState} from 'react'
import QuestionCard from '../components/Questioncard'
import { fetchQuizQuestions } from '../API'
import { Difficulty, QuestionState} from '../API'
import styles from '../styles/Home.module.css'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

const Home: React.FC = () => {

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
    if(!gameOver){
      //users answer
      const answer = e.currentTarget.value
      //check answer againts the correct answer
      const correct = questions[number].correct_answer === answer

      if(correct) setScore((prev)=> prev +1)
      //save answer in array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1
    if(nextQuestion=== TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }

  return (
   <>
    <div className={styles.main}>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button  onClick={startTrivia} className={styles.start}>Start</button>
      ): null}
      {!gameOver ? <p className={styles.score}>Score: {score}</p> : null}
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
          <button onClick={nextQuestion} className={styles.next}>Next Question</button>
      ): null}
    </div>
   </>
  )
}

export default Home
    