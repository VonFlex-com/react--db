import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import axios from 'axios';
import posts from "../src/local-json/posts.json";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const endpoint = "./posts2.json";

  const [postsL, setPostsL] = useState([]);
  useEffect(()=>{
  axios.get(endpoint)
      .then((res)=> setPostsL(res.data))
      .catch(err=>console.log(err))
  },[]);

  const [show, setShow] = useState(false);
  //console.log("id = "+posts.title);

  const handleDelete = (id) => {
    //const delTodo = todos.filter((to) => to.id !== id);
    //setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    //const editTodo = todos.find((i) => i.id === id);
    //setTodo(editTodo.title);
   // setEditId(id);
  };

  const handlePoster = (poster) => {
    alert("Posted by "+poster)
    poster.preventDefault();
  }

  return (
  <div className="App">
    <div className="container">
      <h1>MAELSTROM.............
  <button type = "button" onClick={()=> setShow(!show)}>
    {show === true?'HIDE':'ADD A NEW ENTRY'}
  </button></h1>
  {show && <form className="todoForm" onSubmit={handleEdit}>
    <input
      className="inputForm"
      type="text"
      value="title"
      onChange={(e) => setPostsL(e.target.value)}
    />
    <textarea
      className="inputForm"
      defaultValue="Descriptif"
      type="text"
      onChange={(e) => console.log(e.value)}
    />
    <input
    className="inputForm"
      type="text"
      value="poster"
      onChange={(e) => setPostsL(e.target.value)}
    />
      <label for="cars" className="textLi">RATING</label>
  <select id="cars" name="cars" className="inputForm">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
    <button type="submit"> {editId ? "Edit" : "ADD"}</button>
  </form>}
        <ul className="ulElem">
          {postsL && postsL.map(({title, id, descript, note,poster}) =>(
            
            <li className="liElem" key={id}>
              <div className="listInfos">
                <div className="titleAndRating">
                    <span className="textTitle">
                      {title}
                    </span>
                    <span className={note==1?"textRatingL":note==2?"textRatingM":"textRatingH"}>
                      {note}/3
                    </span>
                    </div>
                    <span className={descript.length>90 ? "textDescr" : "textDescr2"}>
                      {descript}
                    </span>
                    </div>
                    <div className="listButtons">
                    <button className="whoButton" onClick={() => handlePoster(poster)}></button>
                    <button className="editButton" onClick={() => handleEdit(id)}></button>
                    <button className="deleteButton" onClick={() => handleDelete(id)}></button>
                    </div>
            </li>
          //<li className="liElem" key={id}><strong>{title}{descript}</strong></li>
          //checkTextLong(descript)
          ))}
        </ul>
  </div>
</div>
  );
};

export default App;