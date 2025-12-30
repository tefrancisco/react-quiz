import { useRef } from 'react'

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef()
    
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        // In the sort method, if you put a negative number, it swap the elements (a, b), and a positive
        // number mantains the order. In this case below, the number can be both negative or positive.
        shuffledAnswers.current.sort(() => Math.random() - 0.5)
    }

    return (
         <ul id='answers'>
                    {shuffledAnswers.current.map((answer) => {
                        const isSelected = selectedAnswer === answer;
                        let cssClasses = ''

                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected'
                        }

                        if (answerState === 'correct' || answerState === 'wrong' && isSelected) {
                            cssClasses = answerState
                        }

                        return <li key={answer} className="answer">
                            <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>
                                {answer}
                            </button>
                        </li>
                    })}
                </ul>
    )
}