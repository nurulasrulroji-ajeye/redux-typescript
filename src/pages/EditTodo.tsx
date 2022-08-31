import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useNavigate, useParams } from "react-router-dom";
import { getTodo, todoSelector, updateTodo } from "../feature/todoSlice";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const todos = useAppSelector((state) => todoSelector.selectById(state, id));

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  useEffect(() => {
    if (todos) {
      setTitle(todos.title);
      setNote(todos.note);
    }
  }, [todos]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateTodo({ title, note }));
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="font-inter text-3xl font-bold">Edit Todo</h1>
      <form
        onSubmit={handleEdit}
        className="mt-10 flex flex-col p-10 bg-black space-y-5 w-[30%] rounded-md shadow-md"
      >
        <input
          className="p-2 rounded-md shadow-[1px_1px_10px_rgb(250,250,250)]"
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-2 rounded-md shadow-[1px_1px_10px_rgb(250,250,250)]"
          id="note"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <button className="border-2 text-white border-white px-5 py-1 rounded-md shadow-[1px_1px_10px_rgb(250,250,250)] hover:bg-white hover:text-black font-inter font-bold">
            Edit Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
