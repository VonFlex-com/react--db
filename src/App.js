import React, { useEffect, useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import Overlay from "./components/Overlay";
import axios from 'axios';


const endPoint = "http://localhost:8000/posts";

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

  const [currentRadioValue, setCurrentValue] = useState('1');
  /*
  const handleRadioChange = value => {
    //console.log(value);
    setCurrentValue(value);
  };*/

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }
  
/*
  const handleChange = event => {
    console.log(event.target.value);
    setCurrentValue(event.target.value);
  };
*/
  //OK---------------------->
  const fetchTodos = async () => {
    const { data, status } = await axios.get(endPoint);
    if (status === 200) {
      setTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmitB = async (e) => {
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      alert("handle submit title = " + editTodo.title + editTodo.poster + editTodo.note + ", id = " + editId);

      let response1 = await axios.put(endPoint + "/" + editId, todo)
      if (response1) {
        alert("Updated at " + editId);
        fetchTodos();
        setEditId(0);
      }
      return;
    }
    else {
      e.preventDefault();
      if(!todo.note){
        todo.note = 1;
      }
      let response = await axios.post(endPoint, todo)
      if (response) {
        alert("New movie : " + todo.title);
        fetchTodos();
        setTodo({
          title: "",
          descript: "",
          poster: "",
          note: ""
        });
        setIsOpen(!isOpen);
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
    setEditId(id);
    setIsOpen(!isOpen);
  };

  //Submit button validation emptiness 
  const IsValid = (tit) =>{
    if(!tit){
      return true;
    }
    return false;
  }

  //Overlay form boolean
  const [isOpen, setIsOpen] = useState(false);

  //toggle Overlay
  const toggleOverlay = () => {
    setIsOpen(!isOpen);
    clearForm();
  };

  //Clear form
  const clearForm = () =>
  {
    setTodo({
      title: "",
      descript: "",
      poster: "",
      note: ""
    });
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Maelstrom.........</h1>
        <button className="showButton" onClick={toggleOverlay}>ADD NEW ENTRY</button>
        <Overlay isOpen={isOpen} onClose={toggleOverlay}>
    
        <form className="todoForm" onSubmit={handleSubmitB}
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
            rows="5" 
            cols="40"
            className="inputForm"
            type="text"
            value={todo.descript}
            onChange={(e) => setTodo({ ...todo, descript:e.target.value})}
          />
          <label className="textLi">POSTER</label>
          <input
            className="inputForm"
            type="text"
            value={todo.poster}
            onChange={(e) => setTodo({ ...todo, poster: e.target.value })}
          />

<label className="textLi">RATING</label>
<div className="radioContainer">
        <div className="radioElem">
          <input
            name="radio-item-1"
            value="1"
            type="radio"
            onChange={e => {
              handleChange(e);
              setCurrentValue(e.target.value);
              setTodo({ ...todo, note: e.target.value})
              }
            }
            defaultChecked={currentRadioValue === '1'}
          />
          <label htmlFor="radio-item-1">1</label>
        </div>

        <div className="radioElem">
          <input
          className="inputRadio"
            name="radio-item-1"
            value="2"
            type="radio"
            onChange={e => {
              handleChange(e);
              setCurrentValue(e.target.value);
              setTodo({ ...todo, note: e.target.value})
                }
            }
            defaultChecked={currentRadioValue === '2'}
          />
          <label htmlFor="radio-item-2">2</label>
        </div>
        <div className="radioElem">
          <input
            name="radio-item-1"
            value="3"
            type="radio"
            onChange={e => {
              handleChange(e);
              setCurrentValue(e.target.value);
              setTodo({ ...todo, note: e.target.value})
              }
            }
            defaultChecked={currentRadioValue === '3'}
          />
          <label htmlFor="radio-item-3">3</label>
        </div>
        </div>
        <div className="submitButFlex">
        <button className="buttonSubmit"
        disabled = {IsValid(todo.title)}
        type="submit">{editId ? "EDIT " + editId : IsValid(todo.title)?"MISSING INFO...":"ADD"}</button>
        </div>  
        </form>
        </Overlay>
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