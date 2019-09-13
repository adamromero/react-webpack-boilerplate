import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

class Comment extends React.Component {
	state = {
		editing: false
	}

	edit = () => {
		this.setState({editing: true});
	}

	remove = () => {
		this.props.deleteFromBoard(this.props.index);
	}

	save = () => {
		this.props.updateCommentText(this.refs.comment.value, this.props.index);
		this.setState({editing: false});
	}

	renderNormal() {
		return(
			<div className="comment-container">
				<div className="comment-title">{this.props.title}</div>
				<button onClick={this.edit} className="button button--edit">Edit</button>
				<button onClick={this.remove} className="button button--remove">Remove</button>
			</div>
		)
	}

	renderForm() {
		return(
			<div className="comment-container">
				<textarea ref="comment" className="text-box" defaultValue={this.props.title}></textarea>
				<button onClick={this.save} className="button button--save">Save</button>
			</div>
		)
	}

	render() {
		return this.state.editing ? this.renderForm() : this.renderNormal();
	}
}

class Board extends React.Component {
	state = {
		comments: [
			"oranges", "blueberries", "apples"
		]
	}

	addComment = (text) => {
		let arr = this.state.comments;
		arr.unshift(text);
		this.setState({comments: arr});
	}

	removeComment = (i) => {
		let arr = this.state.comments;
		arr.splice(i, 1);
		this.setState({comments: arr});
	}

	updateComment = (comment, i) => {
		let arr = this.state.comments;
		arr[i] = comment;
		this.setState({comments: arr});
	}

	eachComment = (text, i) => {
		return(
			<Comment key={i} index={i} title={text} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment} />
		)
	}

	render() {
		return(
			<div className="board">
        		<button className="button button--save" onClick={this.addComment.bind(null, "default text")}>Add</button>
				{this.state.comments.map(this.eachComment)}
			</div>
		)
	}
}

class App extends React.Component {
	state = { 
		greeting: '' 
	}

	componentDidMount() {
		this.getHello();
	}

	getHello = () => {
		fetch(`http://localhost:5000/hello`)
			.then(res => res.json())
			.then(res => this.setState({ greeting : res.greeting }))
			.catch(err => console.error(err));
	}

	render() {
		return (
			<div className="app-content">
				<h1>{this.state.greeting}</h1>
				<Board />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();