import React, { useState } from 'react'
import  {useNavigate}  from 'react-router-dom';


const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            props.showalert("Successfully Login", "success");
            navigate("/")
            // navigate.push("/")
          }
          else{
            props.showalert("Invalid Details", "danger");
          }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      }

  return (
    <div className='mt-2'>
      <h2 className='my-2'>Login to continue to inotebook</h2>
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" value={credentials.email}  onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
