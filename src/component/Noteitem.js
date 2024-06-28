import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note,updateNote} = props;
  return (
<div className="col-md-3 ">
<div className="col mb-4">
    <div className="card">
      <div className="card-body">
        <div className='d-flex align-items-center '>
        <h5 className="card-title">{note.title}</h5>
        {/* <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          <i className="fa-regular fa-trash-can mx-2 " onClick={()=>{deleteNote(note._id)}} ></i> */}
        </div>

        <p className="card-text">{note.description}</p>
        <div className='d-flex'>
          <i className="fa-regular fa-trash-can mx-2 " onClick={()=>{deleteNote(note._id); props.showalert("Deleted Successfully", "success");}} ></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}} ></i>
          </div>
      </div>
    </div>
  </div>
</div> 


  )
}

export default Noteitem
