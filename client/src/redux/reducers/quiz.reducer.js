import {
    GET_QUIZ,
    SET_QUIZ,
    START_QUIZ,
    FINISH_QUIZ,
    RESET_QUIZ,
    CHANGE_BACKGROUND,
    UPDATE_QUESTION,
    UPDATE_PAGE,
    UPDATE_SCORE,
    UPDATE_ANSWERS
} from "../constants";

const initialState = {
    page: 0,
    score: 0,
    questions: [],
    answers: [],
    quiz: [],
    background: '',
    totalQuestions: 10,
    currentQuestion: 0,
    hasErrors: false,
    status: 'loading'
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_QUIZ:
            return Object.assign({}, state, {
                questions: state.quiz.concat(action.payload)
            });
        case SET_QUIZ:
            return Object.assign({}, state, {
                quiz: state.quiz.concat(action.quiz)
            });
        case START_QUIZ:
            return Object.assign({}, state, {
                page: 1,
                status: 'quiz_started'
            });
        case FINISH_QUIZ:
            return Object.assign({}, state, {
                page: 2,
                status: 'quiz_finished'
            });
        case RESET_QUIZ:
            return Object.assign({}, state, {
                status: 'quiz_reset',
                page: 0,
                score: 0,
                answers: []
            });
        case UPDATE_QUESTION:
            return Object.assign({}, state, {
                currentQuestion: action.payload
            });
        case UPDATE_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            });
        case UPDATE_SCORE:
            return Object.assign({}, state, {
                score: action.payload
            });
        case UPDATE_ANSWERS:
            return Object.assign({}, state, {
                answers: state.answers.concat(action.payload)
            });
        case CHANGE_BACKGROUND:
            return Object.assign({}, state, {
                background: action.background
            });
        default: 
            return state;        
    } 

}
export default rootReducer;
