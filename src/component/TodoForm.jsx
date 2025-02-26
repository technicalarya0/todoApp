import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Navbar';

const TodoForm = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) return toast.success("Please enter a todo");

    const newTodos = [...todos, todo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));

    toast.success("Todo added successfully")

    
    setTodo("");
  }

  const handleDelete = (idx) =>{
    //from there we will filter out the todo that we don't want to delete
    const newTodos = todos.filter((_,index) => index !== idx);
    setTodos(newTodos);
    //Now save the todo list that we don't want to delete
    localStorage.setItem('todos', JSON.stringify(newTodos));
    toast.success("Todo deleted successfully");
  }


  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto mt-10">
      <form
        className="flex justify-center mb-10"
        onSubmit={handleSubmit}
      >
        <input
          text='text'
          value={todo}
          placeholder='Add new todo...'
          className="border-2 text-amber-500 border-amber-300 p-2 w-2/3 rounded-md"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="border-1 text-black text-sm bg-blue-300 border-blue-300 ml-1 p-3 w-25 rounded-md"
          type='submit'
        >Add
        </button>
      </form>
      <ToastContainer />
      <div className='flex flex-col items-center justify-center border-2 rounded-md border-amber-300'>
        <h2 className="text-3xl text-blue-300">Todos List</h2>
        <div className='p-2 w-2/3 rounded-md'>
        <ul>
          
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between border-1 text-blue-300 border-amber-300 p-2 w-2/3 rounded-md">
              {todo}
              <button
              className='border-1 rounded-lg w-10'
              onClick={() => handleDelete(index)}
              >
                X
              </button>
              </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default TodoForm
