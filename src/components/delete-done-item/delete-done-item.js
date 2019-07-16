import React, {Component} from 'react';

 import './delete-done-item.css';

export default class DeleteDoneItem extends Component {
	
handleClick = () => {
	this.props.deleteDone();
}

	render (){
		return (
				<button onClick={this.handleClick} className="btn btn-outline-secondary"
				>Delete Done Items</button> 
			)
		}
}