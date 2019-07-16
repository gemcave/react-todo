import React, {Component} from 'react';
import ReactDOM from 'react-dom';

 import './delete-done-item.css';

export default class DeleteDoneItem extends Component {

	state = {
		label: ''
	};

onSubmit = (e) => {
	e.preventDefault();
	this.props.onItemAdded(this.state.label);
	this.setState({
		label: ''
	});
};
	render (){
		return (
				<button onClick={ () => console.log('label')} className="btn btn-outline-secondary"
				>Delete Done Items</button> 
			)
		}
}