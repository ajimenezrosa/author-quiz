import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import AddAuthorForm from './AddAuthorForm/AddAuthorForm';
import AuthorQuiz from './AuthorQuiz/AuthorQuiz';
import { authors, getTurnData, addAuthor } from './author-data';

const initialState = {
	authors,
	turnData: getTurnData(authors),
	answerStatus: 'none'
}
const actionHandlers = {
	'ANSWER_SELECTED': (state, action) => Object.assign({}, state, { answerStatus: getAnswerStatus(action.answer, state.turnData) }),
	'CONTINUE': (state, action) => Object.assign({}, state, { answerStatus: 'none', turnData: getTurnData(state.authors) })
};
const reducer = (state = initialState, action) => {
	let actionHandler = actionHandlers[action.type];

	return (actionHandler && actionHandler(state, action)) || state;
};
const store = createStore(reducer);

function getAnswerStatus(answer, turnData) {
	let isCorrect = turnData.author.books.includes(answer);
	return isCorrect ? 'correct' : 'incorrect';
}

const AuthorQuizWrapper = () =>
<Provider store={store}>
	<AuthorQuiz />
</Provider>;

const AuthorFormWrapper = withRouter(({ history }) =>
	<Provider store={store}>
		<AddAuthorForm onAddAuthor={(author) => {
			addAuthor(author);
			history.push('/');
		}}/>
	</Provider>
);

const app = <BrowserRouter>
	<React.Fragment>
		<Route exact path="/" component={AuthorQuizWrapper}/>
		<Route path="/add" component={AuthorFormWrapper}/>
	</React.Fragment>
</BrowserRouter>

ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker();
