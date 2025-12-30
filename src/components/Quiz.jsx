import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from './Question.jsx'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    // Deriving state, if the array has 2 answers, the activeQuestion must be the third one
    const activeQuestionIndex = userAnswers.length 

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer]
        })

    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return <div id='summary'>
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }


    return (
        <div id="quiz">
           <Question  
           key={activeQuestionIndex}
           index={activeQuestionIndex}
           onSelectAnswer={handleSelectAnswer}
           onSkipAnswer={handleSkipAnswer}
           />
        </div>
    )

}