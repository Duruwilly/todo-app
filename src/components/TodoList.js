import React, { useEffect, useState } from 'react';
import FormInput from './FormInput';
import Todo from './Todo';


function TodoList() {
 const [todos, setTodos] = useState([]);
 const [checkAll, setCheckAll] = useState(false)

 useEffect(() => {
  const todoStore = JSON.parse(localStorage.getItem('todoStore'))
  if(todoStore) setTodos(todoStore)
 },[])

 useEffect(() => {
 localStorage.setItem('todoStore', JSON.stringify(todos))
},[todos])

 const addTodo = todo => {
  if (!todo.text || /^\s*$/.test(todo.text)) {
   return;
  }

  const newTodos = [todo, ...todos];

  setTodos(newTodos);
  
 };

 const updateTodo = (todoId, newValue) => {
   if(!newValue.text || /^\s*$/.test(newValue.text)) {
     return;
   }

   setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
 };

 const removeItem = id => {
  let removeArr = [...todos].filter(todo => todo.id !== id);

  setTodos(removeArr);
 }; 

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const todoLis = todos.map((todo, index) => {
    const { id, input } = todo;
  })

 const handleCheckAll = () => {
  const newTodos = [...todos]
  newTodos.forEach(todo => {
   todo.isComplete = !checkAll
  })
  setTodos(newTodos)
  setCheckAll(!checkAll)
 }

const deleteAllTodo = () => {
  const newTodos = todos.filter(todo => {
   return !todo.isComplete
  })
  setTodos(newTodos)
  setCheckAll(false)
 }

  return (
    <div>
      <h1>add plans for today</h1>
      <FormInput onSubmit={addTodo} />
      <Todo todos={todos}
      completeTodo={completeTodo}
      removeItem={removeItem}
      updateTodo={updateTodo}/>
      {todoLis.length === 0 ? <h2>Great! todo completed</h2> : <div className='row'> 
        <label htmlFor="all" id='inputAll'>
            <input type="checkbox" name='all' id='all' onChange={handleCheckAll} checked={checkAll} />
            Check All
        </label>
       <p>You have {todos.filter(todo => !todo.isComplete).length} to do</p>
        <button id='delete' onClick={deleteAllTodo}>Delete All</button>
        </div>
        }
     
    </div>
  )
}

export default TodoList