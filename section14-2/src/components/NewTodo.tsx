import React, { useRef } from 'react';
import './NewTodo.css';

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (evet: React.FormEvent) => {
    evet.preventDefault();
    const enteredText = textInputRef.current!.value;
    if (enteredText.length > 0) {
      props.onAddTodo(enteredText);
      textInputRef.current!.value = '';
    }
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='todo-text'>Todo内容</label>
        <input type='text' id='todo-text' ref={textInputRef}></input>
      </div>
      <button type='submit'>Todo追加</button>
    </form>
  );
};

export default NewTodo;
