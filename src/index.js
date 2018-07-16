import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import AddAuthorForm from './AddAuthorForm/AddAuthorForm';
import AuthorQuiz from './AuthorQuiz/AuthorQuiz';
import { getTurnData, addAuthor } from './author-data';

const reducer = (state, action) => state;

const store = createStore(reducer);
let state = resetState();

function resetState() {
	return {
		turnData: getTurnData(),
		answerStatus: 'none'
	};
}

function onAnswerSelected(answer) {
	let isCorrect = state.turnData.author.books.includes(answer);
	state.answerStatus = isCorrect ? 'correct' : 'incorrect';
	render();
}

const AuthorQuizWrapper = () =>
<Provider store={store}>
	<AuthorQuiz
		{...state}
		onAnswerSelected={onAnswerSelected}
		onContinue={() => {
			state = resetState();
			render();
		}}
	/>
</Provider>;

const AuthorFormWrapper = withRouter(({ history }) =>
	<Provider store={store}>
		<AddAuthorForm onAddAuthor={(author) => {
			addAuthor(author);
			history.push('/');
		}}/>
	</Provider>
);

function render() {
	const routes = <BrowserRouter>
		<React.Fragment>
			<Route exact path="/" component={AuthorQuizWrapper}/>
			<Route path="/add" component={AuthorFormWrapper}/>
		</React.Fragment>
	</BrowserRouter>

	ReactDOM.render(routes, document.getElementById('root'));
}

render();
registerServiceWorker();
