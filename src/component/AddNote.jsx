import React, {useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";


const AddNote = (props) => { 
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"", tag:"" })
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"", tag:"" });
        props.showalert("Added Successfully", "success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Tilte</label>
          <input value= {note.title}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="" onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input value= {note.description}
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="" onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input value= {note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="" onChange={onChange}
            minLength={5} required
          />
        </div>
        <button  disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
