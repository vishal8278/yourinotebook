
import React from "react";

// let mystyle = {
//     color : 'white',
//     backgroundColor: 'black'
// }



export default function About(props) {
  // const [mystyle, setmystyle] = useState({
  //   color : 'black',
  //   backgroundColor: 'white'  
    
  // })

  let mystyle={
    color: props.mode==='dark'?'white':'#042743',
    backgroundColor: props.mode === 'dark'?'#13466e':'white'
  }

  return (
    <div className="container">
      <p><h3>Welcome to Your Notebook!</h3>
  we understand the importance of staying organized and managing your personal information efficiently. Our platform is designed to simplify the process of creating, editing, and organizing your notes, ensuring you have everything you need at your fingertips.</p>
      <h1 className="my-3" style ={{color: props.mode==='dark'?'white':'#042743'}}>About us</h1>
      <div className="accordion" id="accordionExample" style ={mystyle}>
        <div className="accordion-item" >
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne" style ={mystyle}
            >
              
              <h4>Mission</h4>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            
            <div className="accordion-body" style ={mystyle}>
              
              <strong>Our mission</strong> is to provide a seamless and intuitive platform that empowers individuals to take control of their personal information. We strive to make note-taking and information management as effortless and efficient as possible, so you can focus on what matters most to you.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo" style ={mystyle}
            >
              <h4>What We Offer</h4>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style ={mystyle}>
              <p><strong>Easy Note Creation:</strong> Quickly and easily create notes with our user-friendly interface. Whether you're jotting down a quick reminder or drafting detailed plans, we've got you covered.</p>
              <p><strong>Effortless Editing:</strong>Our platform allows you to edit your notes with ease. Make changes anytime, anywhere, ensuring your information is always up to date.</p>
            <p><strong>Simple Deletion:</strong> Managing your notes has never been simpler. Delete outdated or unnecessary notes with just a few clicks, keeping your workspace clean and organized.</p>
            <p><strong>Organized Management:</strong> Organize your notes by categories, tags, or folders. Our advanced search and sorting features make it easy to find exactly what you're looking for.</p>
            <p><strong>Secure Access: </strong>We prioritize your privacy and security. Your notes are protected with the latest encryption technology, ensuring your personal information remains confidential.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree" style ={mystyle}
            >
             <h4>Join Us</h4>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body"style ={mystyle}>
              <strong>Join the </strong> community today and experience the ease of managing your personal information like never before. Whether you're a student, professional, or anyone in need of an efficient note-taking solution.
            </div>
          </div>
        </div>
      </div>
      {/* <button type="button" onClick={togglestyle} className="btn btn-primary my-3">{btnstyle}</button> */}
    </div>
  );
}
