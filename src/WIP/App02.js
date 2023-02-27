import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import axios from 'axios';
import posts from "../src/local-json/posts.json";

const App = () => {

  const [editId, setEditId] = useState(0);

  //const endpoint = "./posts2.json";
  const endpoint = "http://localhost:4000/posts";

  const [formDataL, setformDataL] = useState(
    {
      title: "",
      descript: "",
      poster: "",
      note: ""
    }
  );

  const [updatedDataL, setupdatedDataL] = useState(
    {
      title: "",
      descript: "",
      poster: "",
      note: ""
    }
  );

  const [postsL, setPostsL] = useState([]);

  const getUser = async () => {
    await axios
      .get(endpoint)
      .then((res) => setPostsL(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  const [show, setShow] = useState(false);

  const handleDelete = async (id) => {
    await axios
      .delete(endpoint + "/" + id)
      .then((res) => alert("Deleted at " + id));

    const delPost = postsL.filter((to) => to.id !== id);
    setPostsL([...delPost]);
  };

  const handleEdit = (id) => {
    console.log("Edit id " + id);
    const editTodo = postsL.find((i) => i.id === id);
    setformDataL(editTodo.title);
    setEditId(id);
  };

  const handlePoster = (poster) => {
    alert("Posted by " + poster)
    //e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await axios.post(endpoint, formDataL)
    if (response) {
      alert("data submited : " + formDataL.title + ", by " + formDataL.poster);
      getUser();
      setShow(!show);
      setformDataL({
        title: "",
        descript: "",
        poster: "",
        note: ""
      });
    } else {
      alert("failed operation");
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>MAELSTROM.............
          <button className="showButton" type="button" onClick={() => setShow(!show)}>
            {show === true ? 'DONE' : 'ADD A NEW ENTRY'}
          </button></h1>
        {show && <form className="todoForm" onSubmit={handleSubmit}>
          <label className="textLi">FILM TITLE</label>
          <input
            className="inputForm"
            type="text"
            value={formDataL.title}
            onChange={(e) => setformDataL({ ...formDataL, title: e.target.value })}
          />
          <label className="textLi">DESCRIPTION</label>
          <textarea
            className="inputForm"
            type="text"
            value={formDataL.descript}
            onChange={(e) => setformDataL({ ...formDataL, descript: e.target.value })}
          />
          <label className="textLi">POSTER</label>
          <input
            className="inputForm"
            type="text"
            value={formDataL.poster}
            onChange={(e) => setformDataL({ ...formDataL, poster: e.target.value })}
          />
          <label className="textLi">RATING</label>
          <input
            className="inputForm"
            type="number"
            value={formDataL.rating}
            onChange={(e) => setformDataL({ ...formDataL, note: e.target.value })}
          />
          <button className="buttonSubmit" type="submit">ADD</button>
        </form>}
        <PostList
          todos={postsL}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePoster={handlePoster}
        />
      </div>
    </div>
  );
};

export default App;