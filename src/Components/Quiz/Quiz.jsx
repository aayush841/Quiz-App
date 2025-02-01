import './Quiz.css'
import { React, useEffect, useState } from "react";
import { fetchQuizData, quizQuestions } from "./helper";

export default function Quiz() {
    const [questions, setQuestions] = useState(quizQuestions); 
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);


    const checkAns = (e, option) => {
        if (lock === false) {
            if (option.is_correct) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1)
            } else {
                e.target.classList.add("wrong");
                setLock(true)
            }
        }

    }


    useEffect(() => {
        async function loadQuestions() {
            const fetchedQuestions = await fetchQuizData();
            setQuestions(fetchedQuestions);
        }
        loadQuestions();
    }, []);

    if (!questions || questions.length === 0) {
        return <p>Loading...</p>;
    }

    const currentQuestion = questions[index];

    const handleNext = () => {
        if (lock === true) {
            if (index === questions.length - 1) {
                setResult(true)
                return 0;
            }
            if (index < questions.length - 1) {
                setIndex(prevIndex => prevIndex + 1);
                setLock(false)
            }
        }

    };

    const reset = ()=>{
        setIndex(0)
        setScore(0)
        setLock(false)
        setResult(false)
    }



    console.log(questions)




    return (
        <div>
            {questions ? (
                <div className='container' key={currentQuestion.id}>
                    <h1>Testline Quiz</h1>
                    <hr />
                    {result ? <><h2>You Scored {score} out of {questions.length}</h2>
                        <button onClick={reset}>Reset</button></> : <><h2>{index + 1}.{currentQuestion.description}</h2>
                        <ul>
                            {currentQuestion.options.map((option, i) => (
                                <li key={option.id} onClick={(e) => checkAns(e, option)}>{String.fromCharCode(65 + i)}. {option.description}</li>
                            ))}

                        </ul>
                        <button onClick={handleNext} >{index === questions.length - 1 ? "Finish" : "Next"}</button>
                        <div className="index">{index + 1} of {questions.length} Questions</div></>}
                        


                </div>
            ) : (
                <p>Loading</p>
            )}

        </div>
    )

}