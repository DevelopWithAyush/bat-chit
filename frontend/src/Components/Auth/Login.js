import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const {showalert} = props;
  const navigate = useNavigate()
     const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const login = async (email, password) => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
      
          if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Signup successful:", jsonResponse);
            showalert("success","successfully sign up ")
            navigate("/chat")

            
          } else {
            showalert("error","Signup failed.")}
        } catch (error) {

          showalert("error","Signup failed.")
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData.email,formData.password)
        // Add your sign-up logic here
        console.log('Form submitted with data:', formData);
    };

const [show,setShow] = useState(true)
    const handleontoggle = ()=>{
setShow(!show)

    }
    return (


        <form onSubmit={handleSubmit} className='signupform'>




            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type={show ?"password":"text"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button className='eyebtn' onClick={handleontoggle}>
                {show?<i class="fa-solid fa-eye" ></i>:<i class="fa-solid fa-eye-slash"></i>

}    
                </button>
                
            </div>

            <button type="submit" className='submitbtn' >submit</button>
        </form>

    );
};

export default Login
