import React,{useState} from 'react'

function Signup() {
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
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
               <button className='eyebtn' onClick={handleontoggle}>
                {show?<i class="fa-solid fa-eye" ></i>:<i class="fa-solid fa-eye-slash"></i>

}    
                </button>
            </div>
    
            <button type="submit" className='submitbtn'>submit</button>
          </form>

      );
    };

export default Signup
