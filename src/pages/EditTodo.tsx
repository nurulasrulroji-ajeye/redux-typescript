import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { addTodo } from "../feature/todoSlice";

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const defaultData = {
  id: Math.floor(Math.random() * Date.now()),
  title: "",
  date: date,
  note: "",
};

const EditTodo = () => {
  const [formTodo, setFormTodo] = useState(defaultData);
  const { title, note } = formTodo;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTodo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formTodo);
    await dispatch(addTodo(formTodo));
    navigate("/");
    setFormTodo(defaultData);
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="font-inter text-3xl font-bold">Add Todo</h1>
      <form
        onSubmit={handleUpdate}
        className="mt-10 flex flex-col p-10 bg-black space-y-5 w-[30%] rounded-md shadow-md"
      >
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={onChange}
        />
        <input id="note" placeholder="Note" value={note} onChange={onChange} />
        <div className="w-full flex justify-end">
          <button className="bg-white px-5 rounded-md">Add Note</button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
