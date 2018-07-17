import { omit } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './AddAuthorForm.css';

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Vikram Chandra',
			imageUrl: 'https://flavorwire.files.wordpress.com/2014/09/chandra.jpg',
			books: ['Sacred Games'],
			bookTemp: ''
		}
	}

	onFieldChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.onAddAuthor(omit(this.state, ['bookTemp']));
	}

	onAddBook = (event) => {
		event.preventDefault();
		let books = this.state.books.concat(this.state.bookTemp);
		this.setState({
			books,
			bookTemp: ''
		});
	}

	render() {
		return <form onSubmit={this.onFormSubmit}>
			<div className="text-input">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={this.state.name}
					onChange={this.onFieldChange}
				/>
			</div>
			<div className="text-input">
				<label htmlFor="imageUrl">Image URL</label>
				<input
					type="text"
					name="imageUrl"
					value={this.state.imageUrl}
					onChange={this.onFieldChange}
				/>
			</div>
			<div className="text-input">
				<label htmlFor="bookTemp">Book</label>
				{this.state.books.map((book, i) => <p key={i}>{book}</p>)}
				<input 
					type="text" 
					name="bookTemp"
					value={this.state.bookTemp}
					onChange={this.onFieldChange}
				/>
				<button
					className="btn btn-info"
					onClick={this.onAddBook}
				>+</button>
			</div>

			<button role="submit" className="btn btn-success">Add Author</button>
		</form>;
	}
}

function AddAuthorForm({ onAddAuthor }) {
	return <div className="add-author-form">
		<h1>Add Author</h1>
		<Form onAddAuthor={onAddAuthor}/>
	</div>;
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddAuthor: (author) => {
			dispatch({ type: 'ADD_AUTHOR', author });
			props.history.push('/');
		}
	};
};

export default withRouter(connect(() => Object.assign({}), mapDispatchToProps)(AddAuthorForm));
