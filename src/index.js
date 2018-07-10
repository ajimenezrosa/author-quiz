import React from 'react';
import ReactDOM from 'react-dom';
import { chain, sample } from 'lodash';
import './index.css';
import AuthorQuiz from './AuthorQuiz/AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';

const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: [ 'The Adventures of Huckleberry Finn' ]
	},
	{
		name: 'Joseph Conrad',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Heart of Darkness']
	},
	{
		name: 'J.K. Rowling',
		imageUrl: 'images/authors/jkrowling.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Harry Potter and the Sorcerers Stone']
	},
	{
		name: 'Stephen King',
		imageUrl: 'images/authors/stephenking.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['The Shining', 'IT']
	},
	{
		name: 'Charles Dickens',
		imageUrl: 'images/authors/charlesdickens.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['David Copperfield', 'A Tale of Two Cities']
	},
	{
		name: 'William Shakespeare',
		imageUrl: 'images/authors/williamshakespeare.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
	},
];

function getTurnBooks(authors) {
	return chain(authors)
		.reduce((books, author) => books.concat(author.books), [])
		.shuffle()
		.slice(0, 4)
		.value();
}

function getTurnData(authors) {
	const books = getTurnBooks(authors);
	const answer = sample(books);
	const author = authors.find((a) => a.books.includes(answer));

	return { books, author };
}

const state = {
	turnData: getTurnData(authors),
	answerStatus: 'none'
};

function onAnswerSelected(answer) {
	let isCorrect = state.turnData.author.books.includes(answer);
	state.answerStatus = isCorrect ? 'correct' : 'incorrect';
	render();
}

function render() {
	const element = <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>
	const root = document.getElementById('root');
	ReactDOM.render(element, root);
}

render();
registerServiceWorker();
