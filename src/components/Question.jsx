import { useState } from 'react'
import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx"
import QUESTIONS from '../questions.js'

export default function Question({ index , onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
            selectedAnswer: answer,
            isCorrect: QUESTIONS[index].answers[0] === answer
        })

        setTimeout(() => {
            onSelectAnswer(answer)
        }, 2000)
        }, 1000)
    }

    let answerState = ''

    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }
    
    return (
         <div id='question'>
                {/* The progress bar component is not reloaded, to solve this we put a key on it */}
                <QuestionTimer
                    // Whenever the key changes, React destroy the old component and create a new one
                    timeout={10000}
                    onTimeout={onSkipAnswer}
                />
                <h2>{QUESTIONS[index].text}</h2>
               <Answers 
               answers={QUESTIONS[index].answers} 
               selectedAnswer={answer.selectedAnswer} 
               answerState={answerState} 
               onSelect={handleSelectAnswer}
               />
            </div>
    )
}