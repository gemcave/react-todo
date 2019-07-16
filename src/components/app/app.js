import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import DeleteDoneItem from '../delete-done-item';

import './app.css';


export default class App  extends Component  {
 maxId = 100;
state = { 
		todoData : [
			this.createTodoItem('Drink Coffee 2'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Draw like Steve Rude')
			],
		term: "",
		filter: "all" // all, active, done
  	};

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++
		}
	}

	deleteItem = (id) =>{
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id === id);
			//todoData.splice(idx, 1); -- Так делать нельзя?

			// const before = todoData.slice(0, idx);
			// const after = todoData.slice(idx+1);

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx+1)
			];

			return {
				todoData: newArray
			};
		});
	};


	deleteDoneItems = (id) =>{
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => el.id === id);
			//todoData.splice(idx, 1); -- Так делать нельзя?

			// const before = todoData.slice(0, idx);
			// const after = todoData.slice(idx+1);

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx+1)
			];

			return {
				todoData: newArray
			};
		});
	};

	addItem = (text) => {
		// console.log('Added', text);
		// generate id?
		const newItem = this.createTodoItem(text);
		// add element to array
		this.setState(({todoData})=>{
			
			const newArr = [
				...todoData,
				newItem
			];

			return {
				todoData: newArr
			};
		});
	};


toggleProperty(arr, id, propName){
			
			const idx = arr.findIndex((el) => el.id === id);
			
			const oldItem = arr[idx];
			const newItem = {
				...oldItem,
				[propName]: !oldItem[propName]};
		return  [
				...arr.slice(0, idx),
				newItem,
				...arr.slice(idx+1)
			];
};

onToggleImportant = (id) => {
	this.setState(({todoData}) => {
		return {
			todoData: this.toggleProperty(todoData, id, 'important')
		};
	})
};

onToggleDone = (id) => {
	this.setState(({todoData}) => {
		return {
			todoData: this.toggleProperty(todoData, id, 'done')
		};
	})
};

search(items, term) {
	return items.filter((item) => {
		return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
	});
}

filter(items, filter) {
	switch(filter) {
		case 'all':
			return items;
		case 'active':
			return items.filter((item) => !item.done);
		case 'done':
			return items.filter((item) => item.done);
		default:
			return items;
	}
}

onSearchChange = (term) => {
	this.setState({term});
};

onFilterChange = (filter) => {
	this.setState({filter});
};

	render() {
		const {todoData, term, filter} = this.state;
		const visibleItems = this.filter(this.search(todoData, term), filter);
		const doneCount = todoData
		.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;

	return (
		<div className="todo-app">
		<AppHeader toDo={todoCount} done={doneCount} />
		<div className="top-panel d-flex">
			<SearchPanel
				onSearchChange={this.onSearchChange} />
			<ItemStatusFilter 
				filter={filter}
				onFilterChange={this.onFilterChange}/>
		</div>

		<TodoList 
			todos={visibleItems} 
			onDeleted = {this.deleteItem}  
			onToggleImportant={this.onToggleImportant}
			onToggleDone={this.onToggleDone}
		/>


		<ItemAddForm onItemAdded={this.addItem} /> 
		{/* <DeleteDoneItem />  */}
		<DeleteDoneItem onClick={() => console.log('1')} /> 
	</div>
	);
};
}