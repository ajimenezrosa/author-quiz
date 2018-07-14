import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthorQuiz from './AuthorQuiz';

Enzyme.configure({ adapter: new Adapter() })

const dummyState = {
	turnData: {
		books: [ 'The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet' ],
		author: {
			name: 'Charles Dickens',
			imageUrl: 'images/authors/charlesdickens.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['David Copperfield', 'A Tale of Two Cities']
		}
	},
	answerStatus: 'none'
}

describe("Author Quiz", () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AuthorQuiz {...dummyState} onAnswerSelected={() => {}}/>, div);
	});

	describe("When no answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<AuthorQuiz {...dummyState} onAnswerSelected={() => {}}/>)
		})
	
		it("should have no background color", () => {
			expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('white')
		})
	})
	
	describe("When the incorrect answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<AuthorQuiz {...dummyState} answerStatus="incorrect" onAnswerSelected={() => {}}/>)
		})
	
		it("should have red background color", () => {
			expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red')
		})
	})
	
	describe("When the correct answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<AuthorQuiz {...dummyState} answerStatus="correct" onAnswerSelected={() => {}}/>)
		})
	
		it("should have green background color", () => {
			expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green')
		})
	})
});
