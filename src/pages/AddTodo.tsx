import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { addTodo } from "../feature/todoSlice";

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      addTodo({
        title,
        note,
        date: "",
      })
    );
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="font-inter text-3xl font-bold">Add Todo</h1>
      <form
        onSubmit={addHandler}
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
            Add Notess
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
