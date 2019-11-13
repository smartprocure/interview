import React from 'react';
import PropTypes from "prop-types"; 
import './landing.css';

const LandingPage = (props) => {
    const { startQuiz } = props;
    return(
        <div className="page landing">
            <h1>Welcome to the Batman Trivia Challenge!</h1>
            <p>You will be presented with 10 Multiple Choice and True or False questions</p>
            <p>Can you score 100%?</p>
            <button onClick={startQuiz}>BEGIN</button>
        </div>        
    );
}
export default LandingPage;

LandingPage.propTypes = {
    startQuiz: PropTypes.func.isRequired
};