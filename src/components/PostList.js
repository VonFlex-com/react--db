import React from "react";

const PostList = ({ todos, handleDelete, handleEdit, handlePoster }) => {
  return (
    <ul className="ulElem">
      {todos.map((t) => (
 

<li className="liElem" key={t.id}>
<div className="listInfos">
  <div className="titleAndRating">
      <span className="textTitle">
        {t.title}
      </span>
      <span className={t.note===1?"textRatingL":t.note===2?"textRatingM":"textRatingH"}>
        {t.note}/3
      </span>
      </div>
      <span className={t.descript.lenght>=200?'textDescr':"textDescr"}>
        {t.descript}
      </span>
      </div>
      <div className="listButtons">
      <button className="whoButton" onClick={() => handlePoster(t.poster)}></button>
      <button className="editButton" onClick={() => handleEdit(t.id)}></button>
      <button className="deleteButton" onClick={() => handleDelete(t.id)}></button>
      </div>
</li>
      ))}
    </ul>
  );
};

export default PostList;