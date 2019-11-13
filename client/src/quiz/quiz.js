import React from 'react';
import PropTypes from "prop-types";
import './quiz.css';

class QuizPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: this.props.quiz || [],
            answers: this.props.answers || [],
            score: this.props.score || 0,
            currentQuestion: this.props.currentQuestion || 0
        };
        this.handleAnswer = this.handleAnswer.bind(this);
        this.formatQuizItem = this.formatQuizItem.bind(this);
    };

    componentDidUpdate = () => {
        this.props.changeBackground(this.state.currentQuestion);
        this.props.updateQuestion(this.state.currentQuestion);
    }

    handleAnswer = (a,t) => {
        let { quiz, answers, score, currentQuestion } = this.state;
        let i = currentQuestion;
        let correctAnswer;
        if(t === 1){
            correctAnswer = quiz[i].correct_answer === "True" ? true : false;
        } else {
            correctAnswer = quiz[i].correct_answer;
        }

        let isCorrect = correctAnswer === a;
        score += isCorrect ? 1 : 0;

        let answer = {
            answer: a,
            id: i,
            isCorrect,
            correctAnswer,
            question: quiz[i].question
        };

        if (!answers.includes(answer)) answers[i] = answer;
        
        let cQ = currentQuestion < 9 ? currentQuestion + 1 : -1;

        if (cQ === -1) {
            this.props.updateScore(score);
            this.props.finishQuiz();
        } 

        this.setState({ answers, score, currentQuestion: cQ });             
    }
    
    formatQuizItem = (item, currentQuestion) => {
        const { category, question, type, incorrect_answers, correct_answer } = item;
    
        let set = [];
        while(set.length < 4){
            let n = Math.floor(Math.random() * 4) + 0;
            if(!set.includes(n)) set.push(n);
        }

        let answerSet = type === "boolean" ? [] : [...incorrect_answers, correct_answer];
        return (
            <div className="page quiz" id="quiz">
                <h2>{category}</h2>
                <div className="question">
                    <p dangerouslySetInnerHTML={{ __html: question }} ></p>
                </div>
                <h4>{currentQuestion + 1} of 10</h4>

                { type === "boolean" ? (
                    <div className="quizButtons boolean">
                        <button onClick={() => this.handleAnswer(true, 1)}>TRUE</button>
                        <button onClick={() => this.handleAnswer(false, 1)}>FALSE</button>
                    </div>
                ) : (
                   
                    <div className="quizButtons multiple">
                      <button onClick={() => this.handleAnswer(answerSet[set[0]], 2)}>
                        {answerSet[set[0]]}
                      </button>
                      <button onClick={() => this.handleAnswer(answerSet[set[1]], 2)}>
                        {answerSet[set[1]]}
                      </button>
                      <button onClick={() => this.handleAnswer(answerSet[set[2]], 2)}>
                        {answerSet[set[2]]}
                      </button>
                      <button onClick={() => this.handleAnswer(answerSet[set[3]], 2)}>
                        {answerSet[set[3]]}
                      </button>
                    </div>
                )}
            </div>
        );
    }
    render(){
        const { quiz, currentQuestion } = this.state;
        return (
            this.formatQuizItem(quiz[currentQuestion], currentQuestion)
        );
    }
}

QuizPage.propTypes = {
    score: PropTypes.number,
    answers: PropTypes.array,
    quiz: PropTypes.array,
    currentQuestion: PropTypes.number,
    updateAnswers: PropTypes.func.isRequired,
    updateScore: PropTypes.func.isRequired,
    finishQuiz: PropTypes.func.isRequired,
    changeBackground: PropTypes.func.isRequired
};

export default QuizPage;