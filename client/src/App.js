import React from 'react';
import { connect } from "react-redux";
import {
  getQuiz,
  setQuiz,
  updateQuestion,
  updatePage,
  updateScore,
  updateAnswers,
  startQuiz,
  finishQuiz,
  resetQuiz,
  changeBackground
} from "./redux/actions";
import './App.css';
import LandingPage from './landing/landing';
import QuizPage from './quiz/quiz';
import ResultsPage from './results/results';

class App extends React.Component {
  componentDidMount() {
    this.props.getQuiz();
  }

  render() {
    const {
      page,
      score,
      answers,
      quiz,
      resetQuiz,
      startQuiz,
      finishQuiz,
      updateScore,
      updateAnswers,
      updateQuestion,
      changeBackground,
      totalQuestions
    } = this.props;
    return (
      <div className="App">
        {page === 0 && <LandingPage {...{ startQuiz }} />}
        {page === 1 && (
          <QuizPage
            {...{
              score,
              answers,
              quiz,
              updateAnswers,
              updateScore,
              updateQuestion,
              finishQuiz,
              changeBackground
            }}
          />
        )}
        {
          page === 2 && < ResultsPage {
            ...{
              score,
              answers,
              totalQuestions,
              resetQuiz
            }
          }
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    score: state.quizReducer.score,
    answers: state.quizReducer.answers,
    page: state.quizReducer.page,
    quiz: state.quizReducer.quiz,
    questions: state.quizReducer.questions,
    hasErrors: state.quizReducer.hasErrors,
    status: state.quizReducer.status,
    totalQuestions: state.quizReducer.totalQuestions
  };
}

export default connect(
  mapStateToProps,
  {
    getQuiz,
    setQuiz,
    updatePage,
    updateScore,
    updateAnswers,
    startQuiz,
    finishQuiz,
    resetQuiz,
    updateQuestion,
    changeBackground
  }
)(App);