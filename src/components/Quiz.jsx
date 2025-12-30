import { useState } from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])
    // Deriving state, if the array has 2 answers, the activeQuestion must be the third one
    const activeQuestionIndex = userAnswers.length
   
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAnswers => [...prevAnswers, selectedAnswer])
    }

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