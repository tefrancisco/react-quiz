import QuestionTimer from "./QuestionTimer.jsx"
import Answers from "./Answers.jsx"

export default function Question({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer }) {
    return (
         <div id='question'>
                {/* The progress bar component is not reloaded, to solve this we put a key on it */}
                <QuestionTimer
                    // Whenever the key changes, React destroy the old component and create a new one
                    timeout={10000}
                    onTimeout={onSkipAnswer}
                />
                <h2>{questionText}</h2>
               <Answers 
               answers={answers} 
               selectedAnswer={selectedAnswer} 
               answerState={answerState} 
               onSelect={onSelectAnswer}
               />
            </div>
    )
}