import React from 'react';

import Book from './Book';

export const Turn = ({ author, books, answerStatus = 'none', onAnswerSelected }) => {
	const backgroundColor = getBackgroundColor(answerStatus);

	return (
		<div className="row turn" style={{ backgroundColor }}>
			<div className="col-4 offset-1">
				<img src={author.imageUrl} alt="Author" className="authorImage"/>
			</div>
			<div className="col-6">
				{books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
			</div>
		</div>
	);
}

function getBackgroundColor(answerStatus) {
	return {
		none: 'white',
		correct: 'green',
		incorrect: 'red'
	}[answerStatus];
}
