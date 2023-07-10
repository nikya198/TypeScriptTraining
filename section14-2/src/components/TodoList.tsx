import React from 'react';
import './TodoList.css';

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todos) => (
        <li key={todos.id}>
          <span>{todos.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todos.id)}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
