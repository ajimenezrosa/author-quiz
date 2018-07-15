import React from 'react';
import { Link } from 'react-router-dom';
import { Continue, Footer, Hero, Turn } from './components';

import './AuthorQuiz.css';

const AuthorQuiz = ({ turnData, answerStatus, onAnswerSelected, onContinue }) =>
<div className="container-fluid">
	<Hero/>
	<Turn {...turnData} answerStatus={answerStatus} onAnswerSelected={onAnswerSelected}/>
	<Continue show={answerStatus === 'correct'} onContinue={onContinue}/>
	<p>
		<Link to="/add">Add an author</Link>
	</p>
	<Footer/>
</div>

export default AuthorQuiz;
