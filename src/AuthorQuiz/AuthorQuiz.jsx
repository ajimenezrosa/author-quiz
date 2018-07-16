import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Continue, Footer, Hero, Turn } from './components';

import './AuthorQuiz.css';

const mapStateToProps = (state) => {
	return {
		turnData: state.turnData,
		answerStatus: state.answerStatus
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		onAnswerSelected: (answer) => dispatch({ type: 'ANSWER_SELECTED', answer }),
		onContinue: () => dispatch({ type: 'CONTINUE' })
	};
};

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(({
	turnData,
	answerStatus,
	onAnswerSelected,
	onContinue
}) =>
<div className="container-fluid">
	<Hero/>
	<Turn {...turnData} answerStatus={answerStatus} onAnswerSelected={onAnswerSelected}/>
	<Continue show={answerStatus === 'correct'} onContinue={onContinue}/>
	<p>
		<Link to="/add">Add an author</Link>
	</p>
	<Footer/>
</div>);

export default AuthorQuiz;
