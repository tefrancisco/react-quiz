import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    // Deriving state, if the array has 2 answers, the activeQuestion must be the third one
    const activeQuestionIndex = userAnswers.length
   
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer]
        } )
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete) {
        return <div id='summary'>
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

     const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    // In the sort method, if you put a negative number, it swap the elements (a, b), and a positive
    // number mantains the order. In this case below, the number can be both negative or positive.
    shuffledAnswers.sort(() => Math.random() -0.5)

    return (
        <div id="quiz">
            <div id='question'>
                {/* The progress bar component is not reloaded, to solve this we put a key on it */}
                <QuestionTimer 
                // Whenever the key changes, React destroy the old component and create a new one
                key={activeQuestionIndex}
                timeout={10000} 
                onTimeout={handleSkipAnswer} 
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shuffledAnswers.map(answer => <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>)}
                </ul>
            </div>
        </div>
    )

}