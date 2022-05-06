import React, { useState } from 'react';
import FormInput from './FormInput';
import { FaTrash } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'


function Todo({ todos, removeItem, completeTodo, updateTodo }) {
 const [edit, setEdit] = useState({
  id: null,
  value: ''
 });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id:null,
      value: ''
    });
  };

  if (edit.id) {
    return <FormInput edit={edit} onSubmit={submitUpdate} />
  }
 
  return todos.map((todo, index) => {
   const { id, input } = todo;
   return (
     <>
    <div key={id} id={index} className='todo-row'>

     <label htmlFor={id} className={todo.isComplete ? 'complete' : ''}>
      <input type='checkbox' id={id} key={todo.id} onClick={() => completeTodo(todo.id)} />
     {todo.text}
     </label>

     <div className='icons'>
       <button onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit-icon' disabled={todo.isComplete}> 
       <AiFillEdit /> 
       </button>
      <button onClick={() => removeItem(todo.id)} className='delete-icon'>
      <FaTrash />
      </button>
      </div>

    </div>
    </>
   );
  });
}

export default Todo