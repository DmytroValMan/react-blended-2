import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import TodoList from '../components/TodoList/TodoList';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const jsonTodos = localStorage.getItem('todos list');
    if (jsonTodos === null) {
      return [];
    }
    return JSON.parse(jsonTodos);
  });

  useEffect(() => {
    localStorage.setItem('todos list', JSON.stringify(todos));
  }, [todos]);

  const addNewTodo = inputValue => {
    const newTodo = {
      id: nanoid(),
      text: inputValue,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = todoId => {
    setTodos(() => todos.filter(todo => todo.id !== todoId));
  };

  return (
    <>
      <Form onSubmit={addNewTodo} />
      {todos.length === 0 && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
      <TodoList items={todos} onDelete={deleteTodo} />
    </>
  );
};

export default Todos;
