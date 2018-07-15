import React from 'react';

const Book = ({title, onClick}) =>
<div className="answer" onClick={onClick.bind(null, title)}>
	<h4>{title}</h4>
</div>;

export default Book;
