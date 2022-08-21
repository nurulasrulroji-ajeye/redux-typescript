import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { deleteTodo, getTodo, todoSelector } from "../feature/todoSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(todoSelector.selectAll);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h1 className="font-inter font-bold text-4xl mb-10">Simple Notes</h1>
      <Link
        to="/add"
        className="font-inter font-bold border-solid border-2 px-6 mb-2 border-black rounded-md hover:bg-black hover:text-white"
      >
        Add Note
      </Link>
      <div className="flex w-4/5 bg-black rounded-lg shadow-md flex-wrap justify-start p-5">
        {todos.map((todo) => (
          <div
            className="flex flex-col w-[30%] ml-8 mt-5 bg-white p-4 items-center rounded-md shadow-[2px_2px_20px_rgb(250,250,250)]"
            key={todo.id}
          >
            <h1 className="font-inter text-xl font-bold">{todo.title}</h1>
            <p className="text-sm leading-relaxed">{todo.date}</p>
            <h3 className="font-inter text-lg mt-5">{todo.note}</h3>
            <div className="w-full flex mt-9 justify-evenly">
              <button
                className="bg-red-600 py-2 px-5 rounded-md hover:bg-red-800 shadow-md"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete
              </button>
              <Link
                to={`edit/${todo.id}`}
                className="bg-black text-white rounded-md py-2 px-5 hover:bg-green-800 shadow-md"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
