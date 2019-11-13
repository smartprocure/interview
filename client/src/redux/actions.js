import {
    GET_QUIZ,
    SET_QUIZ,
    START_QUIZ,    
    FINISH_QUIZ,
    RESET_QUIZ,
    UPDATE_QUESTION,
    UPDATE_PAGE,
    UPDATE_SCORE,
    UPDATE_ANSWERS,
    CHANGE_BACKGROUND
} from "./constants";

export function getQuiz() {
    return function (dispatch) {
        return fetch("http://localhost:3030/questions")
          .then(res => res.json())
          .then(json => {
            dispatch({ type: GET_QUIZ, payload: json.data });
            dispatch(setQuiz(json.data));
          });
    };
}

const generateRandomSet = () => {
    let set = [];
    while (set.length < 10) {
        let n = Math.floor(Math.random() * 50) + 1;
        if (!set.includes(n)) set.push(n);
    }
    return set;
}
const mapQuizSet = (quiz) => {
    let set = generateRandomSet();
    let mappedSet = set.map(function (i) {
        return quiz[i];
    });
    return mappedSet;
}

export function setQuiz(payload){
    let quiz = mapQuizSet(payload);  
    return { type: SET_QUIZ, quiz };
}

export function startQuiz() {
    return { type: START_QUIZ };
}

export function finishQuiz() {
    return { type: FINISH_QUIZ };
}

export function resetQuiz() {
    return { type: RESET_QUIZ };
}

export function updateQuestion(payload) {
    return { type: UPDATE_QUESTION, payload };
}

export function updatePage(payload) {
    return { type: UPDATE_PAGE, payload };
}

export function updateScore(payload) {
    return { type: UPDATE_SCORE, payload };
}

export function updateAnswers(payload) {
    return { type: UPDATE_ANSWERS, payload };
}

const getBackgroundColor = (id) => {
    let colors = [
        '#600',
        '#303',
        '#330',
        '#603',
        '#300',
        '#900',
        '#003',
        '#006',
        '#603'
    ];

    let page = document.getElementById('quiz');
    page.style.background = colors[id];
    return colors[id];
}

export function changeBackground(payload){
    let background = getBackgroundColor(payload);
    return { type: CHANGE_BACKGROUND, background };
}
