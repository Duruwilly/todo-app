import React, { useState, useEffect, useRef } from 'react';

function FormInput(props) {
 const [input, setInput] = useState(props.edit ? props.edit.value : '');

 const inputRef = useRef(null)

 useEffect(() => {
   inputRef.current.focus()
 })

 const handleChange = e => {
  setInput(e.target.value)
 }

 const handleSubmit = e => {
  e.preventDefault();

  props.onSubmit({
   id: Math.floor(Math.random()*10000),
   text: input
  });
  setInput('');
 };

  return (
   <form className='todo-form' autoComplete='off' onSubmit={handleSubmit}>
   {props.edit ? (
     <>
     <input type="text" 
    placeholder='edit what to do'
    value={input}
    name='text'
    className='todo-input edit'
    onChange={handleChange}
    ref={inputRef}
    />
    <button className='todo-button edit'>Save</button>
    </>
   ) : (
     <>
     <input type="text" 
    placeholder='Add what to do'
    value={input}
    name='text'
    className='todo-input'
    onChange={handleChange}
    ref={inputRef}
    />
    <button className='todo-button'>Add</button>
    </>
   )}
    
   </form>
  );
}

export default FormInput;