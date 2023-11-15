import pkg from 'lodash';

const { pick } = pkg;

const filter =  ["question_id", "title", "categories", "complexity", "description"];
const shortFilter = ["question_id", "title", "categories", "complexity"];

export const filterQuestion = (question) => {
    return pick(question, filter);
};

export const filterQuestionShort = (question) => {
    return pick(question, shortFilter);
};

export const filterQuestions = (questions) => {
    return questions.map(q => filterQuestion(q));
}

export const filterQuestionsShort = (questions) => {
    return questions.map(q => filterQuestionShort(q));
}