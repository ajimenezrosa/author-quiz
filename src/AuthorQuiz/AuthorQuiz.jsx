import React, { Component } from 'react';
import './AuthorQuiz.css';

const Hero = () =>
<div className="row">
	<div className="jumbotron col-10 offset-1">
		<h1>Author Quiz</h1>
		<p>select the book written by the author shown</p>
	</div>
</div>

const Turn = ({ author, books }) =>
<div className="row turn" style={{ backgroundColor: 'white' }}>
	<div className="col-4 offset-1">
		<img src={author.imageUrl} alt="Author" className="authorImage"/>
	</div>
	<div className="col-6">
		{books.map((title) => <Book title={title} key={title} />)}
	</div>
</div>

const Book = ({title}) =>
<div className="answer">
	<h4>{title}</h4>
</div>


function Continue() { return null; }

const Footer = () =>
<div id="footer" className="row">
	<div className="col-12">
		<p className="text-muted credit">
			<span>All images are from</span>
			<a href="https://commons.wikimedia.org/wiki/Main_Page" target="_blank"> Wikimedia Commons </a>
			<span>and are in public domain</span>
		</p>
	</div>
</div>

const AuthorQuiz = ({ turnData }) =>
<div className="container-fluid">
	<Hero/>
	<Turn {...turnData}/>
	<Continue/>
	<Footer/>
</div>

export default AuthorQuiz;
