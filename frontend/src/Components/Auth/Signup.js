import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const {showalert} = props;
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: '',
        Name: '',
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
    
      const signup = async (userName, name, email, password) => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName,
              name,
              email,
              password,
            }),
          });
      
          if (response.ok) {
            showalert("success","successfully sign up ")
            navigate("/chat")

          } else {
            showalert("error", "login falied")
          }
        } catch (error) {
          showalert("error", "login falied")
        }
      };
      
      const handleSubmit = async(e) => {
        e.preventDefault();
       signup(formData.userName,formData.Name,formData.email,formData.password)

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
              <label htmlFor="userName">user Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
    
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
                type={show?"password":"text"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
               <div className='eyebtn' onClick={handleontoggle}>
                {show?<i class="fa-solid fa-eye" ></i>:<i class="fa-solid fa-eye-slash"></i>

}    
                </div>
            </div>
    
            <button type="submit" className='submitbtn'>submit</button>
          </form>

      );
    };

export default Signup
