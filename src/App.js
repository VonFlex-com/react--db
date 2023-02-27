import React, { useEffect, useState } from "react";
import "./App.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import axios from 'axios';

const endPoint = "http://localhost:4000/posts";

const App = () => {
  const [todo, setTodo] = useState(
    {
      title: "",
      descript: "",
      poster: "",
      note: ""
    }
  );

  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const [show, setShow] = useState(false);

  //OK---------------------->
  const fetchTodos = async ()=>{
    const {data, status} = await axios.get(endPoint);
    if(status === 200){
      setTodos(data);
    }
  };

  useEffect(()=>
  {
    fetchTodos();
  }, []);

  const handleSubmitB = async (e) => {
  if (editId) {
    const editTodo = todos.find((i) => i.id === editId);
    alert("handle sumit title = " + editTodo.title + editTodo.poster + editTodo.note + ", id = " + editId);
/*
    const updatedTodos = todos.map((t) =>
    t.id === editTodo.id
      ? (t = { id: t.id, todo})
      : { id: t.id, todo: t.todo}
    );
*/
    let response1 = await axios.put(endPoint + "/" + editId, todo)
    if (response1) {
      alert("Updated at " + editId );
      fetchTodos();
      setEditId(0);
    }
  }
  else{
  let response = await axios.post(endPoint, todo)
  if (response) {
    alert("data submited : " + todo.title);
    fetchTodos();
    setTodo({
      title: "",
      descript: "",
      poster: "",
      note: ""
    });
    setShow(!show);
  } else {
    alert("failed operation");
  }
  }
}

//OK-------------------->
  const handleDelete = async (id) => {
    await axios
      .delete(endPoint + "/" + id)
      .then((res) => alert("Deleted at " + id));

    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

//OK------------------>
  const handlePoster = (poster) => {
    alert("Posted by " + poster)
  };

  //OK --------------->
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo);
    console.log("title = " + editTodo.title + editTodo.poster + editTodo.note + ", id = " + id);
    setEditId(id);
    setShow(!show);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Maelstrom.........
<button className="showButton" type ="button" onClick={()=> setShow(!show)}>
  {show === true?'DONE':'ADD A NEW ENTRY'}
  </button>
</h1>
{show && <form className="todoForm" onSubmit={handleSubmitB}
onReset={e => console.log('onReset', e)}>
          <label className="textLi">FILM TITLE</label>
          <input
            className="inputForm"
            type="text"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <label className="textLi">DESCRIPTION</label>
          <textarea
            className="inputForm"
            type="text"
            value={todo.descript}
            onChange={(e) => setTodo({ ...todo, descript: e.target.value })}
          />
          <label className="textLi">POSTER</label>
          <input
            className="inputForm"
            type="text"
            value={todo.poster}
            onChange={(e) => setTodo({ ...todo, poster: e.target.value })}
          />
          <label className="textLi">RATING</label>
          <input
            className="inputForm"
            type="number"
            value={todo.note}
            onChange={(e) => setTodo({ ...todo, note: e.target.value })}
          />
          <button className="buttonSubmit" type="submit">{editId ? "EDIT "+editId : "ADD"}</button>
        </form>}
         <PostList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePoster={handlePoster}
        />
        
      </div>
    </div>
  );
};

export default App;