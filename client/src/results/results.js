import React from 'react';
import PropTypes from "prop-types"; 
import './results.css';
import { FaPlus, FaMinus } from "react-icons/fa";

const formatResults = (answers) => {
    return answers.map(function (ans, index) {     
        const { isCorrect, question, answer, correctAnswer } = ans;
        const clsName = isCorrect ? "correct" : "incorrect";
        return (
          <li key={index} className="result">
            <i className={clsName}>{isCorrect ? <FaPlus /> : <FaMinus />}</i>
            <div className={"resultElement " + clsName}>
              <p dangerouslySetInnerHTML={{ __html: "Q: " + question }}></p>
              <p>A: {answer.toString()}</p>
              { !isCorrect && <p>Correct Answer: {correctAnswer.toString()}</p> }
            </div>
          </li>
        );
    });
}

const ResultsPage = (props) => {
    const { answers, score, totalQuestions, resetQuiz } = props;
    
    return (
        <div className="page results">
            <h1>You Scored {score} / {totalQuestions}</h1>
            <ul>
                { formatResults(answers) }
            </ul>
            <button onClick={resetQuiz}>PLAY AGAIN?</button>
        </div>
    );
}

ResultsPage.propTypes = {
    score: PropTypes.number,
    answers: PropTypes.array,
    totalQuestions: PropTypes.number,
    resetQuiz: PropTypes.func.isRequired
};

export default ResultsPage;