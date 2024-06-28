import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
const notesintial =[]
  
const [notes,setNotes]=useState(notesintial)

// // get all note
const getNotes= async()=>{
//API CALL
const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')
  }
});
const json = await response.json();
console.log(json);
setNotes(json);
}


const addNote=async(title,description,tag)=>{
//API CALL
 const response = await fetch(`${host}/api/notes/addnotes`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem('token')
  },
  body: JSON.stringify({title,description,tag})
});
const note = await response.json();
setNotes(notes.concat(note));
// console.log(json);

//   console.log("Adding a new note");
}


  // DELETE a note video 64
const deleteNote=async(id)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = await response.json();
  console.log(json);

const newNotes = notes.filter(note => (note._id !== id));
setNotes(newNotes);
}


  // EDIT a note 
const editNote=async(id,title,description,tag)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
  });
  const json =  await response.json();
  console.log(json);

  //Logic to edit in client
  let newNotes = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < notes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
    // console.log(id,notes);
    }
    setNotes(newNotes);
  }

    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;