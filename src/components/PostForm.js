import React from "react";

const PostForm = ({ handleSubmit, todo, editId, setTodo }) => {
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
            <label className="textLi">FILM TITLE</label>
    <input
      className="inputForm"
      type="text"
      value={todo.title}
      onChange={(e) => setTodo({...todo, title: e.target.value})}
    />
    <label className="textLi">DESCRIPTION</label>
    <textarea
      className="inputForm"
      type="text"
      value={todo.descript}
      onChange={(e) => setTodo({...todo, descript: e.target.value})}
    />
    <label className="textLi">POSTER</label>
    <input
      className="inputForm"
      type="text"
      value={todo.poster}
      onChange={(e) => setTodo({...todo, poster: e.target.value})}
    />
    <label className="textLi">RATING</label>
    <input 
      className="inputForm"
      type="number"
       value={todo.rating}
       onChange={(e) => setTodo({...todo, note: e.target.value})}
    />
      <button className="buttonSubmit" type="submit"> {editId ? "EDIT "+editId : "ADD"}</button>
    </form>
  );
};

export default PostForm;