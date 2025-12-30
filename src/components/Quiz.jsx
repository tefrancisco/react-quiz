import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import Summary from './Summary.jsx'
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
        return <Summary userAnswers={userAnswers} />
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